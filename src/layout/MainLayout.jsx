import { Outlet } from 'react-router-dom'
import { Sidebar, Player } from '@/components'
import { useUIStore } from '@/stores'
import { useMediaQuery } from '@/hooks'
import { cn } from '@/utils/helpers'

export default function MainLayout() {
  const collapsed = useUIStore((s) => s.sidebarCollapsed)
  const isMobile = useMediaQuery(900)
  const sidebarW = collapsed || isMobile ? 72 : 240

  return (
    <div className="min-h-screen bg-dhwani-bg">
      <Sidebar />
      <main
        className={cn(
          'min-h-screen transition-all duration-300',
          'bg-gradient-to-b from-dhwani-bg to-dhwani-surface',
        )}
        style={{ marginLeft: sidebarW }}
      >
        <div className="px-8 pt-8 pb-36 max-w-[1400px] mx-auto">
          <Outlet />
        </div>
      </main>
      <Player />
    </div>
  )
}
