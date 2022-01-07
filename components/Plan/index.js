import YearColumn from './YearColumn';

// This is a plan with drag and drop.
// The plan props comes from the redux store, i.e. if you change the redux
// store interface, please change it here too.
function Plan({
  plan,
  confirmAddition,
  onClickModule,
  selectedModule,
  shiftSource,
}) {
  // Assumption: start year of plan === user start year
  const years = [
    plan.startYear,
    plan.startYear + 1,
    plan.startYear + 2,
    plan.startYear + 3,
  ];
  if (plan.semesters.some((sem) => sem.year === plan.startYear + 4)) {
    years.push(plan.startYear + 4);
  }

  return (
    <div className="overflow-x-auto plan">
      <div className="flex">
        {years.map((year) => (
          <YearColumn
            key={year}
            year={year}
            semesters={plan.semesters.filter((sem) => sem.year === year)}
            confirmAddition={confirmAddition}
            selectedModule={selectedModule}
            shiftSource={shiftSource}
            onClickModule={onClickModule}
          />
        ))}
      </div>
    </div>
  );
}

export default Plan;
