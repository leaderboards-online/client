/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { type NextPage, type GetServerSideProps } from "next";
import { type FC } from "react";
import Api from "~/services/http";
import { Participant, type LeaderboardWithParticipants } from "~/types";
import { motion } from "framer-motion";
import axios, { type AxiosError } from "axios";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/ban-types
const Leaderboard: NextPage<{
  leaderboard: LeaderboardWithParticipants;
  success: boolean;
}> = ({ leaderboard, success }) => {
  if (!success)
    return (
      <>
        <Head>
          <title>{"404 | leaderboard doesn't exist"}</title>
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
            content="leaderboards, leaderboards.online, leaderboard, probablyarth, arth"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="w-max-screen flex h-full min-h-screen w-full flex-col items-center justify-center overflow-x-hidden bg-almostBlack py-[50px] text-almostWhite">
          <motion.div
            transition={{ ease: "easeOut", duration: 2 }}
            animate={{ opacity: 100 }}
            initial={{ opacity: 0 }}
            style={{ boxShadow: "0 0 200px 10px #7B5AFF" }}
            className="rounded-sm border-[1px] border-white bg-transparent bg-none p-4"
          >
            <h1 className="bg-transparent text-5xl font-heading tracking-tighter">
              {"this leaderboard doesn't exist lol."}
            </h1>
            <Link href={"/"}>
              <motion.span
                whileHover={{ x: -4 }}
                className="flex gap-1 font-bold text-gray-400"
              >
                {"<-"} come back to homepage
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </>
    );
  return (
    <>
      <Head>
        <title>{leaderboard.name}</title>
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

      <div className="w-max-screen flex h-full min-h-screen w-full flex-col items-center justify-center overflow-x-hidden bg-almostBlack py-[50px] text-center text-almostWhite">
        <h1 className="z-30 text-2xl font-heading text-white sm:text-lg md:text-5xl">
          {leaderboard.name}
        </h1>
        <div
          className="mx-[20px] my-[30px] flex h-fit min-h-[500px] w-full min-w-[300px] max-w-[700px] flex-col gap-4 rounded-sm border-[1px] border-[white] bg-[#252525] p-4"
          style={{ boxShadow: "0 0 200px 10px #7B5AFF" }}
        >
          {leaderboard.participants.map((p, idx) => (
            <Participant participant={p} key={idx} idx={idx} />
          ))}
        </div>
      </div>
    </>
  );
};

const Participant: FC<{ participant: Participant; idx: number }> = ({
  participant,
  idx,
}) => {
  return (
    <motion.div
      className={`relative flex items-center justify-between rounded-sm bg-almostBlack p-4 ${
        idx === 0 && "bg-red-500"
      } ${idx === 1 && "bg-purple-500"} ${idx === 2 && "bg-orange-500"}`}
    >
      <div className="flex items-center gap-4">
        <Image
          width={48}
          height={48}
          alt={participant.name}
          src={participant.avatar}
          className="rounded-full border-2 border-black"
        />
        <h1 className="font-bold">{participant.name}</h1>
      </div>
      <h1 className="font-bold">{participant.points}</h1>
    </motion.div>
  );
};

export const getServerSideProps: GetServerSideProps = async (req) => {
  const uid = req.params?.uid as string;
  let data: {
    success: boolean;
    leaderboard: LeaderboardWithParticipants | null;
  } = { leaderboard: null, success: false };
  await Api.get<{
    leaderboard: LeaderboardWithParticipants;
  }>(`/leaderboard/preview/${uid}`)
    .then((data) => data.data.leaderboard)
    .then((lb) => {
      data = { leaderboard: lb, success: true };
    })
    .catch((e: AxiosError) => {
      if (axios.isAxiosError<{ message: string }>(e)) {
        data = { success: false, leaderboard: null };
      }
    });
  if (!data.leaderboard) {
    data.success = false;
  }
  return {
    props: data,
  };
};

export default Leaderboard;
