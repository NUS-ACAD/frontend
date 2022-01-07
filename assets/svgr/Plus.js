function SvgComponent(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      height={16}
      width={16}
      data-view-component="true"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M7.75 2a.75.75 0 0 1 .75.75V7h4.25a.75.75 0 1 1 0 1.5H8.5v4.25a.75.75 0 1 1-1.5 0V8.5H2.75a.75.75 0 0 1 0-1.5H7V2.75A.75.75 0 0 1 7.75 2z"
        fill="#7B7B81"
      />
    </svg>
  );
}

export default SvgComponent;
