import { Navigate } from 'react-router-dom'
import { useUserStore } from '@/store'

export default function ProtectedRoute({ children }) {
  const isAuth = useUserStore((s) => s.isAuthenticated)
  if (!isAuth) return <Navigate to="/login" replace />
  return children
}
