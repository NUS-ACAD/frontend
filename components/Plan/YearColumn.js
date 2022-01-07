import ModuleCard from '../ModuleCard';

function YearColumn({ year, semesters }) {
  const sems = Array.from(
    new Set([1, 2, ...semesters.map((sem) => sem.semesterNo)]),
  ).sort();
  const semToDataMap = semesters.reduce((prev, curr) => {
    // eslint-disable-next-line no-param-reassign
    prev[curr.semesterNo] = curr;
    return prev;
  }, {});

  const getSemName = (sem) => {
    if (sem >= 3) {
      return `ST PART ${sem - 2}`;
    }
    return `SEM ${sem}`;
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-center font-bold text-2xl mb-2">{`AY${year}/${
        year + 1
      }`}</h1>
      <div className="flex">
        {sems.map((sem) => (
          <div className="flex flex-col mr-4 plan-semester" key={sem}>
            <h2
              className="text-center font-semibold text-lg mb-2"
              style={{ color: '#7B7B81' }}
            >
              {getSemName(sem)}
            </h2>
            <div className="flex flex-col overflow-y-auto">
              {semToDataMap[sem]?.mods
                ?.sort((a, b) => a.order - b.order)
                ?.map((m) => (
                  <div key={m.moduleCode} className="mt-2">
                    <ModuleCard code={m.moduleCode} title={m.moduleTitle} />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default YearColumn;
