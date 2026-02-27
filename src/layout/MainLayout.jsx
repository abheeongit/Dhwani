import { Outlet } from 'react-router-dom'
import { Sidebar, Player } from '@/components'

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-dhwani-bg transition-colors duration-300">
      <Sidebar />
      <main className="main-content">
        <div className="max-w-[1200px]">
          <Outlet />
        </div>
      </main>
      <Player />
    </div>
  )
}
