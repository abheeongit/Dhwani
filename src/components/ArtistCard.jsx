import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RiPlayFill, RiVerifiedBadgeFill } from 'react-icons/ri';

function fmtListeners(n) {
  if (!n) return '0';
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(0)}K`;
  return n.toString();
}

export default function ArtistCard({ artist, index = 0 }) {
  return (
    <Link to={`/artist/${artist.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.04 }}
        className="group cursor-pointer p-3 rounded-lg hover:bg-dhwani-surface-light transition-colors text-center"
      >
        <div className="relative mb-3 mx-auto">
          <div className="aspect-square rounded-full overflow-hidden bg-dhwani-surface-light shadow group-hover:shadow-lg transition-shadow">
            {artist.avatar ? (
              <img src={artist.avatar} alt={artist.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-dhwani-surface-elevated" />
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.06 }}
            className="absolute bottom-1 right-1 w-10 h-10 bg-[#1db954] hover:bg-[#1ed760] rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all"
          >
            <RiPlayFill className="text-black text-lg ml-px" />
          </motion.button>
        </div>
        <div className="flex items-center justify-center gap-1 mb-0.5">
          <p className="font-bold text-xs truncate text-dhwani-text">{artist.name}</p>
          {artist.verified && <RiVerifiedBadgeFill className="text-[#1db954] text-xs flex-shrink-0" />}
        </div>
        <p className="text-[11px] text-dhwani-muted">{fmtListeners(artist.monthlyListeners)} listeners</p>
      </motion.div>
    </Link>
  );
}
