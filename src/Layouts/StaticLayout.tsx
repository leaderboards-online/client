import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { type FC, type ReactNode } from "react";
import Logo from "~/components/Logo";

const StaticLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Head>
        <title>leaderboards.online</title>
        <meta name="description" content="setup leaderboards in a click" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-w-screen relative flex h-full min-h-screen justify-center bg-almostBlack px-[20px] font-bold text-almostWhite">
        <Image
          className="absolute h-full w-full"
          width={1920}
          height={1080}
          alt="bg"
          src={"/bg.svg"}
        />
        <div className="z-50 flex h-full w-full max-w-[1200px] flex-col gap-[100px] pt-[100px]">
          <nav className="flex flex-col items-center justify-between md:flex-row">
            <Logo />
            <ul className="flex gap-[30px]">
              <li className="cursor-pointer">
                <Link href={"/feedback"}>found a bug?</Link>
              </li>
              <motion.li whileHover={{ x: 5 }} className="cursor-pointer">
                <Link href={"/dashboard"}>{"let's go ->"}</Link>
              </motion.li>
            </ul>
          </nav>
          {children}
        </div>
      </main>
    </>
  );
};

export default StaticLayout;
