import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RiPlayFill, RiMusic2Line } from 'react-icons/ri';

export default function PlaylistCard({ playlist, index = 0 }) {
  return (
    <Link to={`/playlist/${playlist.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.04 }}
        className="group cursor-pointer p-3 rounded-lg hover:bg-dhwani-surface-light transition-colors"
      >
        <div className="relative mb-3">
          <div className="aspect-square rounded-md overflow-hidden bg-dhwani-surface-light shadow group-hover:shadow-lg transition-shadow">
            {playlist.coverImage ? (
              <img src={playlist.coverImage} alt={playlist.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-dhwani-surface-elevated flex items-center justify-center">
                <RiMusic2Line className="text-2xl text-dhwani-muted" />
              </div>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.06 }}
            className="absolute bottom-1.5 right-1.5 w-10 h-10 bg-[#1db954] hover:bg-[#1ed760] rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all"
          >
            <RiPlayFill className="text-black text-lg ml-px" />
          </motion.button>
        </div>
        <p className="font-bold text-xs truncate text-dhwani-text mb-0.5">{playlist.title}</p>
        <p className="text-[11px] text-dhwani-muted truncate leading-relaxed">
          {playlist.description || `${playlist._count?.tracks || 0} tracks`}
        </p>
      </motion.div>
    </Link>
  );
}
