import { motion } from 'framer-motion'
import { cn, gradientFromSeed } from '@/utils/helpers'
import { usePlayerStore } from '@/store'

export default function TrackRow({ track, index }) {
  const setTrack = usePlayerStore((s) => s.setTrack)

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      onClick={() => setTrack(track)}
      className="group flex items-center gap-4 px-4 py-2.5 rounded-xl cursor-pointer transition-colors hover:bg-white/[0.04]"
    >
      <span className="w-6 text-xs text-dhwani-muted text-right tabular-nums">
        {index + 1}
      </span>
      <div
        className="w-10 h-10 rounded-lg shrink-0"
        style={{ background: gradientFromSeed(track.coverSeed ?? index) }}
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">{track.title}</p>
        <p className="text-xs text-dhwani-muted truncate">{track.artist}</p>
      </div>
      <span className="text-xs text-dhwani-muted tabular-nums">
        {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}
      </span>
      <button
        onClick={(e) => { e.stopPropagation() }}
        className={cn(
          'text-xs px-2 py-1 rounded-lg transition-colors',
          track.liked
            ? 'text-dhwani-accent'
            : 'text-dhwani-muted hover:text-white',
        )}
      >
        {track.liked ? '♥' : '♡'}
      </button>
    </motion.div>
  )
}
