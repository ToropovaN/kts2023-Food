import { IconsProps } from "./IconsProps";

const IconPlus = ({
  className,
  fill = "none",
  stroke = "white",
}: IconsProps) => {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path stroke={stroke} d="m 5.89288,0.75 v 10.5" />
      <path stroke={stroke} d="m 0.75,6.1071801 h 10.5" />
    </svg>
  );
};

export default IconPlus;
