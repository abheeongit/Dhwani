import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RiPlayFill, RiVerifiedBadgeFill } from 'react-icons/ri';

function formatListeners(num) {
  if (!num) return '0';
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
  return num.toString();
}

export default function ArtistCard({ artist, index = 0 }) {
  return (
    <Link to={`/artist/${artist.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        whileHover={{ y: -5 }}
        className="group cursor-pointer"
      >
        <div className="relative mb-4">
          <div className="w-full aspect-square rounded-full overflow-hidden bg-dhwani-surface-light shadow-xl group-hover:shadow-2xl group-hover:shadow-dhwani-accent/20 transition-shadow">
            {artist.avatar ? (
              <img
                src={artist.avatar}
                alt={artist.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-dhwani-accent to-dhwani-accent2" />
            )}
          </div>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            className="absolute bottom-2 right-2 w-12 h-12 bg-dhwani-accent rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <RiPlayFill className="text-white text-xl ml-0.5" />
          </motion.button>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <p className="font-semibold truncate">{artist.name}</p>
            {artist.verified && (
              <RiVerifiedBadgeFill className="text-dhwani-accent2 flex-shrink-0" />
            )}
          </div>
          <p className="text-sm text-dhwani-muted">
            {formatListeners(artist.monthlyListeners)} monthly listeners
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
