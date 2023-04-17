import Head from "next/head";
import type { FC, ReactNode } from "react";

const DashboardLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Head>
        <title>dashboard | leaderboards.online</title>
        <meta name="description" content="setup leaderboards in a click" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-almostBlack text-center text-almostWhite">
        {children}
      </div>
    </>
  );
};

export default DashboardLayout;
