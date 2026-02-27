import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '@/layout/MainLayout'
import ProtectedRoute from './ProtectedRoute'
import {
  LandingPage,
  LoginPage,
  RegisterPage,
  HomePage,
  SearchPage,
  LibraryPage,
  PlaylistPage,
  ArtistPage,
  MoodPage,
  AnalyticsPage,
  SettingsPage,
  FriendsPage,
} from '@/pages'

const router = createBrowserRouter([
  /* ── Public ── */
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },

  /* ── Authenticated (inside MainLayout) ── */
  {
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '/home', element: <HomePage /> },
      { path: '/search', element: <SearchPage /> },
      { path: '/library', element: <LibraryPage /> },
      { path: '/playlist/:id', element: <PlaylistPage /> },
      { path: '/artist/:id', element: <ArtistPage /> },
      { path: '/mood', element: <MoodPage /> },
      { path: '/analytics', element: <AnalyticsPage /> },
      { path: '/settings', element: <SettingsPage /> },
      { path: '/friends', element: <FriendsPage /> },
    ],
  },
])

export default router
