"use client"

import { ReactNode } from 'react'
import { NotificationsProvider } from '@mantine/notifications'
import Script from 'next/script'
import { withDVCProvider } from '@devcycle/devcycle-react-sdk'

import App from '../components/App'
import RootStyleRegistry from './emotion'

type AppProps = {
  children?: ReactNode
}

function RootLayout(props: AppProps) {
  return (
    <html lang="en-US">
      <Script src="https://beamanalytics.b-cdn.net/beam.min.js" data-token="87b2bb7d-c09d-483f-a84f-fce4a805b5b6" async />
      <body>
        <RootStyleRegistry>
          <NotificationsProvider position='top-right'>
            <App>
              {props.children}
            </App>
          </NotificationsProvider>
        </RootStyleRegistry>
      </body>
    </html>
  )
}

export default withDVCProvider({
  sdkKey: process.env.NEXT_PUBLIC_DEVCYCLE_KEY ?? ''
})(RootLayout)