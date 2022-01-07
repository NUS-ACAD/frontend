import { debounce } from 'debounce';
import { motion } from 'framer-motion';
import { useCallback, useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import Container from '../../components/Container';
import Input from '../../components/Input';
import Sidebar from '../../components/Sidebar';
import SITE from '../../site.config';
import MODULES from '../../data/moduleData';
import ModuleCard from '../../components/ModuleCard';
import Plan from '../../components/Plan';
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
  const plan = useStoreState((state) => state.plan);
  const addModule = useStoreActions((state) => state.addModule);
  const removeModule = useStoreActions((state) => state.removeModule);
  // This will be a string
  const [selectedModule, setSelectedModule] = useState(null);
  const [shiftSource, setShiftSource] = useState(null);

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

  if (user == null) {
    return <NotAllowed />;
  }

  const clonedPlan = JSON.parse(JSON.stringify(plan));

  if (selectedModule) {
    const moduleData = MODULES[selectedModule];
    Array.from(new Set(moduleData.semesters)).forEach((sem) => {
      [0, 1, 2, 3, 4].forEach((year) => {
        const semesterIndex = clonedPlan.semesters.findIndex(
          (semester) =>
            semester.year === user.matriculationYear + year &&
            semester.semesterNo === sem,
        );
        if (semesterIndex === -1) {
          clonedPlan.semesters.push({
            year: user.matriculationYear + year,
            semesterNo: sem,
            modules: [
              {
                moduleCode: selectedModule,
                moduleTitle: moduleData.title,
                order: 1,
                isTentative: true,
              },
            ],
          });
          return;
        }
        if (
          clonedPlan.semesters[semesterIndex]?.modules.findIndex(
            (mod) =>
              mod.moduleCode.toLowerCase() === selectedModule.toLowerCase(),
          ) !== -1
        ) {
          return;
        }
        clonedPlan.semesters[semesterIndex].modules.push({
          moduleCode: selectedModule,
          moduleTitle: moduleData.title,
          order: clonedPlan.semesters[semesterIndex].modules.length + 1,
          isTentative: true,
        });
      });
    });
  }

  const confirmAddition = (moduleCode, sem, year) => {
    // [sem, year] pair
    if (shiftSource != null) {
      removeModule({
        semesterNo: shiftSource[0],
        year: shiftSource[1],
        moduleCode,
      });
    }
    addModule({
      year,
      semesterNo: sem,
      moduleCode,
      moduleTitle: MODULES[moduleCode].title,
    });
    setSelectedModule(null);
    setShiftSource(null);
  };

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
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus
          <div
            key={mod[0]}
            className="mx-4 mt-2"
            onClick={() => {
              if (selectedModule) {
                setSelectedModule(null);
                return;
              }
              setSelectedModule(mod[0]);
            }}
            role="button"
          >
            <ModuleCard
              code={mod[0]}
              title={mod[1].title}
              isSelected={
                shiftSource == null &&
                selectedModule?.toLowerCase() === mod[0].toLowerCase()
              }
            />
          </div>
        ))}
      </Sidebar>
      <div className="sidebar-right mt-8 pl-4">
        <motion.h1 className="text-2xl mb-4 font-semibold">
          Create Academic Plan
        </motion.h1>
        <motion.div>
          <Plan
            plan={clonedPlan}
            confirmAddition={confirmAddition}
            onClickModule={(moduleCode, sem, year) => {
              if (shiftSource !== null) {
                setShiftSource(null);
                setSelectedModule(null);
                return;
              }
              setShiftSource([sem, year]);
              setSelectedModule(moduleCode);
            }}
            selectedModule={selectedModule}
            shiftSource={shiftSource}
          />
        </motion.div>
      </div>
    </Container>
  );
}

export default PlanCreate;
