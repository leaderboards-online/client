/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Link from "next/link";
import { type FC } from "react";

const Logo: FC<{ pulse?: boolean; link?: boolean }> = ({ pulse, link }) => {
  if (link)
    return (
      <Link
        className={`text-[30px] font-black tracking-tighter sm:text-[36px] ${
          pulse && "animate-pulse"
        }`}
        href={"/"}
      >
        leaderboards
        <span className="text-[36px] text-nicePurple sm:text-[40px]">.</span>
        online
      </Link>
    );
  return (
    <div
      className={`text-[30px] font-black tracking-tighter sm:text-[36px] ${
        pulse && "animate-pulse"
      }`}
    >
      leaderboards
      <span className="text-[36px] text-nicePurple sm:text-[40px]">.</span>
      online
    </div>
  );
};

export default Logo;
