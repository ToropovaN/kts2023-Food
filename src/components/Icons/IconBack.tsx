import { IconsProps } from "./IconsProps";

const IconBack = ({
  className,
  fill = "#ff0000",
  stroke = "#ff0000",
}: IconsProps) => {
  return (
    <svg
      width="8"
      height="16"
      viewBox="0 0 8 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.81794 5.00001C3.06055 6.7574 3.06054 9.6067 4.81793 11.3641L7.09103 13.6372C7.59304 14.1392 7.59303 14.9532 7.09101 15.4552C6.58901 15.9572 5.7751 15.9572 5.2731 15.4551L2.09102 12.2731C-0.168386 10.0137 -0.168386 6.35044 2.09102 4.09102L5.27308 0.908975C5.77509 0.406962 6.58901 0.406962 7.09102 0.908975C7.59304 1.41099 7.59304 2.22491 7.09103 2.72692L4.81794 5.00001Z"
        fill={fill}
      />
    </svg>
  );
};

export default IconBack;
