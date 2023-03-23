import { IconsProps } from "./IconsProps";

const IconCheckBox = ({
  className,
  fill = "none",
  stroke = "white",
}: IconsProps) => {
  return (
    <svg
      className={className}
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="4.35881"
        y1="9.01546"
        x2="0.823277"
        y2="5.47992"
        stroke={stroke}
        strokeWidth="2"
      />
      <line
        x1="3.82842"
        y1="8.13176"
        x2="9.13172"
        y2="2.82846"
        stroke={stroke}
        strokeWidth="2"
      />
    </svg>
  );
};

export default IconCheckBox;
