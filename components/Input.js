const { default: classNames } = require('classnames');

function Input({ type, value, onChange, placeholder, className = '' }) {
  return (
    <input
      type={type}
      className={classNames(
        'outline-none mx-0 px-6 input rounded-xl text-white',
        className,
      )}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
    />
  );
}

export default Input;
