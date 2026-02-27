import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/utils/helpers'
import { useUIStore } from '@/store'
import { useMediaQuery } from '@/hooks'
import {
  HiHome,
  HiMagnifyingGlass,
  HiMusicalNote,
  HiChartBar,
  HiCog6Tooth,
  HiSparkles,
  HiUserGroup,
} from 'react-icons/hi2'

const navItems = [
  { to: '/home', label: 'Home', icon: HiHome },
  { to: '/search', label: 'Search', icon: HiMagnifyingGlass },
  { to: '/library', label: 'Library', icon: HiMusicalNote },
  { to: '/mood', label: 'Mood AI', icon: HiSparkles },
  { to: '/friends', label: 'Friends', icon: HiUserGroup },
  { to: '/analytics', label: 'Analytics', icon: HiChartBar },
  { to: '/settings', label: 'Settings', icon: HiCog6Tooth },
]

export default function Sidebar() {
  const collapsed = useUIStore((s) => s.sidebarCollapsed)
  const isMobile = useMediaQuery(900)
  const isCollapsed = collapsed || isMobile

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 bottom-0 z-40 flex flex-col justify-between',
        'bg-gradient-to-b from-[#14122280] to-[#0e0d1a80] backdrop-blur-md',
        'border-r border-white/[0.04] transition-all duration-300',
        isCollapsed ? 'w-[72px]' : 'w-[240px]',
      )}
    >
      {/* Logo */}
      <div className="flex flex-col">
        <div className={cn('flex items-center gap-3 px-5 pt-7 pb-8', isCollapsed && 'justify-center px-0')}>
          <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center text-white font-bold text-sm shrink-0">
            D
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                className="gradient-text text-xl font-bold tracking-wide select-none"
              >
                Dhwani
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 px-3">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  'hover:bg-white/[0.04] hover:translate-x-0.5',
                  isActive
                    ? 'bg-white/[0.06] text-white shadow-[0_0_20px_rgba(138,108,255,0.08)]'
                    : 'text-dhwani-muted',
                  isCollapsed && 'justify-center px-0',
                )
              }
            >
              <Icon className="w-5 h-5 shrink-0 transition-colors group-hover:text-dhwani-accent" />
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="whitespace-nowrap overflow-hidden"
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Profile */}
      <div className={cn('px-4 pb-6', isCollapsed && 'px-2')}>
        <div
          className={cn(
            'flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-white/[0.04] cursor-pointer',
            isCollapsed && 'justify-center',
          )}
        >
          <div className="w-9 h-9 rounded-full gradient-accent shrink-0 shadow-lg" />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="overflow-hidden">
                <p className="text-sm font-semibold text-white truncate">Alex Morgan</p>
                <p className="text-xs text-dhwani-muted">Premium</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </aside>
  )
}
