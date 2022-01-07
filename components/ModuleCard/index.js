import classNames from 'classnames';

function ModuleCard({ code, title, semesters, isSelected = false }) {
  return (
    <div
      className={classNames(
        'flex flex-col p-2 rounded-lg sidebar-card cursor-pointer',
        {
          'animate-bounce z-500': isSelected,
        },
      )}
      style={{ backgroundColor: '#201F28' }}
    >
      <div className="text-s font-semibold mb-1 sidebar-card-title">{code}</div>
      <div className="text-xs mb-1">{title}</div>
      {semesters && (
        <div className="flex">
          {semesters.map((sem) => (
            <div
              key={sem}
              className="text-xs font-semibold py-1 px-2 rounded-lg"
              style={{ backgroundColor: '#ed506e', transform: 'scale(0.7)' }}
            >
              SEM {sem}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ModuleCard;
