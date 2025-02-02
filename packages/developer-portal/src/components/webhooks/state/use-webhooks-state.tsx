import {
  AppDetailModel,
  AppSummaryModelPagedResult,
  InstallationModelPagedResult,
} from '@reapit/foundations-ts-definitions'
import React, { FC, createContext, useContext, useState, SetStateAction, Dispatch, useEffect } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { useReapitGet } from '@reapit/utils-react'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { defaultWebhooksFilterState } from './defaults'
import { handleHistoryToQueryParams } from '../webhooks-controls'
import { useHistory } from 'react-router'
import { TopicModel, TopicModelPagedResult } from '../../../types/webhooks'

export interface WebhooksDataState {
  apps: AppSummaryModelPagedResult | null
  topics: TopicModel[]
  installations: InstallationModelPagedResult | null
}

export interface WebhooksFilterState {
  applicationId: string
  from: string
  to: string
}

export interface WebhooksStateHook {
  webhooksDataState: WebhooksDataState
  webhooksFilterState: WebhooksFilterState
  setWebhooksFilterState: Dispatch<SetStateAction<WebhooksFilterState>>
}

export const WebhooksStateContext = createContext<WebhooksStateHook>({} as WebhooksStateHook)

const { Provider } = WebhooksStateContext

export const handleSetTopics =
  (
    appDetail: AppDetailModel | null,
    allTopics: TopicModelPagedResult | null,
    setTopics: Dispatch<SetStateAction<TopicModel[]>>,
  ) =>
  () => {
    if (appDetail && allTopics?._embedded) {
      const filterdTopics = allTopics._embedded.filter((topic) => {
        if (!topic.associatedScope) return true
        return Boolean(appDetail.scopes?.find((scope) => scope.name === topic.associatedScope))
      })

      setTopics(filterdTopics)
    }
  }

export const WebhooksProvider: FC = ({ children }) => {
  const history = useHistory()
  const [webhooksFilterState, setWebhooksFilterState] = useState<WebhooksFilterState>({
    ...defaultWebhooksFilterState,
    ...handleHistoryToQueryParams(history),
  })
  const [topics, setTopics] = useState<TopicModel[]>([])
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const developerId = connectSession?.loginIdentity.developerId
  const { applicationId } = webhooksFilterState

  const [apps] = useReapitGet<AppSummaryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getApps],
    queryParams: { showHiddenApps: 'true', developerId, pageSize: 100 },
    fetchWhenTrue: [developerId],
  })

  const [allTopics] = useReapitGet<TopicModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getWebhookTopics],
    queryParams: { showHiddenApps: 'true', developerId, pageSize: 999 },
    fetchWhenTrue: [developerId],
  })

  const [installations] = useReapitGet<TopicModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getInstallations],
    queryParams: { pageSize: 999, isInstalled: true, developerId },
    fetchWhenTrue: [developerId],
  })

  const [appDetail] = useReapitGet<AppDetailModel>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getAppById],
    uriParams: { appId: applicationId },
    fetchWhenTrue: [applicationId],
  })

  useEffect(handleSetTopics(appDetail, allTopics, setTopics), [appDetail, allTopics])

  const webhooksDataState: WebhooksDataState = {
    apps,
    topics,
    installations,
  }

  return (
    <Provider
      value={{
        webhooksDataState,
        webhooksFilterState,
        setWebhooksFilterState,
      }}
    >
      {children}
    </Provider>
  )
}

export const useWebhooksState = (): WebhooksStateHook => {
  return useContext(WebhooksStateContext)
}
