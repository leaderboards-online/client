/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { type HTMLProps, type FC } from "react";

const Button: FC<HTMLProps<HTMLButtonElement> & { animated?: boolean }> = ({
  children,
  onClick,
  className,
  animated = true,
}) => {
  return (
    <button
      className={`sm:text-md rounded-sm bg-almostWhite px-4 py-2 text-xs text-black transition-transform ${
        animated && "hover:scale-125"
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
