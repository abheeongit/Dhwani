import { motion } from 'framer-motion'
import { gradientFromSeed } from '@/utils/helpers'
import { useNavigate } from 'react-router-dom'

export default function PlaylistCard({ playlist, index = 0 }) {
  const navigate = useNavigate()

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={() => navigate(`/playlist/${playlist.id}`)}
      className="group cursor-pointer rounded-2xl bg-white/[0.02] border border-white/[0.04] p-4 hover-lift"
    >
      <div
        className="aspect-square rounded-xl mb-3 shadow-lg"
        style={{ background: gradientFromSeed(playlist.coverSeed ?? index) }}
      />
      <h3 className="text-sm font-semibold text-white truncate">{playlist.title}</h3>
      <p className="text-xs text-dhwani-muted mt-1">{playlist.trackCount} tracks</p>
    </motion.article>
  )
}
