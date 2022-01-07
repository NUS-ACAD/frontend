function SvgComponent(props) {
  return (
    <svg
      width={12}
      height={12}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="m10.558 6.835-4.31 4.982M1.58 6.835h8.978H1.58Zm8.978 0-4.31-4.982 4.31 4.982Z"
        stroke="#fff"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgComponent;
