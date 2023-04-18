/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { type FC } from "react";
import Logo from "./Logo";

const Loader: FC<{ isChild?: boolean }> = ({ isChild = false }) => {
  return (
    <div
      className={`gap-8text-center flex flex-col items-center justify-center ${
        !isChild && "min-h-screen bg-almostBlack text-almostWhite"
      }`}
    >
      <Logo pulse />
    </div>
  );
};

export default Loader;
