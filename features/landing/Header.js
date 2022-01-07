import { motion } from 'framer-motion';

import Arrow from '../../assets/svgr/ButtonArrow';

import Button from '../../components/Button';

const HeaderAnim = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
};

function Header() {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={HeaderAnim}
      className="z-10 backdrop-blur-xl header fixed w-full py-4 px-4 md:px-24 flex justify-center"
    >
      <div className="w-full max-w-screen-xl flex items-center justify-between">
        <div className="font-black text-2xl">ACAD</div>
        <Button label="Login" icon={<Arrow />} className="blue-button" />
      </div>
    </motion.div>
  );
}

export default Header;
