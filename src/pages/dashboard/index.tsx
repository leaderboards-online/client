import { notifications } from "@mantine/notifications";
import axios, { type AxiosError } from "axios";
import Link from "next/link";
import { type FC } from "react";
import { AiFillDelete, AiOutlineArrowRight } from "react-icons/ai";
import Button from "~/components/Button";
import {
  useCreateLeaderboard,
  useDeleteLeaderboard,
  useLeaderboards,
} from "~/hooks/Leaderboard";
import { type Leaderboard } from "~/types";

const CreatedLeaderboard: FC<{ leaderboard: Leaderboard }> = ({
  leaderboard,
}) => {
  const deleteLeaderboard = useDeleteLeaderboard();

  return (
    <div className="flex w-full items-center justify-center gap-4 rounded-sm bg-almostBlack p-3">
      {leaderboard.name}
      <Link href={`/dashboard/${leaderboard.uid}`}>
        <AiOutlineArrowRight
          size={24}
          className="transition-transform hover:translate-x-2"
        />
      </Link>
      <button
        className="text-red-500"
        onClick={() => {
          deleteLeaderboard
            .mutateAsync({ uid: leaderboard.uid })
            .catch((e: AxiosError | Error) => {
              if (axios.isAxiosError<{ message: string }>(e)) {
                notifications.show({
                  message: e.response?.data.message || e.message,
                  color: "red",
                });
                return;
              }
              notifications.show({ message: e.message, color: "red" });
            });
        }}
      >
        <AiFillDelete size={28} />
      </button>
    </div>
  );
};

const Dashboard = () => {
  const createLeaderboard = useCreateLeaderboard();
  const { data: leaderboards, isError, isLoading } = useLeaderboards();

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center gap-8 bg-almostBlack text-center text-almostWhite`}
    >
      <Button
        onClick={() => {
          createLeaderboard.mutateAsync().catch((e: AxiosError | Error) => {
            if (axios.isAxiosError<{ message: string }>(e)) {
              notifications.show({
                message: e.response?.data.message || e.message,
                color: "red",
              });
              return;
            }
            notifications.show({ message: e.message, color: "red" });
          });
        }}
      >
        <div className="flex flex-col">
          <h3 className="text-lg">create a leaderboard</h3>
          <p className="text-gray-500">i told you only one click :)</p>
        </div>
      </Button>
      <div className="flex flex-col rounded-sm bg-neutral-100 p-2 ">
        <h1 className="pb-7 text-3xl font-heading text-almostBlack">
          created leaderboards
        </h1>
        {isError ? (
          <h1>an error occurred, please reload!</h1>
        ) : isLoading || !leaderboards ? (
          <h1>Loading</h1>
        ) : (
          leaderboards.map((lb, idx) => (
            <CreatedLeaderboard leaderboard={lb} key={idx} />
          ))
        )}
      </div>
    </main>
  );
};

export default Dashboard;
