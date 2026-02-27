import { RiPlayFill, RiHeartLine, RiHeartFill } from 'react-icons/ri';
import { usePlayerStore } from '../stores/playerStore';

function fmt(s) {
  if (!s) return '--:--';
  return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
}

function fmtPlays(n) {
  if (!n) return '';
  if (n >= 1e9) return `${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(0)}K`;
  return n.toString();
}

export default function TrackRow({ track, index, showPlays }) {
  const { currentTrack, isPlaying, playTrack } = usePlayerStore();
  const isActive = currentTrack?.id === track.id;

  return (
    <div
      onClick={() => playTrack(track)}
      className={`track-item group ${isActive ? 'bg-dhwani-surface-light' : ''}`}
    >
      {/* Number / Play */}
      <div className="w-6 text-center flex-shrink-0">
        {isActive && isPlaying ? (
          <div className="flex items-center justify-center gap-[2px]">
            {[1, 2, 3].map((b) => <div key={b} className="wave-bar" style={{ height: '12px' }} />)}
          </div>
        ) : (
          <>
            <span className={`text-xs tabular-nums group-hover:hidden ${isActive ? 'text-[#1db954] font-bold' : 'text-dhwani-muted'}`}>
              {index + 1}
            </span>
            <RiPlayFill className="text-sm text-dhwani-text hidden group-hover:block mx-auto" />
          </>
        )}
      </div>

      {/* Cover */}
      <div className="w-9 h-9 rounded overflow-hidden bg-dhwani-surface-elevated flex-shrink-0">
        {(track.album?.coverImage || track.coverImage) ? (
          <img src={track.album?.coverImage || track.coverImage} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-dhwani-surface-elevated" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className={`text-xs font-semibold truncate ${isActive ? 'text-[#1db954]' : 'text-dhwani-text'}`}>{track.title}</p>
        <p className="text-[11px] text-dhwani-muted truncate">{track.artist?.name}</p>
      </div>

      {/* Plays */}
      {showPlays && track.plays && (
        <span className="text-[11px] text-dhwani-muted tabular-nums hidden sm:block">{fmtPlays(track.plays)}</span>
      )}

      {/* Like */}
      <button
        onClick={(e) => e.stopPropagation()}
        className="text-dhwani-muted hover:text-[#1db954] transition-colors opacity-0 group-hover:opacity-100"
      >
        {track.isLiked ? <RiHeartFill className="text-[#1db954] text-sm" /> : <RiHeartLine className="text-sm" />}
      </button>

      {/* Duration */}
      <span className="text-[11px] text-dhwani-muted tabular-nums min-w-[32px] text-right">{fmt(track.duration)}</span>
    </div>
  );
}
