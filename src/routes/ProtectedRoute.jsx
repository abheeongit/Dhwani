import { Navigate } from 'react-router-dom'
import { useUserStore } from '@/stores'

export default function ProtectedRoute({ children }) {
  const token = useUserStore((s) => s.token)
  // Allow demo access without authentication
  // In production, change to: if (!token) return <Navigate to="/login" replace />
  if (!token && false) return <Navigate to="/login" replace />
  return children
}
