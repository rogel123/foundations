import { ReapitConnectSession } from '@reapit/connect-session'
import React from 'react'
import { AppsNewPage, handleNavigateOnSuccess, handleSubmitApp, stepIsValid } from '..'
import { AppProvider } from '../../state/use-app-state'
import { History } from 'history'
import Routes from '../../../../constants/routes'
import { AppNewStepId } from '../config'
import { render, setViewport } from '../../../../tests/react-testing'
import { defaultAppWizardState } from '../../state/defaults'

jest.mock('project-name-generator', () => ({
  __esModule: true,
  default: () => ({
    dashed: 'stub-name',
  }),
}))

describe('AppsNew', () => {
  it('should match a snapshot', () => {
    expect(
      render(
        <AppProvider>
          <AppsNewPage />
        </AppProvider>,
      ),
    ).toMatchSnapshot()
  })

  it('should match snapshot for mobile view', () => {
    const testElem = document.createElement('div')
    testElem.id = 'root'
    document.body.appendChild(testElem)

    setViewport('Mobile')
    expect(
      render(
        <AppProvider>
          <AppsNewPage />
        </AppProvider>,
      ),
    ).toMatchSnapshot()
  })

  it('should handle next step and previous step on button click', async () => {
    const rendered = render(
      <AppProvider>
        <AppsNewPage />
      </AppProvider>,
    )

    const existingCustomer = await rendered.findByText('Client Side App')
    existingCustomer.click()

    const nextButton = await rendered.findByText('Next')
    nextButton.click()

    const existingCustomerStep = await rendered.findByText('Login Redirect URI')
    expect(existingCustomerStep).toBeDefined()
    expect(rendered.queryByText('Client Side App')).toBeNull()

    const prevButton = await rendered.findByText('Prev')
    prevButton.click()

    const previousExistingCustomer = await rendered.findByText('Client Side App')
    expect(previousExistingCustomer).toBeDefined()
  })

  it('should handle app submission for a clientCredentials app', () => {
    const authFlow = 'clientCredentials'
    const connectSession = {
      loginIdentity: {
        developerId: 'SOME_ID',
        orgName: 'Some Org',
      },
    } as ReapitConnectSession
    const createApp = jest.fn()
    const formValues = {
      redirectUris: 'http://localhost:8080',
      signoutUris: 'http://localhost:8080/login',
      scopes: 'agencyCloud:applicants.write',
    }

    const curried = handleSubmitApp(authFlow, connectSession, [AppNewStepId.agencyCloudStep], createApp)

    curried(formValues)

    expect(createApp).toHaveBeenCalledWith({
      authFlow,
      name: 'some-org-stub-name',
      scopes: [formValues.scopes],
      developerId: connectSession.loginIdentity.developerId,
      isDirectApi: false,
    })
  })

  it('should handle app submission for a authorisationCode app', () => {
    const authFlow = 'authorisationCode'
    const connectSession = {
      loginIdentity: {
        developerId: 'SOME_ID',
        orgName: 'Some Org',
      },
    } as ReapitConnectSession
    const createApp = jest.fn()
    const formValues = {
      redirectUris: 'http://localhost:8080',
      signoutUris: 'http://localhost:8080/login',
      scopes: 'agencyCloud:applicants.write',
    }

    const curried = handleSubmitApp(authFlow, connectSession, [AppNewStepId.applicationTypeStep], createApp)

    curried(formValues)

    expect(createApp).toHaveBeenCalledWith({
      authFlow,
      name: 'some-org-stub-name',
      scopes: [formValues.scopes],
      developerId: connectSession.loginIdentity.developerId,
      redirectUris: [formValues.redirectUris],
      signoutUris: [formValues.signoutUris],
      isDirectApi: true,
    })
  })

  it('should not submit if no developerId', () => {
    const authFlow = 'authorisationCode'
    const connectSession = {
      loginIdentity: {
        developerId: null,
        orgName: 'Some Org',
      },
    } as ReapitConnectSession
    const createApp = jest.fn()
    const formValues = {
      redirectUris: 'http://localhost:8080',
      signoutUris: 'http://localhost:8080/login',
      scopes: 'agencyCloud:applicants.write',
    }

    const curried = handleSubmitApp(authFlow, connectSession, [], createApp)

    curried(formValues)

    expect(createApp).not.toHaveBeenCalled()
  })

  it('should handle navigate on success', () => {
    const appCreated = {
      id: 'SOME_ID',
    }
    const history = {
      push: jest.fn(),
    } as unknown as History
    const appsRefresh = jest.fn()
    const appPipelineRefresh = jest.fn()
    const setAppWizardState = jest.fn()

    const curried = handleNavigateOnSuccess(appCreated, history, appsRefresh, appPipelineRefresh, setAppWizardState)

    curried()

    expect(history.push).toHaveBeenCalledWith(`${Routes.APPS}/${appCreated.id}`)
    expect(appsRefresh).toHaveBeenCalledTimes(1)
    expect(appPipelineRefresh).toHaveBeenCalledTimes(1)
    expect(setAppWizardState).toHaveBeenCalledWith(defaultAppWizardState)
  })

  it('should check if a step is valid for authorisationCode flow and no step history', async () => {
    const authFlow = 'authorisationCode'
    const stepHistory = []
    const trigger = jest.fn(() => new Promise<boolean>((resolve) => resolve(true)))

    expect(await stepIsValid(authFlow, stepHistory, trigger)).toBe(true)
  })

  it('should check if a step is valid for authorisationCode flow and has step history', async () => {
    const authFlow = 'authorisationCode'
    const stepHistory = [AppNewStepId.agencyCloudStep, AppNewStepId.clientSideStep, AppNewStepId.rcRedirectsStep]
    const trigger = jest.fn(() => new Promise<boolean>((resolve) => resolve(true)))

    expect(await stepIsValid(authFlow, stepHistory, trigger)).toBe(true)
  })
})
