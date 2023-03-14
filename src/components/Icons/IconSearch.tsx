import { IconsProps } from "./IconsProps";

const IconSearch = ({
  className,
  fill = "none",
  stroke = "white",
}: IconsProps) => {
  return (
    <svg
      className={className}
      width="16"
      height="14"
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.05269 11.5C10.2732 11.5 12.8839 9.1495 12.8839 6.25C12.8839 3.35051 10.2732 1 7.05269 1C3.83218 1 1.22144 3.35051 1.22144 6.25C1.22144 9.1495 3.83218 11.5 7.05269 11.5Z"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.1758 9.96246L14.5496 13"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconSearch;
