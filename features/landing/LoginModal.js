import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Modal from '../../components/Modal';
import SITE from '../../site.config';
import Arrow from '../../assets/svgr/ButtonArrow';
import { validateEmail, validatePassword } from '../../utils/validations';

const SubtitleAnim = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.7,
    },
  },
};

const EmailAnim = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.8,
    },
  },
};

const PasswordAnim = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.9,
    },
  },
};

const ButtonsAnim = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 1,
    },
  },
};

function LoginModal({ isShown, setIsShown }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const setIsShownWrapper = (newIsShown) => {
    if (!newIsShown) {
      setIsShown(false);
      setEmail('');
      setPassword('');
      setIsDisabled(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (validateEmail(email) && validatePassword(password)) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password]);

  const handleLogin = () => {
    if (!validateEmail(email) || !validatePassword(password)) {
      return;
    }
    setIsLoading(true);
    // TODO: Make the API call with the data
  };

  return (
    <Modal
      isShown={isShown}
      setIsShown={setIsShownWrapper}
      title="Welcome Back!"
      canHide={!isLoading}
    >
      <motion.div
        variants={SubtitleAnim}
        initial="hidden"
        animate={isShown ? 'show' : 'hidden'}
        className="font-semibold text-lg mb-6"
      >
        Glad to see you back at {SITE.title}! Let&apos;s plan our university
        journey together!
      </motion.div>
      <motion.div
        variants={EmailAnim}
        initial="hidden"
        animate={isShown ? 'show' : 'hidden'}
      >
        <Input
          type="email"
          value={email}
          onChange={setEmail}
          className="w-full mb-2"
          placeholder="Email"
          isDisabled={isLoading}
        />
      </motion.div>
      <motion.div
        variants={PasswordAnim}
        initial="hidden"
        animate={isShown ? 'show' : 'hidden'}
      >
        <Input
          type="password"
          value={password}
          onChange={setPassword}
          className="w-full mb-6"
          placeholder="Password"
          isDisabled={isLoading}
        />
      </motion.div>
      <motion.div
        variants={ButtonsAnim}
        initial="hidden"
        animate={isShown ? 'show' : 'hidden'}
        className="flex justify-between items-center"
      >
        {isLoading ? (
          <div
            className="text-sm opacity-50 cursor-not-allowed"
            style={{ color: 'rgb(208, 208, 208)' }}
          >
            Create an account
          </div>
        ) : (
          <Link href="/register" passHref>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="text-sm" style={{ color: '#E17D8A' }}>
              Create an account
            </a>
          </Link>
        )}
        <Button
          label="Login"
          icon={<Arrow />}
          className="blue-button"
          onClick={handleLogin}
          isLoading={isLoading}
          isDisabled={isDisabled}
        />
      </motion.div>
    </Modal>
  );
}

export default LoginModal;
