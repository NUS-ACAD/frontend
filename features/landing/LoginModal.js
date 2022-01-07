import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Modal from '../../components/Modal';
import SITE from '../../site.config';
import Arrow from '../../assets/svgr/ButtonArrow';

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

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
  return password.length >= 8;
}

function LoginModal({ isShown, setIsShown }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const setIsShownWrapper = (newIsShown) => {
    if (!newIsShown) {
      setIsShown(false);
      setEmail('');
      setPassword('');
      setIsDisabled(true);
    }
  };

  useEffect(() => {
    if (validateEmail(email) && validatePassword(password)) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password]);

  return (
    <Modal
      isShown={isShown}
      setIsShown={setIsShownWrapper}
      title="Welcome Back!"
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
        />
      </motion.div>
      <motion.div
        variants={PasswordAnim}
        initial="hidden"
        animate={isShown ? 'show' : 'hidden'}
        className="mb-4"
      >
        <Input
          type="password"
          value={password}
          onChange={setPassword}
          className="w-full"
          placeholder="Password"
        />
      </motion.div>
      <motion.div
        variants={ButtonsAnim}
        initial="hidden"
        animate={isShown ? 'show' : 'hidden'}
        className="flex justify-between items-center"
      >
        <button className="text-sm" style={{ color: '#E17D8A' }} type="button">
          Create an account
        </button>
        <Button
          label="Login"
          icon={<Arrow />}
          className="blue-button"
          onClick={() => undefined}
          isDisabled={isDisabled}
        />
      </motion.div>
    </Modal>
  );
}

export default LoginModal;
