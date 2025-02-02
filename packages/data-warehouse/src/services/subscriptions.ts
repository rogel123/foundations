import { fetcher } from '@reapit/utils-common'
import { URLS } from '../constants/api'
import { reapitConnectBrowserSession } from '../core/connect-session'
import { CreateSubscriptionModel, SubscriptionModelPagedResult } from '@reapit/foundations-ts-definitions'
import { getPlatformHeaders, logger } from '@reapit/utils-react'

export const getSubscriptionsService = async (): Promise<SubscriptionModelPagedResult | undefined | void> => {
  try {
    const session = await reapitConnectBrowserSession.connectSession()

    if (!session) throw new Error('No Reapit Connect Session is present')
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')

    if (headers) {
      const response: SubscriptionModelPagedResult | undefined = await fetcher({
        api: window.reapit.config.platformApiUrl,
        url: `${URLS.SUBSCRIPTIONS}/?customerId=${session.loginIdentity.clientId}`,
        method: 'GET',
        headers,
      })

      if (response) {
        return response
      }
      throw new Error('Failed to fetch subscriptions')
    }
  } catch (err) {
    logger(err as Error)
  }
}

export const createSubscriptionsService = async (
  subscription: CreateSubscriptionModel,
): Promise<boolean | undefined> => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')

    if (headers) {
      const response: boolean | undefined = await fetcher({
        api: window.reapit.config.platformApiUrl,
        url: `${URLS.SUBSCRIPTIONS}`,
        method: 'POST',
        body: subscription,
        headers,
      })

      if (response) {
        return response
      }
      throw new Error('Failed to create subscription')
    }
  } catch (err) {
    logger(err as Error)
  }
}

export const deleteSubscriptionsService = async (id: string): Promise<boolean | undefined> => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')

    if (headers) {
      const response: boolean | undefined = await fetcher({
        api: window.reapit.config.platformApiUrl,
        url: `${URLS.SUBSCRIPTIONS}/${id}`,
        method: 'DELETE',
        headers,
      })

      if (response) {
        return response
      }
      throw new Error('Failed to delete subscription')
    }
  } catch (err) {
    logger(err as Error)
  }
}
