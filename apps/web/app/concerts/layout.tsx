import AppShell from '../../components/AppShell';

export const metadata = {
  title: "Concerts"
}

export default function ConcertsLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell>
      {children}
    </AppShell>
  )
}