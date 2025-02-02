import { ApiKeyModel } from '@reapit/api-key-verify'
import { db } from '@/core'
import { QueryIterator } from '@aws/dynamodb-data-mapper'

export const createApiKey = (apiKey: Partial<ApiKeyModel>): Promise<ApiKeyModel> => {
  return db.put(Object.assign(new ApiKeyModel(), { ...apiKey }))
}

export const updateApiKey = (apiKey: ApiKeyModel, dto: Partial<ApiKeyModel>): Promise<ApiKeyModel> => {
  return db.put(
    Object.assign(new ApiKeyModel(), {
      ...apiKey,
      ...dto,
    }),
  )
}

export const getApiKey = (apiKey: Partial<ApiKeyModel>): Promise<ApiKeyModel | undefined> => {
  return db.get(Object.assign(new ApiKeyModel(), apiKey))
}

export const getApiKeyByKey = async (apiKey: string): Promise<ApiKeyModel | never> => {
  try {
    const result = await db.query(
      ApiKeyModel,
      {
        apiKey,
      },
      {
        indexName: 'apiKey',
      },
    )

    const apiKeys: ApiKeyModel[] = []

    for await (const key of result) {
      apiKeys.push(key)
    }

    apiKeys
      .sort((a, b) => new Date(a.keyExpiresAt as string).getDate() - new Date(b.keyExpiresAt as string).getDate())
      .reverse()

    return apiKeys.filter((key) => typeof key !== 'undefined')[0]
  } catch (e) {
    console.error(e)
    throw e
  }
}

export const batchGetApiKeys = async (
  keys: { email: string } | { developerId: string },
  indexName: string = 'developerIdOwnership',
  startKey?: Partial<ApiKeyModel>,
): Promise<[QueryIterator<ApiKeyModel>, { nextCursor: string }]> => {
  const dynamoResponse = await db.query(ApiKeyModel, keys, {
    indexName,
    limit: 10,
    startKey,
  })

  return [
    dynamoResponse,
    {
      nextCursor: '',
    },
  ]
}

export const removeApiKey = async (apiKey: ApiKeyModel): Promise<void> => {
  await db.delete(apiKey)
}
