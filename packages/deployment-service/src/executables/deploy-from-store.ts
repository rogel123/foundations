import { assumedS3Client } from '../services'
import { PipelineRunnerEntity } from '../entities/pipeline-runner.entity'
import { GetObjectOutput } from 'aws-sdk/clients/s3'
import { releaseToLiveFromZip } from './release-to-live'
import { CloudFrontClient, CreateInvalidationCommand } from '@aws-sdk/client-cloudfront'
import { PipelineEntity } from '../entities/pipeline.entity'
import { InvalidPipelineResourcesException } from '../exceptions'
import { getRoleCredentials } from '../services/sts'

export const getFromVersionS3 = async (location: string): Promise<GetObjectOutput | never> => {
  const client = await assumedS3Client()
  return new Promise<GetObjectOutput>((resolve, reject) =>
    client.getObject(
      {
        Bucket: process.env.DEPLOYMENT_VERSION_BUCKET_NAME as string,
        Key: `pipeline/${location}`,
      },
      (error, data) => {
        if (error) {
          console.error(error)
          reject(error)
        }

        resolve(data)
      },
    ),
  )
}

export const deleteCurrentLiveVersion = async (prefix: string): Promise<void | never> => {
  const client = await assumedS3Client()
  try {
    await new Promise<void>((resolve, reject) =>
      client.deleteObject(
        {
          Bucket: process.env.DEPLOYMENT_LIVE_BUCKET_NAME as string,
          Key: prefix,
        },
        (error) => {
          if (error) {
            console.error(error)
            return reject(error)
          }

          resolve()
        },
      ),
    )
  } catch (e) {
    console.error("basically the key doesn't exist")
  }
}

export const deployFromStore = async ({
  pipeline,
  pipelineRunner,
}: {
  pipeline: PipelineEntity
  pipelineRunner: PipelineRunnerEntity
}): Promise<void> => {
  console.log('deployFromStore', pipeline.name)
  const storageLocation = `${pipeline.uniqueRepoName}/${pipelineRunner.id}.zip`

  if (!pipelineRunner.pipeline?.cloudFrontId) {
    throw new InvalidPipelineResourcesException(pipeline.id as string)
  }

  const zip = await getFromVersionS3(storageLocation)

  if (!zip.Body) {
    throw new Error('Failed to find stored version')
  }

  await deleteCurrentLiveVersion(`pipeline/${pipeline.uniqueRepoName}`)
  console.log('deleted current live version')
  await releaseToLiveFromZip({
    file: zip.Body as Buffer,
    localLocation: `/tmp/deployment/${pipeline.uniqueRepoName}/deployment.zip`,
    deploymentType: 'pipeline',
    projectLocation: pipeline.uniqueRepoName,
  })
  console.log('released to live from zip')

  const assumedCreds = await getRoleCredentials()

  const cloudFrontClient = new CloudFrontClient({
    credentials: assumedCreds,
    region: process.env.REGION,
  })

  const invalidateCommand = new CreateInvalidationCommand({
    DistributionId: pipelineRunner.pipeline?.cloudFrontId,
    InvalidationBatch: {
      Paths: {
        Items: ['/*'],
        Quantity: 1,
      },
      CallerReference: `deployment refresh for pipeline runner [${pipelineRunner.id}]`,
    },
  })

  await cloudFrontClient.send(invalidateCommand)
}
