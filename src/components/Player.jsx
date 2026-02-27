import { useCallback } from 'react'
import { motion } from 'framer-motion'
import { usePlayerStore, useUIStore } from '@/store'
import { useMediaQuery } from '@/hooks'
import { formatTime, gradientFromSeed, cn } from '@/utils/helpers'
import {
  HiPlay,
  HiPause,
  HiForward,
  HiBackward,
  HiArrowPath,
  HiSpeakerWave,
  HiSpeakerXMark,
  HiQueueList,
} from 'react-icons/hi2'
import { PiShuffleBold } from 'react-icons/pi'

export default function Player() {
  const {
    currentTrack,
    isPlaying,
    progress,
    duration,
    volume,
    isMuted,
    shuffle,
    repeatMode,
    togglePlay,
    playNext,
    playPrev,
    setVolume,
    toggleMute,
    toggleShuffle,
    setRepeatMode,
    setProgress,
  } = usePlayerStore()

  const collapsed = useUIStore((s) => s.sidebarCollapsed)
  const isMobile = useMediaQuery(900)
  const sidebarW = collapsed || isMobile ? 72 : 240

  const handleSeek = useCallback(
    (e) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
      setProgress(pct * duration)
    },
    [duration, setProgress],
  )

  const pct = duration ? (progress / duration) * 100 : 0

  return (
    <div
      className="fixed bottom-0 right-0 z-50 transition-all duration-300"
      style={{ left: sidebarW }}
    >
      <div className="mx-4 mb-3 rounded-2xl glass glow-accent flex items-center gap-4 px-5 py-3 h-[96px]">
        {/* ── Left: track info ── */}
        <div className="flex items-center gap-3 min-w-[180px] max-w-[260px]">
          <div
            className="w-14 h-14 rounded-lg shrink-0 shadow-lg"
            style={{
              background: currentTrack
                ? gradientFromSeed(currentTrack.coverSeed ?? 0)
                : 'linear-gradient(135deg,#6f5cff,#35d7ff)',
            }}
          />
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-white truncate">
              {currentTrack?.title ?? 'No track selected'}
            </p>
            <p className="text-xs text-dhwani-muted truncate">
              {currentTrack?.artist ?? '—'}
            </p>
          </div>
        </div>

        {/* ── Center: controls + seekbar ── */}
        <div className="flex-1 flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleShuffle}
              className={cn(
                'p-1.5 rounded-lg transition-colors hover:bg-white/[0.06]',
                shuffle ? 'text-dhwani-accent' : 'text-dhwani-muted',
              )}
            >
              <PiShuffleBold className="w-4 h-4" />
            </button>
            <button onClick={playPrev} className="p-1.5 rounded-lg text-white hover:bg-white/[0.06] transition-colors">
              <HiBackward className="w-5 h-5" />
            </button>

            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={togglePlay}
              className="w-10 h-10 rounded-full gradient-accent flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow"
            >
              {isPlaying ? <HiPause className="w-5 h-5" /> : <HiPlay className="w-5 h-5 ml-0.5" />}
            </motion.button>

            <button onClick={playNext} className="p-1.5 rounded-lg text-white hover:bg-white/[0.06] transition-colors">
              <HiForward className="w-5 h-5" />
            </button>
            <button
              onClick={setRepeatMode}
              className={cn(
                'p-1.5 rounded-lg transition-colors hover:bg-white/[0.06]',
                repeatMode !== 'off' ? 'text-dhwani-accent' : 'text-dhwani-muted',
              )}
            >
              <HiArrowPath className="w-4 h-4" />
              {repeatMode === 'one' && (
                <span className="absolute text-[8px] font-bold">1</span>
              )}
            </button>
          </div>

          {/* Seekbar */}
          <div className="flex items-center gap-2 w-full max-w-[520px]">
            <span className="text-[10px] text-dhwani-muted w-8 text-right tabular-nums">
              {formatTime(progress)}
            </span>
            <div
              className="flex-1 h-1 bg-white/[0.08] rounded-full cursor-pointer group relative"
              onClick={handleSeek}
            >
              <div
                className="h-full rounded-full gradient-accent transition-[width] duration-100"
                style={{ width: `${pct}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ left: `calc(${pct}% - 6px)` }}
              />
            </div>
            <span className="text-[10px] text-dhwani-muted w-8 tabular-nums">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* ── Right: volume + icons ── */}
        <div className="flex items-center gap-3 min-w-[160px] justify-end">
          <button className="p-1.5 rounded-lg text-dhwani-muted hover:text-white hover:bg-white/[0.06] transition-colors">
            <HiQueueList className="w-4 h-4" />
          </button>
          <button onClick={toggleMute} className="p-1.5 rounded-lg text-dhwani-muted hover:text-white hover:bg-white/[0.06] transition-colors">
            {isMuted || volume === 0 ? (
              <HiSpeakerXMark className="w-4 h-4" />
            ) : (
              <HiSpeakerWave className="w-4 h-4" />
            )}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={isMuted ? 0 : volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-24 accent-dhwani-accent"
          />
        </div>
      </div>
    </div>
  )
}
