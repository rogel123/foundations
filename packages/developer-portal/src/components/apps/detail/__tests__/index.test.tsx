import React from 'react'
import { render } from '../../../../tests/react-testing'
import { useAppState } from '../../state/use-app-state'
import { mockAppState } from '../../state/__mocks__/use-app-state'
import { AppDetail, defaultCopyState, getAppStatus, getIntegrationType, handleCopyCode } from '../index'

jest.mock('../../state/use-app-state')
jest.mock('@reapit/utils-react', () => ({
  useReapitGet: jest.fn(() => [{ clientSecret: 'MOCK_SECRET' }]),
}))
jest.useFakeTimers()

const mockUseAppState = useAppState as jest.Mock

describe('AppDetail', () => {
  it('should match snapshot', () => {
    expect(render(<AppDetail />)).toMatchSnapshot()
  })

  it('should match snapshot where loading apps', () => {
    mockUseAppState.mockReturnValue({
      ...mockAppState,
      appsDataState: {
        ...mockAppState.appsDataState,
        appDetailLoading: true,
      },
    })
    expect(render(<AppDetail />)).toMatchSnapshot()
  })

  it('should match snapshot where no app found', () => {
    mockUseAppState.mockReturnValue({
      ...mockAppState,
      appsDataState: {
        appDetail: null,
        appDetailLoading: false,
      },
    })
    expect(render(<AppDetail />)).toMatchSnapshot()
  })
})

describe('handleCopyCode', () => {
  it('should set then reset the copy text', () => {
    const setCopyState = jest.fn()
    const key = 'externalId'

    const curried = handleCopyCode(setCopyState, key)

    curried()

    jest.runAllTimers()

    expect(setCopyState).toHaveBeenCalledTimes(2)
    expect(setCopyState).toHaveBeenCalledWith({ ...defaultCopyState, externalId: 'Copied' })
    expect(setCopyState.mock.calls[1][0]()).toEqual({ externalId: 'Copy' })
  })
})

describe('getAppStatus', () => {
  it('should get app status for a listed and live app', () => {
    const result = getAppStatus({ isListed: true, pendingRevisions: false, limitToClientIds: [] })

    expect(result).toEqual('Your app is live and public in the AppMarket')
  })

  it('should get app status for a listed, private and live app', () => {
    const result = getAppStatus({ isListed: true, pendingRevisions: false, limitToClientIds: ['SBOX'] })

    expect(result).toEqual('Your app is live in the AppMarket but private to selected customers')
  })

  it('should get app status for a listed, live app with revisions', () => {
    const result = getAppStatus({ isListed: true, pendingRevisions: true, limitToClientIds: [] })

    expect(result).toEqual('Your app is live and public in the AppMarket with a pending revision under review')
  })

  it('should get app status for a listed, private, live app with revisions', () => {
    const result = getAppStatus({ isListed: true, pendingRevisions: true, limitToClientIds: ['SBOX'] })

    expect(result).toEqual('Your app is live and private to selected customers with a pending revision under review')
  })

  it('should get app status for a non live app', () => {
    const result = getAppStatus({ isListed: false, pendingRevisions: false, limitToClientIds: [] })

    expect(result).toEqual('Your app is not live and in development only')
  })
})

describe('getIntegrationType', () => {
  it('should get integration type for a clientCredentials app', () => {
    const result = getIntegrationType({
      isDirectApi: true,
      authFlow: 'clientCredentials',
      desktopIntegrationTypeIds: [],
    })

    expect(result).toEqual('Your app is a server-side only integration or data feed')
  })

  it('should get integration type for a direct api app', () => {
    const result = getIntegrationType({
      isDirectApi: true,
      authFlow: 'authorisationCode',
      desktopIntegrationTypeIds: [],
    })

    expect(result).toEqual(
      'You have a client side authenticated integration that will not render within the AgencyCloud desktop CRM',
    )
  })

  it('should get integration type for an AC replacement app', () => {
    const result = getIntegrationType({
      isDirectApi: false,
      authFlow: 'authorisationCode',
      desktopIntegrationTypeIds: ['Property'],
    })

    expect(result).toEqual(
      'You have a client side authenticated integration that will replace a screen or launch from within the AgencyCloud desktop CRM',
    )
  })

  it('should get integration type for an AC integrated app', () => {
    const result = getIntegrationType({
      isDirectApi: false,
      authFlow: 'authorisationCode',
      desktopIntegrationTypeIds: [],
    })

    expect(result).toEqual(
      'You have a client side authenticated integration that will render within the AgencyCloud desktop CRM',
    )
  })
})
