import { debounce } from 'debounce';
import { motion } from 'framer-motion';
import { useCallback, useState } from 'react';
import { useStoreState } from 'easy-peasy';
import Container from '../../components/Container';
import Input from '../../components/Input';
import Sidebar from '../../components/Sidebar';
import SITE from '../../site.config';
import MODULES from '../../data/moduleData';
import ModuleCard from '../../components/ModuleCard';
import Plan from '../../components/Plan';
import { FAKE_PLAN } from '../../data/fakeData';
import NotAllowed from '../../components/NotAllowed';

const MODULE_ARRAY = Object.entries(MODULES);

function getRelevantModules(searchString) {
  const loweredSearchString = searchString.toLowerCase();
  return MODULE_ARRAY.filter((m) =>
    m[0].toLowerCase().includes(loweredSearchString),
  );
}

function PlanCreate() {
  const [modules, setModules] = useState([]);
  const user = useStoreState((state) => state.user);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSearchChange = useCallback(
    debounce((value) => {
      if (value == null || value === '') {
        setModules([]);
        return;
      }
      const relevantModules = getRelevantModules(value);
      setModules(relevantModules);
    }, 500),
    [],
  );

  if (!user) {
    return <NotAllowed />;
  }

  return (
    <Container
      title={`Create Plan | ${SITE.title}`}
      description={SITE.description}
    >
      <Sidebar>
        <Input
          className="mx-4 shrink-0 mb-1"
          onChange={onSearchChange}
          placeholder="Search for modules"
        />
        {modules.map((mod) => (
          <div key={mod[0]} className="mx-4 mt-2">
            <ModuleCard code={mod[0]} title={mod[1].title} />
          </div>
        ))}
      </Sidebar>
      <div className="sidebar-right mt-8 pl-4">
        <motion.h1 className="text-2xl mb-4 font-semibold">
          Create Academic Plan
        </motion.h1>
        <motion.div>
          <Plan plan={FAKE_PLAN} />
        </motion.div>
      </div>
    </Container>
  );
}

export default PlanCreate;
