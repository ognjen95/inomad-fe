type CheckedProps = {
  iconColor: string;
};

const Checked = ({ iconColor }: CheckedProps) => (
  <svg
    width="12px"
    height="12px"
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={iconColor}
  >
    <path
      d="M1 3.99999L3.82843 6.82842L9.48468 1.17154"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Checked;
