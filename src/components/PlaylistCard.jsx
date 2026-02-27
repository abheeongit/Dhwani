import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RiPlayFill, RiMusic2Line } from 'react-icons/ri';

export default function PlaylistCard({ playlist, index = 0, size = 'normal' }) {
  const sizeClasses = {
    small: 'w-36',
    normal: 'w-44',
    large: 'w-56',
  };

  return (
    <Link to={`/playlist/${playlist.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className={`group cursor-pointer ${sizeClasses[size]}`}
      >
        <div className="relative mb-3">
          <div className="aspect-square rounded-xl overflow-hidden bg-dhwani-surface-light shadow-lg group-hover:shadow-xl group-hover:shadow-dhwani-accent/10 transition-all duration-300">
            {playlist.coverImage ? (
              <img
                src={playlist.coverImage}
                alt={playlist.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-dhwani-accent to-dhwani-accent3 flex items-center justify-center">
                <RiMusic2Line className="text-4xl text-white/50" />
              </div>
            )}
          </div>
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ scale: 1.05 }}
            className="absolute bottom-3 right-3 w-11 h-11 bg-dhwani-accent rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform translate-y-2 transition-all duration-300"
          >
            <RiPlayFill className="text-white text-xl ml-0.5" />
          </motion.button>
        </div>
        <div>
          <p className="font-semibold truncate mb-1 group-hover:text-dhwani-accent transition-colors">
            {playlist.title}
          </p>
          <p className="text-sm text-dhwani-muted truncate">
            {playlist.description || `${playlist._count?.tracks || 0} tracks`}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
