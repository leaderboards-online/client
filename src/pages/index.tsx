/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { type NextPage } from "next";
import Image from "next/image";
import { type FC } from "react";
import { LazyMotion, m, domAnimation } from "framer-motion";

const Home: NextPage = () => {
  const people: CardProps[] = [
    { name: "frieza", points: 1000, image: "1" },
    { name: "probablyarth", image: "2", points: 999 },
    { name: "noob", image: "3", points: 998 },
  ];

  return (
    <LazyMotion features={domAnimation}>
      <main className="flex h-full flex-col items-center justify-center gap-[50px] text-center md:flex-row md:gap-[100px] md:text-start">
        <section className="flex h-full flex-col items-center justify-center">
          <h1 className="text-[40px] font-black leading-tight tracking-tighter md:text-[80px] lg:text-[96px]">
            setup <span className="text-nicePurple">leaderboards </span>in a
            click
          </h1>
          <p className="text-[18px] font-bold text-lightGray md:text-[36px]">
            setup beautiful leaderboards fast, comes with rich api support to
            easily plug into your apps
          </p>
        </section>
        <section className="w-full">
          <m.ol
            className="z-30 flex h-full w-full grow basis-0 flex-col gap-4 rounded-md bg-almostBlack p-4"
            initial={{ scale: 0, y: 100 }}
            animate={{ scale: 1, y: 0 }}
          >
            {people.map((person, idx) => {
              return <Card card={person} key={idx} idx={idx} />;
            })}
          </m.ol>
        </section>
      </main>
    </LazyMotion>
  );
};

type CardProps = { image: string; name: string; points: number };

const Card: FC<{ card: CardProps; idx: number }> = ({ card, idx }) => {
  return (
    <m.li
      initial={{ scale: 0, y: 100 }}
      animate={{ scale: 1, y: 0 }}
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
    </m.li>
  );
};

export default Home;
