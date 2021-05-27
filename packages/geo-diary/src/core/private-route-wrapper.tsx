import React, { FC, Suspense, useEffect } from 'react'
import Menu from '@/components/ui/menu'
import { AppNavContainer, Helper, isMobile, notification, Section } from '@reapit/elements'
import ErrorBoundary from './error-boundary'
import { Redirect, useLocation } from 'react-router'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { ApolloProvider } from '@apollo/react-hooks'
import getClient from '@/graphql/client'
import { Loader } from '@reapit/elements/v3'

export const PrivateRouteWrapper: FC = ({ children }) => {
  const { connectSession, connectInternalRedirect } = useReapitConnect(reapitConnectBrowserSession)
  const location = useLocation()
  const currentUri = `${location.pathname}${location.search}`

  const isMobileView = isMobile()

  useEffect(() => {
    if (isMobileView && !window.matchMedia('(display-mode: standalone)').matches) {
      notification.info({
        message: (
          <>
            Did you know, you can save GEO Diary to your home screen?{' '}
            <a href="https://reapit-1.gitbook.io/g/" target="_blank" rel="noopener noreferrer">
              Tap here to find out how.
            </a>
          </>
        ),
      })
    }
  }, [])

  if (!connectSession) {
    return (
      <AppNavContainer>
        <Loader label="Loading" fullPage />
      </AppNavContainer>
    )
  }

  if (!connectSession?.loginIdentity?.userCode) {
    return (
      <AppNavContainer>
        <Menu />
        <Section>
          <Helper variant="info">
            We could not detect that you are a negotiator for your organisation from your login. Try logging out and
            then back in again. If this does not work, please contact your Reapit administrator.
          </Helper>
        </Section>
      </AppNavContainer>
    )
  }

  if (connectInternalRedirect && currentUri !== connectInternalRedirect) {
    return <Redirect to={connectInternalRedirect} />
  }

  return (
    <AppNavContainer>
      <Menu />
      <Suspense fallback={<Loader label="Loading" fullPage />}>
        <ErrorBoundary>
          <ApolloProvider client={getClient(connectSession, window.reapit.config.graphqlUri)}>
            {children}
          </ApolloProvider>
        </ErrorBoundary>
      </Suspense>
    </AppNavContainer>
  )
}

export default PrivateRouteWrapper
