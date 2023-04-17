import Link from "next/link";

const Logo = () => {
  return (
    <Link
      className="text-[30px] font-black tracking-tighter sm:text-[36px]"
      href={"/"}
    >
      leaderboards
      <span className="text-[36px] text-nicePurple sm:text-[40px]">.</span>
      online
    </Link>
  );
};

export default Logo;
