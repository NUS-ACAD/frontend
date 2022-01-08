import classNames from 'classnames';
import ModuleCard from '../ModuleCard';

function StatelessYearColumn({ year, semesters }) {
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
              className="text-center font-semibold text-lg mb-0"
              style={{ color: '#7B7B81' }}
            >
              {getSemName(sem)}
            </h2>
            <div className="flex flex-col overflow-y-auto">
              {semToDataMap[sem]?.modules
                ?.sort((a, b) => a.order - b.order)
                ?.map((m, index) => (
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                  <div
                    key={m.moduleCode}
                    className={classNames({
                      'mt-2': index !== 0,
                      'mt-4': index === 0,
                    })}
                  >
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

function StatelessPlan({ plan }) {
  // Assumption: start year of plan === user start year
  const years = [
    plan.startYear,
    plan.startYear + 1,
    plan.startYear + 2,
    plan.startYear + 3,
  ];
  if (plan.semesters?.some((sem) => sem.year === plan.startYear + 4)) {
    years.push(plan.startYear + 4);
  }

  return (
    <div className="overflow-x-auto stateless-plan">
      <div className="flex">
        {years.map((year) => (
          <StatelessYearColumn
            key={year}
            year={year}
            semesters={plan.semesters.filter((sem) => sem.year === year)}
          />
        ))}
      </div>
    </div>
  );
}

export default StatelessPlan;
