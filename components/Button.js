import Loader from 'react-loader-spinner';

const { default: classNames } = require('classnames');

function Button({
  label,
  icon,
  onClick,
  isDisabled = false,
  isLoading,
  isLeftIcon = false,
  className = '',
}) {
  return (
    <button
      className={classNames(
        'px-4 py-3 flex justify-center items-center rounded-lg',
        className,
        { 'opacity-50 cursor-not-allowed': isDisabled || isLoading },
      )}
      type="button"
      onClick={onClick}
      disabled={isDisabled || isLoading}
    >
      {isLeftIcon && icon && !isLoading && <div className="mr-2.5">{icon}</div>}
      {isLeftIcon && isLoading && (
        <Loader
          className="mr-2.5"
          type="TailSpin"
          color="#fff"
          height={20}
          width={20}
        />
      )}
      {label}
      {!isLeftIcon && icon && !isLoading && (
        <div className="ml-2.5">{icon}</div>
      )}
      {!isLeftIcon && isLoading && (
        <Loader
          className="ml-2.5"
          type="TailSpin"
          color="#fff"
          height={20}
          width={20}
        />
      )}
    </button>
  );
}

export default Button;
