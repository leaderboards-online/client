/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { type NextPage } from "next";
import Head from "next/head";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuth } from "~/AuthContext";
import { env } from "~/env.mjs";
import Image from "next/image";
import { type FC } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const { loginWithRedirect } = useAuth0();

  const { user: data } = useAuth();

  const people: CardProps[] = [
    { name: "frieza", points: 1000, image: "1" },
    { name: "probablyarth", image: "2", points: 999 },
    { name: "noob", image: "3", points: 998 },
  ];

  const router = useRouter();

  return (
    <>
      <Head>
        <title>leaderboards.online</title>
        <meta name="description" content="setup leaderboards in a click" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-w-screen relative flex h-full min-h-screen justify-center bg-almostBlack px-[20px] font-bold  text-almostWhite">
        <Image
          className="absolute h-full w-full"
          width={1920}
          height={1080}
          alt="bg"
          src={"/bg.svg"}
        />
        <div className="z-50 flex h-full w-full max-w-[1200px] flex-col gap-[100px] pt-[100px]">
          <nav className="flex flex-col items-center justify-between md:flex-row">
            <h3 className="text-[30px] font-black tracking-tighter sm:text-[36px]">
              leaderboards
              <span className="text-[36px] text-nicePurple sm:text-[40px]">
                .
              </span>
              online
            </h3>
            <ul>
              {data === undefined ? (
                "loading..."
              ) : data === null ? (
                <motion.button
                  whileHover={{ x: 3 }}
                  onClick={() => {
                    loginWithRedirect({
                      authorizationParams: {
                        audience: env.NEXT_PUBLIC_AUDIENCE,
                      },
                    }).catch((e: Error) => {
                      console.log({ e });
                    });
                  }}
                >
                  {"sign in ->"}
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ x: 3 }}
                  onClick={() => {
                    void router.push("/dashboard");
                  }}
                >
                  {"dashboard ->"}
                </motion.button>
              )}
            </ul>
          </nav>
          <main className="flex h-full flex-col items-center justify-center gap-[100px] text-center md:flex-row md:text-start">
            <section className="flex h-full flex-col items-center justify-center">
              <h1 className="text-[40px] font-black leading-tight tracking-tighter md:text-[80px] lg:text-[96px]">
                setup <span className="text-nicePurple">leaderboards </span>in a
                click
              </h1>
              <p className="text-[8px] font-bold text-lightGray md:text-[36px]">
                setup beautiful leaderboards fast, comes with rich api support
                to easily plug into your apps
              </p>
            </section>
            <section className="w-full">
              <ol className="z-30 flex h-full w-full grow basis-0 flex-col gap-4 rounded-md bg-almostBlack p-4">
                {people.map((person, idx) => {
                  return <Card card={person} key={idx} idx={idx} />;
                })}
              </ol>
            </section>
          </main>
        </div>
      </main>
    </>
  );
};

type CardProps = { image: string; name: string; points: number };

const Card: FC<{ card: CardProps; idx: number }> = ({ card, idx }) => {
  return (
    <li
      className={`flex w-full items-center justify-between rounded-md bg-cyan-500 p-4 ${
        idx === 0 && "bg-red-500"
      } ${idx === 1 && "bg-purple-500"} ${idx === 2 && "bg-orange-500"}`}
    >
      <div className="flex items-center gap-4">
        <Image
          src={`/avatars/${card.image}.svg`}
          height={48}
          width={48}
          alt={`${card.image}.svg`}
          className="rounded-full border-2 border-almostBlack"
        />
        @{card.name}
      </div>
      {card.points}
    </li>
  );
};

export default Home;
