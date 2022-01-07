const { default: classNames } = require('classnames');

function Button({ label, icon, onClick, className = '' }) {
  return (
    <button
      className={classNames(
        'px-4 py-3 flex justify-center items-center rounded-lg',
        className,
      )}
      type="button"
      onClick={onClick}
    >
      {label}
      {icon && <div className="ml-2.5">{icon}</div>}
    </button>
  );
}

export default Button;
