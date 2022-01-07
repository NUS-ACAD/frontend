const { default: classNames } = require('classnames');

function Button({ label, icon, onClick, isDisabled = false, className = '' }) {
  return (
    <button
      className={classNames(
        'px-4 py-3 flex justify-center items-center rounded-lg',
        className,
        { 'opacity-50 cursor-not-allowed': isDisabled },
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
