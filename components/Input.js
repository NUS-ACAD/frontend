const { default: classNames } = require('classnames');

function Input({
  type,
  value,
  onChange,
  placeholder,
  isDisabled,
  className = '',
}) {
  return (
    <input
      type={type}
      className={classNames(
        'outline-none mx-0 px-6 input rounded-xl text-white',
        className,
        {
          'cursor-not-allowed opacity-70': isDisabled,
        },
      )}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      disabled={isDisabled}
    />
  );
}

export default Input;
