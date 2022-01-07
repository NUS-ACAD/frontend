import { useStoreState } from 'easy-peasy';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import Arrow from '../../assets/svgr/ButtonArrow';
import Button from '../../components/Button';

const OuterContainerAnim = {
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

const ContentContainerAnim = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: 0.2,
    },
  },
};

const InnerContentAnim = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: 0.2,
    },
  },
};

const TitleAnim = {
  hidden: {
    y: 80,
    opacity: 0,
  },
  show: {
    opacity: [0, 1, 1, 1],
    y: 0,

    transition: {
      duration: 1.5,
      delay: 0.8,
      type: 'spring',
      velocity: 100,
      stiffness: 700,
      damping: 100,
    },
  },
};

const SubtitleAnim = {
  hidden: {
    y: 80,
    opacity: 0,
  },
  show: {
    opacity: [0, 1, 1, 1],
    y: 0,

    transition: {
      duration: 1.5,
      delay: 0.9,
      type: 'spring',
      velocity: 100,
      stiffness: 700,
      damping: 100,
    },
  },
};

const ButtonAnim = {
  hidden: {
    y: 80,
    opacity: 0,
  },
  show: {
    opacity: [0, 1, 1, 1],
    y: 0,

    transition: {
      duration: 1.5,
      delay: 1,
      type: 'spring',
      velocity: 100,
      stiffness: 700,
      damping: 100,
    },
  },
};

const BackgroundAnim = {
  hidden: {
    x: 100,
    opacity: 0,
  },
  show: {
    opacity: [0, 1, 1, 1],
    x: 0,

    transition: {
      duration: 2.5,
      delay: 1.2,
      type: 'spring',
      velocity: 100,
      stiffness: 700,
      damping: 100,
    },
  },
};

function Hero({ setIsModalShown }) {
  const user = useStoreState((state) => state.user);
  const router = useRouter();

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={OuterContainerAnim}
      className="rounded-3xl w-full relative max-w-screen-2xl overflow-hidden welcome-hero mt-28 mb-8"
    >
      <motion.div
        initial="hidden"
        animate="show"
        variants={ContentContainerAnim}
        className="w-full h-full z-10 px-8 md:px-24 flex flex-col items-start justify-start md:justify-center"
      >
        <motion.div
          initial="hidden"
          animate="show"
          variants={InnerContentAnim}
          className="flex flex-col z-10 mb-80 sm:mb-0 mt-8 sm:mt-16 md:mt-0 items-center md:items-start"
        >
          <motion.h1
            initial="hidden"
            animate="show"
            variants={TitleAnim}
            className="text-3xl sm:text-5xl md:text-7xl mb-2.5 md:mb-8 font-bold welcome-hero-title text-center md:text-left"
          >
            The academic planner you never knew you needed.
          </motion.h1>
          <motion.h2
            initial="hidden"
            animate="show"
            variants={SubtitleAnim}
            className="text-lg sm:text-xl md:text-2xl mb-8 md:leading-normal font-semibold welcome-hero-subtitle text-center md:text-left"
          >
            Plan your university journey together with your friends effortlessly
            now.
          </motion.h2>
          <motion.div initial="hidden" animate="show" variants={ButtonAnim}>
            <Button
              label={user ? 'Back to App' : 'Get Started'}
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
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.div
        variants={BackgroundAnim}
        initial="hidden"
        animate="show"
        className="h-full w-full absolute top-0 left-0 z-0 welcome-hero-background"
      />
    </motion.div>
  );
}

export default Hero;
