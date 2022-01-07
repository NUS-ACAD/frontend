import { motion } from 'framer-motion';
import Link from 'next/link';
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
        className="flex items-center"
      >
        <Link href="/home" passHref>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className="font-black text-2xl ml-4 my-4 mr-1">{SITE.title}</a>
        </Link>
        <div
          className="text-xs font-semibold py-1 px-2 rounded-lg"
          style={{ backgroundColor: '#ed506e', transform: 'scale(0.7)' }}
        >
          BETA
        </div>
      </motion.div>
      {children}
    </div>
  );
}

export default Sidebar;
