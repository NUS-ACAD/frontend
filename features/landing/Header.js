import { useStoreState } from 'easy-peasy';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

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

function Header({ setIsModalShown }) {
  const user = useStoreState((state) => state.user);
  const router = useRouter();

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={HeaderAnim}
      className="z-10 backdrop-blur-xl header fixed w-full py-4 px-4 md:px-32 flex justify-center"
    >
      <div className="w-full max-w-screen-2xl flex items-center justify-between">
        <div className="font-black text-2xl">ACAD</div>
        <Button
          label={user ? 'Back to App' : 'Login'}
          icon={<Arrow />}
          className="blue-button"
          onClick={() => {
            if (user) {
              router.push('/home');
              return;
            }
            setIsModalShown(true);
          }}
        />
      </div>
    </motion.div>
  );
}

export default Header;
