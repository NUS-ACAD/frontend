import { debounce } from 'debounce';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useRouter } from 'next/router';
import Container from '../../components/Container';
import Input from '../../components/Input';
import Sidebar from '../../components/Sidebar';
import SITE from '../../site.config';
import MODULES from '../../data/moduleData';
import ModuleCard from '../../components/ModuleCard';
import Plan from '../../components/Plan';
import NotAllowed from '../../components/NotAllowed';
import Button from '../../components/Button';
import { updateModuleValidity } from '../../utils/validations';
import { createPlan } from '../../services/plan';

const MODULE_ARRAY = Object.entries(MODULES);

function getRelevantModules(searchString) {
  if (!searchString) {
    return [];
  }
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
  const updateTitle = useStoreActions((state) => state.updateTitle);
  const updateDescription = useStoreActions((state) => state.updateDescription);
  const updateStartYear = useStoreActions((state) => state.updateStartYear);
  // This will be the module code
  const [selectedModule, setSelectedModule] = useState(null);
  const [shiftSource, setShiftSource] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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

  useEffect(() => {
    if (user && user?.matriculationYear !== plan.startYear) {
      updateStartYear(user.matriculationYear);
    }
  }, [plan.startYear, updateStartYear, user]);

  if (user == null) {
    return <NotAllowed />;
  }

  const clonedPlan = JSON.parse(JSON.stringify(plan));

  if (selectedModule) {
    const moduleData = MODULES[selectedModule];
    Array.from(new Set(moduleData.semesters)).forEach((sem) => {
      [0, 1, 2, 3, 4].forEach((year) => {
        if (clonedPlan.semesters == null) {
          clonedPlan.semesters = [];
        }
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
          clonedPlan.semesters[semesterIndex]?.modules?.findIndex(
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

  updateModuleValidity(clonedPlan);

  const confirmAddition = (moduleCode, sem, year) => {
    if (isLoading) return;
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

  const onRemove = (moduleCode, sem, year) => {
    if (isLoading) return;
    if (selectedModule) {
      // Don't allow deletion when a module is selected
      return;
    }
    removeModule({
      semesterNo: sem,
      year,
      moduleCode,
    });
  };

  const onCreate = async () => {
    setIsLoading(true);
    await createPlan({
      ...plan,
      isPrimary: false,
      startYear: user.matriculationYear,
    })
      .then((data) => {
        router.push(`/plan/update/${data.id}`);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <Container
      title={`Create Plan | ${SITE.title}`}
      description={SITE.description}
    >
      <Sidebar>
        <motion.div className="px-4 mb-1">
          <Input
            className="w-full"
            onChange={onSearchChange}
            placeholder="Search for modules"
          />
        </motion.div>
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
                selectedModule &&
                selectedModule.toLowerCase() === mod[0].toLowerCase()
              }
            />
          </div>
        ))}
      </Sidebar>
      <div className="sidebar-right mt-6 pl-4">
        <div className="flex items-center justify-between pr-4 mb-2">
          <motion.h1 className="text-2xl mr-4 font-semibold">
            Create Academic Plan
          </motion.h1>
          <Button
            label="Create"
            className="blue-button"
            isDisabled={
              clonedPlan.title.length === 0 ||
              clonedPlan.description.length === 0
            }
            isLoading={isLoading}
            onClick={onCreate}
          />
        </div>
        <div className="flex pr-4 mb-8">
          <Input
            className="w-full mr-2 plan-create-name"
            type="text"
            value={clonedPlan.title}
            onChange={updateTitle}
            placeholder="Name"
            isDisabled={isLoading}
          />
          <Input
            className="w-full ml-2 plan-create-description"
            type="text"
            value={clonedPlan.description}
            onChange={updateDescription}
            placeholder="Description"
            isDisabled={isLoading}
          />
        </div>
        <motion.div>
          <Plan
            plan={clonedPlan}
            confirmAddition={confirmAddition}
            onClickModule={(moduleCode, sem, year) => {
              if (isLoading) return;
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
            onRemove={onRemove}
          />
        </motion.div>
      </div>
    </Container>
  );
}

export default PlanCreate;
