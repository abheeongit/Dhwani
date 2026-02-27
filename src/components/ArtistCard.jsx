import { motion } from 'framer-motion'
import { gradientFromSeed } from '@/utils/helpers'
import { useNavigate } from 'react-router-dom'

export default function ArtistCard({ artist, index = 0 }) {
  const navigate = useNavigate()

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={() => navigate(`/artist/${artist.id}`)}
      className="group cursor-pointer rounded-2xl bg-white/[0.02] border border-white/[0.04] p-4 hover-lift text-center"
    >
      <div
        className="w-24 h-24 rounded-full mx-auto mb-3 shadow-lg"
        style={{ background: gradientFromSeed(artist.coverSeed ?? index + 40) }}
      />
      <h3 className="text-sm font-semibold text-white truncate">{artist.name}</h3>
      <p className="text-xs text-dhwani-muted mt-1">{artist.followers} followers</p>
    </motion.article>
  )
}
