import Head from "next/head";
import type { FC, ReactNode } from "react";

const DashboardLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Head>
        <title>dashboard | leaderboards.online</title>
        <meta
          name="description"
          content="leaderboards.online | setup leaderboards in a click, leaderboards.online let's you create sick looking, beautiful leaderboards very fast"
        />
        <meta name="author" content="probablyarth" />
        <meta name="robots" content="index, follow" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta
          name="keywords"
          content="leaderboards, leaderboards.online, leaderboard, probablyarth, arth, leaderboard maker"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-almostBlack text-center text-almostWhite">
        {children}
      </div>
    </>
  );
};

export default DashboardLayout;
