import AppShell from '../../components/AppShell';

export default function ConcertsLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell>
      {children}
    </AppShell>
  )
}