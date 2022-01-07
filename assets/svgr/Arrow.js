function SvgComponent(props) {
  return (
    <svg width={24} height={24} fill="none" {...props}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m13.75 6.75 5.5 5.25-5.5 5.25M19 12H4.75"
      />
    </svg>
  );
}

export default SvgComponent;
