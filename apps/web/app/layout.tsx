"use client"

import { NotificationsProvider } from '@mantine/notifications'
import App from '../components/App'
import RootStyleRegistry from './emotion'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US">
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