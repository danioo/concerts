"use client"

import App from '../components/App'
import RootStyleRegistry from './emotion'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US">
      <body>
        <RootStyleRegistry>
          <App>
            {children}
          </App>
        </RootStyleRegistry>
      </body>
    </html>
  )
}