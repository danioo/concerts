"use client"

import { NotificationsProvider } from '@mantine/notifications'
import Script from 'next/script'

import App from '../components/App'
import RootStyleRegistry from './emotion'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US">
      <Script src="https://beamanalytics.b-cdn.net/beam.min.js" data-token="87b2bb7d-c09d-483f-a84f-fce4a805b5b6" async />
      <body>
        <RootStyleRegistry>
          <NotificationsProvider position='top-right'>
            <App>
              {children}
            </App>
          </NotificationsProvider>
        </RootStyleRegistry>
      </body>
    </html>
  )
}