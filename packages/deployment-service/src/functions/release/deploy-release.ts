import { resolveCreds } from '../../utils'
import {
  BadRequestException,
  HttpErrorException,
  httpHandler,
  HttpStatusCode,
  NotFoundException,
} from '@homeservenow/serverless-aws-handler'
import {
  assumedS3Client,
  createPipelineRunnerEntity,
  resetCurrentlyDeployed,
  savePipelineRunnerEntity,
} from '../../services'
import { defaultOutputHeaders } from '../../constants'
import * as pipelineService from '../../services/pipeline'
import { PipelineEntity } from '../../entities/pipeline.entity'
import { ownership } from '../../utils/ownership'
import { deployFromStore } from './../../executables'
import { PipelineRunnerType } from '@reapit/foundations-ts-definitions'
import { PipelineRunnerEntity } from '../../entities/pipeline-runner.entity'

/**
 * Deploy a new release
 */
export const deployRelease = httpHandler<any, PipelineRunnerEntity>({
  defaultOutputHeaders,
  handler: async ({ event, body }) => {
    const { developerId } = await resolveCreds(event)

    const { pipelineId, version } = event.pathParameters as { pipelineId: string; version: string }

    const pipeline = await pipelineService.findPipelineById(pipelineId)

    if (!pipeline) {
      throw new NotFoundException()
    }

    ownership(pipeline.developerId, developerId)

    if (pipeline.buildStatus === 'PRE_PROVISIONED') {
      throw new HttpErrorException('Cannot deploy pipeline in current build state', 409 as HttpStatusCode)
    }

    const file = Buffer.from(body.file, 'base64')

    if (!file) {
      throw new BadRequestException('File not provided')
    }

    const pipelineRunner = await createPipelineRunnerEntity({
      pipeline,
      type: PipelineRunnerType.RELEASE,
      buildVersion: version,
    })

    const s3Client = await assumedS3Client()

    await new Promise<void>((resolve, reject) =>
      s3Client.putObject(
        {
          Body: file,
          Bucket: process.env.DEPLOYMENT_VERSION_BUCKET_NAME as string,
          Key: `pipeline/${pipelineRunner.S3Location}`,
        },
        (error) => {
          if (error) {
            console.error(error)
            reject()
          }
          resolve()
        },
      ),
    )

    try {
      await Promise.all([
        deployFromStore({
          pipeline: pipelineRunner.pipeline as PipelineEntity,
          pipelineRunner,
        }),
        resetCurrentlyDeployed(pipelineRunner.pipeline as PipelineEntity),
      ])

      pipelineRunner.currentlyDeployed = true
      pipelineRunner.buildStatus = 'COMPLETED'

      return savePipelineRunnerEntity(pipelineRunner)
    } catch (e) {
      console.error(e)
      pipelineRunner.buildStatus = 'FAILED'

      return savePipelineRunnerEntity(pipelineRunner)
    }
  },
})
