import React, { useEffect } from 'react'
import Menu from './menu'
import { Redirect, useLocation } from 'react-router'
import Routes from '../constants/routes'
import { ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../core/connect-session'
import { Loader, MainContainer } from '@reapit/elements'
import { HelperWidget, HelperWidgetApps } from '@reapit/utils-react'
import { GlobalProvider } from './use-global-state'
import { openChatbot } from '../scripts/chat-bot'

const { Suspense } = React

export type PrivateRouteWrapperProps = {
  children?: React.ReactNode
  path: string
  showMenu?: boolean
}

export const handleOpenChatbot = (connectSession: ReapitConnectSession | null) => () => {
  if (
    connectSession?.loginIdentity.developerId &&
    window.reapit.config.liveChatWhitelist.includes(connectSession.loginIdentity.developerId)
  ) {
    openChatbot(connectSession.loginIdentity)
  }
}

export const PrivateRouteWrapper: React.FunctionComponent<PrivateRouteWrapperProps> = ({
  children,
  showMenu = true,
}) => {
  if (window.location.pathname === '/') {
    return <Redirect to={Routes.LOGIN} />
  }

  const { connectSession, connectInternalRedirect } = useReapitConnect(reapitConnectBrowserSession)

  const location = useLocation()
  const currentUri = `${location.pathname}${location.search}`

  useEffect(handleOpenChatbot(connectSession), [connectSession])

  if (!connectSession) {
    return (
      <MainContainer>
        <Loader fullPage />
      </MainContainer>
    )
  }

  if (connectInternalRedirect && currentUri !== connectInternalRedirect) {
    return <Redirect to={connectInternalRedirect} />
  }

  return (
    <GlobalProvider>
      <MainContainer>
        {showMenu && location.pathname !== Routes.CUSTOMER_REGISTER && <Menu />}
        <Suspense fallback={<Loader fullPage />}>{children}</Suspense>
        {window.reapit.config.appEnv !== 'production' && <HelperWidget appName={HelperWidgetApps.developerPortal} />}
      </MainContainer>
    </GlobalProvider>
  )
}

export default PrivateRouteWrapper
