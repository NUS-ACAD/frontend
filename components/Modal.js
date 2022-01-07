import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import useOnclickOutside from 'react-cool-onclickoutside';
import classNames from 'classnames';
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

function Modal({
  isShown,
  setIsShown,
  title,
  canHide = true,
  showBackButton = true,
  children,
}) {
  const [unmount, setUnmount] = useState(false);

  useEffect(() => {
    if (isShown) {
      scrollLocker.lock();
    } else {
      scrollLocker.unlock();
    }
  }, [isShown]);

  function handleClose() {
    if (!canHide) return;
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
        className="mx-4 p-7 z-50 backdrop-blur-xl modal w-full max-w-xl"
        ref={canHide ? ref : null}
        variants={ModalAnim}
        initial="hidden"
        animate={!unmount ? 'show' : 'unmount'}
      >
        {showBackButton ? (
          <motion.button
            variants={BackAnim}
            initial="hidden"
            animate={isShown ? 'show' : 'hidden'}
            onClick={handleClose}
            type="button"
            className={classNames('flex mb-5 items-center justify-start', {
              'cursor-not-allowed': !canHide,
            })}
            style={{ color: 'rgb(208, 208, 208)' }}
            disabled={!canHide}
          >
            <div
              className={classNames('mr-0.5 rotate-180', {
                'opacity-50': !canHide,
              })}
            >
              <Arrow />
            </div>{' '}
            <span className={classNames({ 'opacity-50': !canHide })}>Back</span>
          </motion.button>
        ) : null}
        <motion.h1
          variants={TitleAnim}
          initial="hidden"
          animate={isShown ? 'show' : 'hidden'}
          className="text-5xl leading-tight font-bold modal-title mb-2"
        >
          {title}
        </motion.h1>
        {children}
      </motion.div>
      <motion.div
        variants={BackgroundAnim}
        initial="hidden"
        animate={!unmount ? 'show' : 'unmount'}
        className={classNames('fixed z-40 h-full w-full top-0 left-0', {
          'cursor-pointer': canHide,
        })}
        style={{ backgroundColor: '#121212' }}
      >
        &nbsp;
      </motion.div>
    </div>
  );
}

export default Modal;
