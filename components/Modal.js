import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import useOnclickOutside from 'react-cool-onclickoutside';
import scrollLocker from '../utils/scrollLocker';
import Arrow from '../assets/svgr/Arrow';

const BackgroundAnim = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 0.5,
  },
  unmount: {
    opacity: 0,

    transition: {
      delay: 0.35,
    },
  },
};

const ModalAnim = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: [0, 1],
    y: 0,
    transition: {
      delay: 0.35,
    },
  },
  unmount: {
    opacity: [1, 0],
    y: -30,
    transition: {
      ease: 'easeOut',
    },
  },
};

const BackAnim = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5,
    },
  },
};

const TitleAnim = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.6,
    },
  },
};

function Modal({ isShown, setIsShown, title, children }) {
  const [unmount, setUnmount] = useState(false);

  useEffect(() => {
    if (isShown) {
      scrollLocker.lock();
    } else {
      scrollLocker.unlock();
    }
  }, [isShown]);

  function handleClose() {
    setUnmount(true);
    setTimeout(() => {
      setIsShown(false);
      setUnmount(false);
    }, 1000);
  }

  const ref = useOnclickOutside(() => {
    if (isShown) {
      handleClose();
    }
  });

  if (!isShown) {
    return null;
  }

  return (
    <div className="h-full w-screen z-40 fixed top-0 left-0 overflow-x-hidden overflow-y-auto flex justify-center items-center min-h-fit max-w-full">
      <motion.div
        className="p-7 z-50 backdrop-blur-xl modal w-full max-w-xl"
        ref={ref}
        variants={ModalAnim}
        initial="hidden"
        animate={!unmount ? 'show' : 'unmount'}
      >
        <motion.button
          variants={BackAnim}
          initial="hidden"
          animate={isShown ? 'show' : 'hidden'}
          onClick={handleClose}
          type="button"
          className="flex mb-5 items-center justify-start"
          style={{ color: 'rgb(208, 208, 208)' }}
        >
          <div className="mr-0.5 rotate-180">
            <Arrow />
          </div>{' '}
          Back
        </motion.button>
        <motion.h1
          variants={TitleAnim}
          initial="hidden"
          animate={isShown ? 'show' : 'hidden'}
          className="text-5xl font-bold modal-title mb-2"
        >
          {title}
        </motion.h1>
        {children}
      </motion.div>
      <motion.div
        variants={BackgroundAnim}
        initial="hidden"
        animate={!unmount ? 'show' : 'unmount'}
        className="fixed z-40 h-full w-full top-0 left-0 cursor-pointer"
        style={{ backgroundColor: '#121212' }}
      >
        &nbsp;
      </motion.div>
    </div>
  );
}

export default Modal;
