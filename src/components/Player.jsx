import { motion } from 'framer-motion';
import {
  RiPlayFill,
  RiPauseFill,
  RiSkipBackFill,
  RiSkipForwardFill,
  RiShuffleLine,
  RiRepeatLine,
  RiRepeatOneLine,
  RiVolumeMuteLine,
  RiVolumeDownLine,
  RiVolumeUpLine,
  RiHeartLine,
  RiHeartFill,
  RiPlayList2Line,
  RiFullscreenLine,
} from 'react-icons/ri';
import { usePlayerStore } from '../stores/playerStore';

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function Player() {
  const {
    currentTrack,
    isPlaying,
    progress,
    duration,
    volume,
    isMuted,
    isShuffled,
    repeatMode,
    togglePlay,
    next,
    previous,
    seek,
    setVolume,
    toggleMute,
    toggleShuffle,
    toggleRepeat,
  } = usePlayerStore();

  if (!currentTrack) {
    return (
      <div className="player-bar flex items-center justify-center h-[90px]">
        <p className="text-dhwani-muted text-sm">No track playing</p>
      </div>
    );
  }

  const progressPercent = duration ? (progress / duration) * 100 : 0;

  return (
    <div className="player-bar">
      <div className="flex items-center justify-between gap-8">
        {/* Track Info */}
        <div className="flex items-center gap-4 min-w-0 w-1/4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-14 h-14 rounded-lg overflow-hidden bg-dhwani-surface-light flex-shrink-0 shadow-lg"
          >
            {currentTrack.album?.coverImage || currentTrack.coverImage ? (
              <img
                src={currentTrack.album?.coverImage || currentTrack.coverImage}
                alt={currentTrack.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-dhwani-accent to-dhwani-accent2" />
            )}
          </motion.div>
          <div className="min-w-0">
            <p className="font-medium truncate text-sm">{currentTrack.title}</p>
            <p className="text-sm text-dhwani-muted truncate">
              {currentTrack.artist?.name || 'Unknown Artist'}
            </p>
          </div>
          <button className="text-dhwani-muted hover:text-dhwani-accent3 transition-colors flex-shrink-0">
            {currentTrack.isLiked ? (
              <RiHeartFill className="text-dhwani-accent3 text-lg" />
            ) : (
              <RiHeartLine className="text-lg" />
            )}
          </button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-xl">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleShuffle}
              className={`text-lg transition-colors ${
                isShuffled ? 'text-dhwani-accent' : 'text-dhwani-muted hover:text-white'
              }`}
            >
              <RiShuffleLine />
            </button>
            <button
              onClick={previous}
              className="text-xl text-dhwani-muted hover:text-white transition-colors"
            >
              <RiSkipBackFill />
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-dhwani-bg hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <RiPauseFill className="text-xl" />
              ) : (
                <RiPlayFill className="text-xl ml-0.5" />
              )}
            </motion.button>
            <button
              onClick={next}
              className="text-xl text-dhwani-muted hover:text-white transition-colors"
            >
              <RiSkipForwardFill />
            </button>
            <button
              onClick={toggleRepeat}
              className={`text-lg transition-colors ${
                repeatMode !== 'none' ? 'text-dhwani-accent' : 'text-dhwani-muted hover:text-white'
              }`}
            >
              {repeatMode === 'one' ? <RiRepeatOneLine /> : <RiRepeatLine />}
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-3 w-full">
            <span className="text-xs text-dhwani-muted min-w-[40px] text-right">
              {formatTime(progress)}
            </span>
            <div
              className="flex-1 h-1 bg-white/20 rounded-full cursor-pointer group relative"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const percent = (e.clientX - rect.left) / rect.width;
                seek(percent * duration);
              }}
            >
              <div
                className="h-full bg-gradient-to-r from-dhwani-accent to-dhwani-accent2 rounded-full relative"
                style={{ width: `${progressPercent}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg" />
              </div>
            </div>
            <span className="text-xs text-dhwani-muted min-w-[40px]">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Volume & Extra Controls */}
        <div className="flex items-center gap-4 w-1/4 justify-end">
          <button className="text-dhwani-muted hover:text-white transition-colors">
            <RiPlayList2Line className="text-lg" />
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="text-dhwani-muted hover:text-white transition-colors"
            >
              {isMuted || volume === 0 ? (
                <RiVolumeMuteLine className="text-lg" />
              ) : volume < 0.5 ? (
                <RiVolumeDownLine className="text-lg" />
              ) : (
                <RiVolumeUpLine className="text-lg" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-24 h-1 accent-dhwani-accent"
            />
          </div>
          <button className="text-dhwani-muted hover:text-white transition-colors">
            <RiFullscreenLine className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
}
