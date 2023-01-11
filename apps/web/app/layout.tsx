import RootStyleRegistry from './emotion';
import AppShell from '../components/AppShell';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US">
      <body>
        <RootStyleRegistry>
          <AppShell>
            {children}
          </AppShell>
        </RootStyleRegistry>
      </body>
    </html>
  )
}