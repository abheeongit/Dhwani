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
} from 'react-icons/ri';
import { usePlayerStore } from '../stores/playerStore';

function fmt(s) {
  if (!s || isNaN(s)) return '0:00';
  return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`;
}

export default function Player() {
  const {
    currentTrack, isPlaying, progress, duration, volume, isMuted,
    isShuffled, repeatMode,
    togglePlay, next, previous, seek, setVolume, toggleMute, toggleShuffle, toggleRepeat,
  } = usePlayerStore();

  if (!currentTrack) {
    return (
      <div className="player-bar">
        <div className="flex items-center justify-center h-full w-full">
          <p className="text-dhwani-muted text-xs">Select a track to play</p>
        </div>
      </div>
    );
  }

  const pct = duration ? (progress / duration) * 100 : 0;

  return (
    <div className="player-bar">
      <div className="flex items-center justify-between gap-4 h-full max-w-screen-2xl mx-auto w-full">
        {/* Track Info */}
        <div className="flex items-center gap-3 min-w-0 w-[30%]">
          <div className="w-12 h-12 rounded-md overflow-hidden bg-dhwani-surface-light flex-shrink-0">
            {(currentTrack.album?.coverImage || currentTrack.coverImage) ? (
              <img src={currentTrack.album?.coverImage || currentTrack.coverImage} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-dhwani-surface-elevated" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-medium text-xs text-dhwani-text truncate">{currentTrack.title}</p>
            <p className="text-[11px] text-dhwani-muted truncate">{currentTrack.artist?.name || 'Unknown'}</p>
          </div>
          <button className="text-dhwani-muted hover:text-[#1db954] transition-colors flex-shrink-0">
            {currentTrack.isLiked ? <RiHeartFill className="text-[#1db954] text-sm" /> : <RiHeartLine className="text-sm" />}
          </button>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-1 flex-1 max-w-[40%]">
          <div className="flex items-center gap-4">
            <button onClick={toggleShuffle} className={`text-xs transition-colors ${isShuffled ? 'text-[#1db954]' : 'text-dhwani-muted hover:text-dhwani-text'}`}>
              <RiShuffleLine />
            </button>
            <button onClick={previous} className="text-lg text-dhwani-muted hover:text-dhwani-text transition-colors">
              <RiSkipBackFill />
            </button>
            <button
              onClick={togglePlay}
              className="w-8 h-8 rounded-full bg-dhwani-text flex items-center justify-center text-dhwani-bg hover:scale-105 transition-transform"
            >
              {isPlaying ? <RiPauseFill className="text-sm" /> : <RiPlayFill className="text-sm ml-px" />}
            </button>
            <button onClick={next} className="text-lg text-dhwani-muted hover:text-dhwani-text transition-colors">
              <RiSkipForwardFill />
            </button>
            <button onClick={toggleRepeat} className={`text-xs transition-colors ${repeatMode !== 'none' ? 'text-[#1db954]' : 'text-dhwani-muted hover:text-dhwani-text'}`}>
              {repeatMode === 'one' ? <RiRepeatOneLine /> : <RiRepeatLine />}
            </button>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-2 w-full">
            <span className="text-[10px] text-dhwani-muted min-w-[32px] text-right tabular-nums">{fmt(progress)}</span>
            <div
              className="flex-1 h-1 bg-dhwani-surface-elevated rounded-full cursor-pointer group relative"
              onClick={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                seek(((e.clientX - r.left) / r.width) * duration);
              }}
            >
              <div className="h-full bg-dhwani-text group-hover:bg-[#1db954] rounded-full relative transition-colors" style={{ width: `${pct}%` }}>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-dhwani-text rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm" />
              </div>
            </div>
            <span className="text-[10px] text-dhwani-muted min-w-[32px] tabular-nums">{fmt(duration)}</span>
          </div>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2 w-[30%] justify-end">
          <button onClick={toggleMute} className="text-dhwani-muted hover:text-dhwani-text transition-colors">
            {isMuted || volume === 0 ? <RiVolumeMuteLine className="text-sm" /> : volume < 0.5 ? <RiVolumeDownLine className="text-sm" /> : <RiVolumeUpLine className="text-sm" />}
          </button>
          <div className="w-20 h-1 bg-dhwani-surface-elevated rounded-full cursor-pointer group relative">
            <div className="h-full bg-dhwani-text group-hover:bg-[#1db954] rounded-full relative transition-colors" style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-dhwani-text rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <input
              type="range" min="0" max="1" step="0.01"
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="absolute inset-0 w-full opacity-0 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
