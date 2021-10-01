import ReapitConnectButtonComponent from './components/reapit-connect-component.svelte'
import { ReapitConnectBrowserSession } from '@reapit/connect-session'

export interface ReapitConnectInitializers {
  connectClientId: string
  connectOAuthUrl: string
  connectUserPoolId: string
  connectLoginRedirectPath: string
  connectLogoutRedirectPath: string
  rootElement: Element | ShadowRoot | string
  connectHasSessionCallback: (session: ReapitConnectBrowserSession) => any
  companyName: string
}

export const reapitConnectComponent = ({
  connectClientId,
  connectOAuthUrl,
  connectUserPoolId,
  connectLoginRedirectPath,
  connectLogoutRedirectPath,
  rootElement,
  connectHasSessionCallback,
  companyName,
}: ReapitConnectInitializers) => {
  const reapitConnectBrowserSession = new ReapitConnectBrowserSession({
    connectClientId,
    connectOAuthUrl,
    connectUserPoolId,
    connectLoginRedirectPath,
    connectLogoutRedirectPath,
  })

  new ReapitConnectButtonComponent({
    target: typeof rootElement === 'string' ? document.querySelector(rootElement) : rootElement,
    props: {
      reapitConnectBrowserSession,
      connectHasSessionCallback,
      companyName,
    },
  })
}

Object.defineProperty(window, 'reapitConnectComponent', {
  value: reapitConnectComponent,
})
