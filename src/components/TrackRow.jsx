import { motion } from 'framer-motion';
import { RiPlayFill, RiHeartLine, RiHeartFill, RiMoreLine } from 'react-icons/ri';
import { usePlayerStore } from '../stores/playerStore';

function formatDuration(seconds) {
  if (!seconds) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function formatPlays(plays) {
  if (!plays) return '0';
  if (plays >= 1000000000) return `${(plays / 1000000000).toFixed(1)}B`;
  if (plays >= 1000000) return `${(plays / 1000000).toFixed(1)}M`;
  if (plays >= 1000) return `${(plays / 1000).toFixed(1)}K`;
  return plays.toString();
}

export default function TrackRow({ track, index, showAlbum = true, showPlays = false }) {
  const { currentTrack, isPlaying, playTrack, togglePlay } = usePlayerStore();
  const isCurrentTrack = currentTrack?.id === track.id;

  const handlePlay = () => {
    if (isCurrentTrack) {
      togglePlay();
    } else {
      playTrack(track);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className={`track-item group ${isCurrentTrack ? 'bg-white/5' : ''}`}
      onClick={handlePlay}
    >
      {/* Track Number / Play Button */}
      <div className="w-8 flex items-center justify-center">
        {isCurrentTrack && isPlaying ? (
          <div className="flex items-center gap-0.5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="wave-bar" style={{ height: `${10 + i * 4}px` }} />
            ))}
          </div>
        ) : (
          <>
            <span className="text-sm text-dhwani-muted group-hover:hidden">
              {index + 1}
            </span>
            <button className="hidden group-hover:flex items-center justify-center w-8 h-8 rounded-full bg-dhwani-accent text-white">
              <RiPlayFill className="text-lg" />
            </button>
          </>
        )}
      </div>

      {/* Track Image & Info */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-10 h-10 rounded overflow-hidden bg-dhwani-surface-light flex-shrink-0">
          {track.album?.coverImage || track.coverImage ? (
            <img
              src={track.album?.coverImage || track.coverImage}
              alt={track.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-dhwani-accent/50 to-dhwani-accent2/50" />
          )}
        </div>
        <div className="min-w-0">
          <p className={`font-medium text-sm truncate ${isCurrentTrack ? 'text-dhwani-accent' : ''}`}>
            {track.title}
          </p>
          <p className="text-xs text-dhwani-muted truncate">
            {track.artist?.name || 'Unknown Artist'}
          </p>
        </div>
      </div>

      {/* Album */}
      {showAlbum && (
        <div className="hidden md:block w-1/4 min-w-0">
          <p className="text-sm text-dhwani-muted truncate">
            {track.album?.title || 'Single'}
          </p>
        </div>
      )}

      {/* Plays */}
      {showPlays && (
        <div className="hidden md:block w-20 text-right">
          <p className="text-sm text-dhwani-muted">{formatPlays(track.plays)}</p>
        </div>
      )}

      {/* Duration & Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            // Toggle like
          }}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-dhwani-muted hover:text-dhwani-accent3"
        >
          {track.isLiked ? (
            <RiHeartFill className="text-dhwani-accent3" />
          ) : (
            <RiHeartLine />
          )}
        </button>
        <span className="text-sm text-dhwani-muted w-12 text-right">
          {formatDuration(track.duration)}
        </span>
        <button
          onClick={(e) => e.stopPropagation()}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-dhwani-muted hover:text-white"
        >
          <RiMoreLine />
        </button>
      </div>
    </motion.div>
  );
}
