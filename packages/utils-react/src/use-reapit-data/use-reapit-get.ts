import { useState, useEffect, Dispatch, SetStateAction, useRef, useCallback, MutableRefObject } from 'react'
import { ReapitConnectBrowserSession, ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import { StringMap, logger } from '..'
import { GetActionNames, getActions, getFetcher } from '@reapit/utils-common'
import { useAsyncState } from '../use-async-state/index'
import { useSnack } from '@reapit/elements'

export type ReapitGetState<DataType> = [
  data: DataType | null,
  loading: boolean,
  error: string | null,
  refresh: (queryParams?: Object) => void,
]

export interface ReapitGetParams {
  reapitConnectBrowserSession: ReapitConnectBrowserSession
  action: GetActionNames
  queryParams?: Object
  headers?: StringMap
  fetchWhenTrue?: any[]
}

export interface HandleGetParams<DataType> {
  action: GetActionNames
  connectSession: ReapitConnectSession | null
  data: DataType | null
  loading: boolean
  error: string | null
  setData: Dispatch<SetStateAction<DataType | null>>
  setLoading: (stateAction: boolean) => Promise<boolean>
  setError: Dispatch<SetStateAction<string | null>>
  successSnack: (message: string) => void
  errorSnack: (message: string) => void
  prevQueryParams: MutableRefObject<Object | undefined>
  queryParams?: Object
  headers?: StringMap
  fetchWhenTrue?: any[]
}

export const checkQueryChanged = (queryParams?: Object, prevQueryParams?: Object): boolean => {
  if ((queryParams && !prevQueryParams) || (!queryParams && prevQueryParams)) return true
  if (!queryParams && !prevQueryParams) return false

  const stringifiedQuery = JSON.stringify(queryParams)
  const stringifiedPrevQuery = JSON.stringify(prevQueryParams)

  return stringifiedQuery !== stringifiedPrevQuery
}

export const checkShouldFetch = <DataType>({
  data,
  error,
  loading,
  connectSession,
  fetchWhenTrue,
  prevQueryParams,
  queryParams,
}: HandleGetParams<DataType>): boolean => {
  const hasNotFetched = !data && !loading && !error
  const hasAccess = Boolean(connectSession?.accessToken)
  const hasChangedQuery = checkQueryChanged(queryParams, prevQueryParams.current)
  const canFetch = (hasNotFetched && hasAccess) || (hasChangedQuery && hasAccess)

  if (!fetchWhenTrue) return canFetch

  const filtered = fetchWhenTrue.filter((item) => Boolean(item))

  return filtered.length === fetchWhenTrue.length && canFetch
}

export const handleGet =
  <DataType>(handleGetParams: HandleGetParams<DataType>) =>
  () => {
    const {
      setData,
      setLoading,
      setError,
      prevQueryParams,
      connectSession,
      queryParams,
      action,
      headers,
      successSnack,
      errorSnack,
    } = handleGetParams

    const shouldFetch = checkShouldFetch<DataType>(handleGetParams)
    const getAction = getActions[action]
    const { successMessage, errorMessage } = getAction

    const getData = async () => {
      setError(null)
      await setLoading(true)
      prevQueryParams.current = queryParams

      const response = await getFetcher<DataType>({
        action,
        connectSession,
        queryParams,
        headers,
        logger,
      })
      const data = typeof response === 'string' ? null : response
      const error = typeof response === 'string' ? response : null

      if (data && successMessage) successSnack(successMessage)
      if (error) errorSnack(errorMessage ?? error)

      setData(data)
      setError(error)
      await setLoading(false)
    }

    if (shouldFetch) {
      getData()
    }
  }

export const handleRefresh =
  <DataType>(handleGetParams: HandleGetParams<DataType>) =>
  () => {
    const { setData, setError, action, errorSnack, connectSession, queryParams, headers } = handleGetParams

    const getAction = getActions[action]
    const { errorMessage } = getAction

    const getData = async () => {
      setError(null)

      const response = await getFetcher<DataType>({ action, connectSession, queryParams, headers, logger })
      const data = typeof response === 'string' ? null : response
      const error = typeof response === 'string' ? response : null

      if (error) errorSnack(errorMessage ?? error)

      setData(data)
      setError(error)
    }

    getData()
  }

export const useReapitGet = <DataType>({
  reapitConnectBrowserSession,
  action,
  queryParams,
  headers,
  fetchWhenTrue,
}: ReapitGetParams): ReapitGetState<DataType> => {
  const prevQueryParams = useRef<Object | undefined>(queryParams)
  const [data, setData] = useState<DataType | null>(null)
  const [loading, setLoading] = useAsyncState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { success: successSnack, error: errorSnack } = useSnack()

  const handleGetParams: HandleGetParams<DataType> = {
    action,
    connectSession,
    queryParams,
    headers,
    data,
    loading,
    error,
    fetchWhenTrue,
    prevQueryParams,
    setData,
    setLoading,
    setError,
    successSnack,
    errorSnack,
  }

  useEffect(handleGet<DataType>(handleGetParams), [connectSession, queryParams, headers, fetchWhenTrue])

  const refresh = useCallback(handleRefresh<DataType>(handleGetParams), [
    connectSession,
    queryParams,
    headers,
    fetchWhenTrue,
  ])

  return [data, loading, error, refresh]
}
