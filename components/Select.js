import classNames from 'classnames';

// Options are of form: { text: string, value: string }
function Select({
  options,
  selectedOption,
  onChange,
  placeholder,
  className = '',
  isDisabled = false,
  isOptional = false,
}) {
  const handleChange = (event) => {
    if (event.target.value === placeholder) {
      onChange('');
      return;
    }
    onChange(event.target.value);
  };

  return (
    <div className="select-wrapper">
      <select
        className={classNames(
          `outline-none mx-0 px-6 rounded-xl text-white select`,
          className,
          {
            'cursor-not-allowed': isDisabled,
          },
        )}
        value={selectedOption?.value ?? placeholder}
        onChange={handleChange}
        disabled={isDisabled}
      >
        <option value={placeholder} disabled={!isOptional}>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
