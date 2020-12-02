// import { BillingS } from '@reapit/foundations-ts-definitions'
import { fetcher, setQueryParams } from '@reapit/elements'
import { URLS } from './constants'
import { logger } from '@reapit/utils'
import { BillingBreakdownForMonthV2Model } from '@reapit/foundations-ts-definitions'
import { generateHeaders } from './utils'

// Manual defined Model
export type BillingSummaryModel = {
  description?: string
  from?: string
  to?: string
  requestsByPeriod?: MonthlyBillingDetailsModel
}

export type MonthlyBillingDetailsModel = {
  period?: string
  periodStart?: string
  periodEnd?: string
  periodName?: string
  requestCount?: number
  endpointCount?: number
  netAmount?: number
  grossAmount?: number
  vatAmount?: number
}

export type BillingDetailsModel = {
  period?: string
  totalEndpoints?: number
  totalRequests?: number
  totalCost?: number
  requestsByService?: ServiceBillingDetailsModel[]
}

export type ServiceBillingDetailsModel = {
  serviceName?: string
  endpointCount?: number
  requestCount?: number
  cost?: number
  requestsByEndpoint?: EndpointBillingDetailsModel[]
}

export type EndpointBillingDetailsModel = {
  endpoint?: string
  requestCount?: number
  cost?: number
}

export type FetchBillingsParams = {
  developerId?: string
  dateFrom?: string
  dateTo?: string
}

export type FetchBillingsByMonthParams = {
  developerId?: string
  month: string
}

export const fetchBillings = async (params: FetchBillingsParams): Promise<BillingSummaryModel> => {
  const api = window.reapit.config.platformApiUrl
  try {
    const response = await fetcher({
      url: `${URLS.trafficEventBilling}?${setQueryParams(params)}`,
      api,
      method: 'GET',
      headers: {
        ...(await generateHeaders()),
        'api-version': '2',
      },
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}

export const fetchBillingsByMonth = async (
  params: FetchBillingsByMonthParams,
): Promise<BillingBreakdownForMonthV2Model> => {
  const api = window.reapit.config.platformApiUrl
  try {
    const { month, ...rest } = params
    const response = await fetcher({
      url: `${URLS.trafficEventBilling}/${month}?${setQueryParams(rest)}`,
      api,
      method: 'GET',
      headers: {
        ...(await generateHeaders()),
        'api-version': '2',
      },
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}
