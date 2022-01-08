import classNames from 'classnames';
import Cross from '../../assets/svgr/Cross';

function ModuleCard({
  hasError = false,
  code,
  title,
  semesters,
  onRemove,
  isSelected = false,
}) {
  return (
    <div
      className={classNames(
        'flex flex-col p-2 rounded-lg sidebar-card cursor-pointer',
        {
          'animate-bounce z-500': isSelected,
        },
      )}
      style={{ backgroundColor: hasError ? '#572d34' : '#201F28' }}
    >
      <div className="text-s font-semibold mb-1 sidebar-card-title flex items-center justify-between">
        {code}
        {onRemove && (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <div onClick={onRemove}>
            <Cross />
          </div>
        )}
      </div>
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
