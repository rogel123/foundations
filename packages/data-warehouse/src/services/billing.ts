import { fetcher } from '@reapit/utils-common'
import { BillingBreakdownForMonthV2Model, BillingOverviewForPeriodV2Model } from '@reapit/foundations-ts-definitions'
import { getPlatformHeaders, logger } from '@reapit/utils-react'
import { URLS } from '../constants/api'
import { reapitConnectBrowserSession } from '../core/connect-session'

export const getBillingByMonthService = async (
  month: string,
): Promise<BillingBreakdownForMonthV2Model | undefined | void> => {
  try {
    const session = await reapitConnectBrowserSession.connectSession()

    if (!session) throw new Error('No Reapit Connect Session is present')

    const headers = await getPlatformHeaders(reapitConnectBrowserSession, '2')

    if (headers) {
      const response: BillingBreakdownForMonthV2Model | undefined = await fetcher({
        api: window.reapit.config.platformApiUrl,
        url: `${URLS.BILLING}/${month}?organisationId=${session.loginIdentity.orgId}&type=dataWarehouse&type=dataWarehouseUsage&type=dataWarehouse`,
        method: 'GET',
        headers,
      })

      if (response) {
        return response
      }

      throw new Error('Failed to fetch billing')
    }
  } catch (err) {
    logger(err as Error)
  }
}

export const getBillingByDatesService = async (
  dateFrom: string,
  dateTo: string,
): Promise<BillingOverviewForPeriodV2Model | undefined | void> => {
  try {
    const session = await reapitConnectBrowserSession.connectSession()

    if (!session) throw new Error('No Reapit Connect Session is present')

    const headers = await getPlatformHeaders(reapitConnectBrowserSession, '2')

    if (headers) {
      const response: BillingOverviewForPeriodV2Model | undefined = await fetcher({
        api: window.reapit.config.platformApiUrl,
        url: `${URLS.BILLING}?organisationId=${session.loginIdentity.orgId}&dateTo=${dateTo}&dateFrom=${dateFrom}&type=dataWarehouse&type=dataWarehouseUsage`,
        method: 'GET',
        headers,
      })

      if (response) {
        return response
      }

      throw new Error('Failed to fetch billing')
    }
  } catch (err) {
    logger(err as Error)
  }
}
