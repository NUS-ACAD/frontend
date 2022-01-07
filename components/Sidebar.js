import { motion } from 'framer-motion';
import SITE from '../site.config';

const BackgroundAnim = {
  hidden: {
    x: -50,
    opacity: 0,
  },
  show: {
    opacity: [0, 1, 1, 1],
    x: 0,

    transition: {
      duration: 2.5,
      type: 'spring',
      velocity: 100,
      stiffness: 700,
      damping: 100,
    },
  },
};

function Sidebar({ children }) {
  return (
    <div
      className="rounded-xl fixed top-0 left-0 flex flex-col overflow-x-hidden z-30 overflow-y-auto m-4 sidebar"
      style={{ backgroundColor: '#16161E' }}
    >
      <motion.div
        variants={BackgroundAnim}
        initial="hidden"
        animate="show"
        className="font-black text-2xl m-4"
      >
        {SITE.title}
      </motion.div>
      {children}
    </div>
  );
}

export default Sidebar;
