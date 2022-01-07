import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Modal from '../../components/Modal';
import SITE from '../../site.config';
import Arrow from '../../assets/svgr/ButtonArrow';
import {
  validateDegree,
  validateEmail,
  validateMajor,
  validateMatriculationYear,
  validateMinor,
  validateName,
  validatePassword,
} from '../../utils/validations';
import Select from '../../components/Select';
import DEGREES from '../../data/degrees';
import MAJORS from '../../data/majors';
import MINORS from '../../data/minors';
import { register } from '../../services/auth';
import tokenUtils from '../../utils/token';

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

const NameAnim = {
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

const EmailAnim = {
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

const PasswordAnim = {
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

const FirstMinorAnim = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 1.1,
    },
  },
};

const SecondMinorAnim = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 1.2,
    },
  },
};

const MatricYearAnim = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 1.3,
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
      delay: 1.1,
    },
  },
};

const ButtonsAnimTwo = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 1.4,
    },
  },
};

function RegisterModal() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [primaryDegree, setPrimaryDegree] = useState('');
  const [secondDegree, setSecondDegree] = useState('');
  const [secondMajor, setSecondMajor] = useState('');
  const [firstMinor, setFirstMinor] = useState('');
  const [secondMinor, setSecondMinor] = useState('');
  const [matriculationYear, setMatriculationYear] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [nextPageDisabled, setNextPageDisabled] = useState(true);
  const [registerDisabled, setRegisterDisabled] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (
      validateEmail(email) &&
      validatePassword(password) &&
      validateName(name)
    ) {
      setNextPageDisabled(false);
    } else {
      setNextPageDisabled(true);
    }
  }, [email, password, name]);

  useEffect(() => {
    if (
      validateDegree(primaryDegree) &&
      validateDegree(secondDegree, false) &&
      validateMajor(secondMajor) &&
      validateMinor(firstMinor) &&
      validateMinor(secondMinor) &&
      validateMatriculationYear(matriculationYear)
    ) {
      setRegisterDisabled(false);
    } else {
      setRegisterDisabled(true);
    }
  }, [
    firstMinor,
    matriculationYear,
    primaryDegree,
    secondDegree,
    secondMajor,
    secondMinor,
  ]);

  const handleNextPage = () => {
    setPage(1);
  };

  const handlePreviousPage = () => {
    setPage(0);
  };

  const handleRegister = async () => {
    if (
      !validateEmail(email) ||
      !validatePassword(password) ||
      !validateName(name) ||
      !validateDegree(primaryDegree) ||
      !validateDegree(secondDegree, false) ||
      !validateMajor(secondMajor) ||
      !validateMinor(firstMinor) ||
      !validateMinor(secondMinor) ||
      !validateMatriculationYear(matriculationYear)
    ) {
      return;
    }
    setIsLoading(true);
    await register({
      name,
      email,
      password,
      primaryDegree,
      secondDegree,
      secondMajor,
      firstMinor,
      secondMinor,
      matriculationYear,
    })
      .then((data) => {
        // TODO: Handle the returned user data
        tokenUtils.storeToken(data.token);
        router.push('/home');
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Modal
        canHide={false}
        isShown={page === 0}
        setIsShown={(_) => undefined}
        title="Register"
        showBackButton={false}
      >
        <motion.div
          variants={SubtitleAnim}
          initial="hidden"
          animate="show"
          className="font-semibold text-lg mb-6"
        >
          Welcome to {SITE.title}, where we excel at academic planning together.
          First, tell us more about yourself!
        </motion.div>
        <motion.div variants={NameAnim} initial="hidden" animate="show">
          <Input
            type="text"
            value={name}
            onChange={setName}
            className="w-full mb-2"
            placeholder="Name"
          />
        </motion.div>
        <motion.div variants={EmailAnim} initial="hidden" animate="show">
          <Input
            type="email"
            value={email}
            onChange={setEmail}
            className="w-full mb-2"
            placeholder="Email"
          />
        </motion.div>
        <motion.div variants={PasswordAnim} initial="hidden" animate="show">
          <Input
            type="password"
            value={password}
            onChange={setPassword}
            className="w-full mb-6"
            placeholder="Password"
          />
        </motion.div>
        <motion.div
          variants={ButtonsAnim}
          initial="hidden"
          animate="show"
          className="flex justify-end items-center"
        >
          <Button
            label="Next"
            icon={<Arrow />}
            className="blue-button"
            onClick={handleNextPage}
            isDisabled={nextPageDisabled}
          />
        </motion.div>
      </Modal>
      <Modal
        canHide={false}
        isShown={page === 1}
        setIsShown={(_) => undefined}
        title="Register"
        showBackButton={false}
      >
        <motion.div
          variants={SubtitleAnim}
          initial="hidden"
          animate="show"
          className="font-semibold text-lg mb-6"
        >
          Now, let us know what you&apos;re studying!
        </motion.div>
        <motion.div variants={NameAnim} initial="hidden" animate="show">
          <Select
            className="w-full mb-2"
            options={DEGREES.map((d) => ({ value: d, text: d }))}
            selectedOption={{ value: primaryDegree, text: primaryDegree }}
            onChange={setPrimaryDegree}
            placeholder="Primary Degree"
            isDisabled={isLoading}
          />
        </motion.div>
        <motion.div variants={EmailAnim} initial="hidden" animate="show">
          <Select
            className="w-full mb-2"
            options={DEGREES.map((d) => ({ value: d, text: d }))}
            selectedOption={{ value: secondDegree, text: secondDegree }}
            onChange={setSecondDegree}
            placeholder="Second Degree (Optional)"
            isOptional
            isDisabled={isLoading}
          />
        </motion.div>
        <motion.div variants={PasswordAnim} initial="hidden" animate="show">
          <Select
            className="w-full mb-2"
            options={MAJORS.map((m) => ({ value: m, text: m }))}
            selectedOption={{ value: secondMajor, text: secondMajor }}
            onChange={setSecondMajor}
            placeholder="Second Major (Optional)"
            isOptional
            isDisabled={isLoading}
          />
        </motion.div>
        <motion.div variants={FirstMinorAnim} initial="hidden" animate="show">
          <Select
            className="w-full mb-2"
            options={MINORS.map((m) => ({ value: m, text: m }))}
            selectedOption={{ value: firstMinor, text: firstMinor }}
            onChange={setFirstMinor}
            placeholder="First Minor (Optional)"
            isOptional
            isDisabled={isLoading}
          />
        </motion.div>
        <motion.div variants={SecondMinorAnim} initial="hidden" animate="show">
          <Select
            className="w-full mb-2"
            options={MINORS.map((m) => ({ value: m, text: m }))}
            selectedOption={{ value: secondMinor, text: secondMinor }}
            onChange={setSecondMinor}
            placeholder="Second Minor (Optional)"
            isOptional
            isDisabled={isLoading}
          />
        </motion.div>
        <motion.div variants={MatricYearAnim} initial="hidden" animate="show">
          <Input
            type="number"
            value={matriculationYear}
            onChange={setMatriculationYear}
            className="w-full mb-6"
            placeholder="Matriculation Year"
            isDisabled={isLoading}
          />
        </motion.div>
        <motion.div
          variants={ButtonsAnimTwo}
          initial="hidden"
          animate="show"
          className="flex justify-between items-center"
        >
          <Button
            label="Back"
            icon={
              <div className="rotate-180">
                <Arrow />
              </div>
            }
            className="blue-button"
            onClick={handlePreviousPage}
            isDisabled={isLoading}
            isLeftIcon
          />
          <Button
            label="Register"
            className="blue-button"
            onClick={handleRegister}
            isLoading={isLoading}
            isDisabled={registerDisabled}
          />
        </motion.div>
      </Modal>
    </>
  );
}

export default RegisterModal;
