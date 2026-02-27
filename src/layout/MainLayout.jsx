import React from 'react'
import Sidebar from '../components/Sidebar'
import Player from '../components/Player'
import '../styles/layout.css'

export default function MainLayout({ children }) {
  return (
    <div className="dhwani-app">
      <Sidebar />
      <main className="main-content" role="main">
        <div className="content-inner">{children}</div>
      </main>
      <Player />
    </div>
  )
}
