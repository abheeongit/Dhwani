import { useRef, useEffect, useCallback } from 'react'
import usePlayerStore from '@/store/usePlayerStore'

/**
 * Hook that wires an HTML5 <audio> element to the Zustand player store.
 * Returns a ref to attach to an <audio> element.
 */
export default function useAudioPlayer() {
  const audioRef = useRef(null)
  const {
    currentTrack,
    isPlaying,
    volume,
    isMuted,
    setProgress,
    setDuration,
    playNext,
  } = usePlayerStore()

  // Play / pause
  useEffect(() => {
    const el = audioRef.current
    if (!el) return
    if (isPlaying) {
      el.play().catch(() => {})
    } else {
      el.pause()
    }
  }, [isPlaying, currentTrack])

  // Volume
  useEffect(() => {
    const el = audioRef.current
    if (!el) return
    el.volume = isMuted ? 0 : volume
  }, [volume, isMuted])

  // Time update
  useEffect(() => {
    const el = audioRef.current
    if (!el) return
    const onTime = () => setProgress(el.currentTime)
    const onMeta = () => setDuration(el.duration)
    const onEnd = () => playNext()
    el.addEventListener('timeupdate', onTime)
    el.addEventListener('loadedmetadata', onMeta)
    el.addEventListener('ended', onEnd)
    return () => {
      el.removeEventListener('timeupdate', onTime)
      el.removeEventListener('loadedmetadata', onMeta)
      el.removeEventListener('ended', onEnd)
    }
  }, [setProgress, setDuration, playNext])

  const seek = useCallback((time) => {
    const el = audioRef.current
    if (el) el.currentTime = time
  }, [])

  return { audioRef, seek }
}
