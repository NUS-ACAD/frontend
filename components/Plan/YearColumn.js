import classNames from 'classnames';
import ModuleCard from '../ModuleCard';

function YearColumn({
  year,
  semesters,
  confirmAddition,
  selectedModule,
  shiftSource,
  onClickModule,
  onRemove,
}) {
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

  console.log(semesters);

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
                ?.map((m, index) => {
                  const isSelected =
                    shiftSource != null &&
                    shiftSource[0] === sem &&
                    shiftSource[1] === year &&
                    selectedModule.toLowerCase() === m.moduleCode.toLowerCase();
                  return (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                    <div
                      key={m.moduleCode}
                      className={classNames({
                        'opacity-50 hover:opacity-100': m.isTentative,
                        'mt-2': index !== 0,
                        'mt-4': index === 0,
                      })}
                      onClick={
                        m.isTentative
                          ? () => confirmAddition(m.moduleCode, sem, year)
                          : () => onClickModule(m.moduleCode, sem, year)
                      }
                    >
                      <ModuleCard
                        hasError={m.hasError}
                        code={m.moduleCode}
                        title={m.moduleTitle}
                        isSelected={isSelected}
                        onRemove={(event) => {
                          event.stopPropagation();
                          onRemove(m.moduleCode, sem, year);
                        }}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default YearColumn;
