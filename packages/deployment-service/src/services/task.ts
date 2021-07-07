import { connect } from './../core'
import { PipelineRunnerEntity } from './../entities/pipeline-runner.entity'
import { TaskEntity } from './../entities/task.entity'

export const createTask = async (dto: Partial<TaskEntity> & { pipelineId: string }): Promise<TaskEntity> => {
  const connection = await connect()
  const repo = connection.getRepository(TaskEntity)

  return repo.save(repo.create(dto))
}

export const createBatchTasks = async (
  pipelineRunner: PipelineRunnerEntity,
  dtos: Partial<TaskEntity>[],
): Promise<TaskEntity[]> => {
  const connection = await connect()
  const repo = connection.getRepository(TaskEntity)

  return repo.save(
    repo.create(
      dtos.map((dto) => ({
        pipelineRunner,
        ...dto,
      })),
    ),
  )
}

export const updateTask = async (model: TaskEntity, dto: Partial<TaskEntity>) => {
  const connection = await connect()
  const repo = connection.getRepository(TaskEntity)

  return repo.save({
    ...model,
    ...dto,
  })
}

export const batchUpdateTask = async (tasks: TaskEntity[]) => {
  const connection = await connect()
  const repo = connection.getRepository(TaskEntity)

  return repo.save(tasks)
}

export const findByPipelineId = async (pipelineRunnerId: string): Promise<TaskEntity[]> => {
  const connection = await connect()
  const repo = connection.getRepository(TaskEntity)

  return repo.find({
    where: {
      pipelineRunner: {
        id: pipelineRunnerId,
      },
    },
  })
}
