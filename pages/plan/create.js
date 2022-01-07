import { motion } from 'framer-motion';
import { useState } from 'react';
import Container from '../../components/Container';
import Input from '../../components/Input';
import Sidebar from '../../components/Sidebar';
import SITE from '../../site.config';

function PlanCreate() {
  const [searchValue, setSearchValue] = useState('');
  return (
    <Container
      title={`Create Plan | ${SITE.title}`}
      description={SITE.description}
    >
      <Sidebar>
        <Input
          className="mx-4"
          value={searchValue}
          onChange={setSearchValue}
          placeholder="Search for modules"
        />
      </Sidebar>
      <div className="sidebar-right mt-8 pl-4">
        <motion.h1 className="text-2xl mb-4 font-semibold">
          Create Academic Plan
        </motion.h1>
      </div>
    </Container>
  );
}

export default PlanCreate;
