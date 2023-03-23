import { IconsProps } from "./IconsProps";

const IconCheck = ({
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
      <path
        d="M 0.87905178,5.4815791 4.7504284,9.1376281 11.24327,2.2894269"
        stroke={stroke}
      />
    </svg>
  );
};

export default IconCheck;
