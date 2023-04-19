import { LoadingOverlay, TextInput } from "@mantine/core";
import { useRouter } from "next/router";
import { useState, type FC, useEffect } from "react";
import Button from "~/components/Button";
import { useLeaderboard, useUpdateLeaderboardName } from "~/hooks/Leaderboard";
import {
  useAddParticipant,
  useDeleteParticipant,
  useParticipants,
  useUpdateScore,
} from "~/hooks/Participant";
import { Participant } from "~/types";
import { AiFillDelete } from "react-icons/ai";
import axios, { type AxiosError } from "axios";
import { notifications } from "@mantine/notifications";
import Link from "next/link";
import Head from "next/head";

const Participant: FC<{
  participant: Participant;
  idx: number;
  leaderboardUid: string;
}> = ({ participant, idx, leaderboardUid }) => {
  const [amount, setAmount] = useState(1);

  const incrementPoints = useUpdateScore("increment");
  const decrementPoints = useUpdateScore("decrement");
  const deleteParticipant = useDeleteParticipant(
    participant._id,
    leaderboardUid
  );

  return (
    <div className="flex gap-4">
      <div className="flex w-full items-center justify-between gap-4 rounded-md bg-neutral-800 p-3 text-white">
        <h3>
          {idx + 1}. {participant?.name}
        </h3>
        <h3>{participant?.points} points</h3>
      </div>
      <div className="relative flex items-center gap-2 text-sm">
        <button
          className="bg-almostWhite p-3 text-almostBlack"
          onClick={() => {
            decrementPoints
              .mutateAsync({
                amount,
                participantId: participant?._id,
                leaderboardId: leaderboardUid,
              })
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
          -
        </button>
        <LoadingOverlay
          visible={incrementPoints.isLoading || decrementPoints.isLoading}
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => {
            setAmount(parseInt(e.target.value));
          }}
          className="w-[80px] p-3 text-black"
        />
        <button
          className="bg-almostWhite p-3 text-almostBlack"
          onClick={() => {
            incrementPoints
              .mutateAsync({
                amount,
                participantId: participant?._id,
                leaderboardId: leaderboardUid,
              })
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
          +
        </button>
        <button
          className="hover:text-red-500"
          onClick={() => {
            deleteParticipant.mutateAsync().catch((e: AxiosError | Error) => {
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
          <AiFillDelete size={32} />
        </button>
      </div>
    </div>
  );
};

const AddParticipant: FC<{ leaderboardId: string }> = ({ leaderboardId }) => {
  const [name, setName] = useState("probablyarth");
  const [points, setPoints] = useState(100);
  const addParticipant = useAddParticipant(leaderboardId);

  return (
    <form
      className="flex w-full items-center justify-between gap-4 rounded-md bg-neutral-800 p-3 text-white"
      onSubmit={(e) => {
        e.preventDefault();
        addParticipant
          .mutateAsync({ name, points })
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
      <TextInput
        label="name"
        required
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <TextInput
        label="points"
        type="number"
        required
        value={points}
        onChange={(e) => {
          setPoints(parseInt(e.target.value));
        }}
      />
      <Button animated={false}>Add Participant</Button>
    </form>
  );
};

const Participants: FC<{ leadearboardId: string }> = ({ leadearboardId }) => {
  const { data, isError, isLoading } = useParticipants(leadearboardId);

  if (isError) return <h1>Oops an error occurred lol</h1>;
  if (!data || isLoading) return <h1>Loading participants..</h1>;

  return (
    <div className="flex w-3/5 flex-col gap-4">
      <div className="flex gap-4">
        <Link href={"/dashboard"}>
          <Button animated={false}>Back to dashboard</Button>
        </Link>
        <Link href={`/public/${leadearboardId}`}>
          <Button animated={false}>Live Link</Button>
        </Link>
      </div>
      {data.map((participant, idx) => {
        return (
          <Participant
            participant={participant}
            key={idx}
            idx={idx}
            leaderboardUid={leadearboardId}
          />
        );
      })}
      <AddParticipant leaderboardId={leadearboardId} />
    </div>
  );
};

const LeaderboardDashboard = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const [isEditing, setIsEditing] = useState(false);
  const { data, isError, isLoading } = useLeaderboard(id);
  const [newName, setNewName] = useState(data?.name as string);
  const [leaderboardUid, setLeaderboardUid] = useState(data?.uid as string);

  const updateLeaderboardName = useUpdateLeaderboardName(leaderboardUid);

  useEffect(() => {
    if (data) {
      setNewName(data.name);
      setLeaderboardUid(data.uid);
    }
  }, [data]);
  if (isError) return <h1>oops an error occurred</h1>;
  if (data === undefined || isLoading)
    return (
      <>
        <Head>
          <title>dashboard | leaderboards.online</title>
          <meta name="description" content="setup leaderboards in a click" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1
          className="
  flex min-h-screen flex-col items-center justify-center gap-8 bg-almostBlack text-center text-almostWhite"
        >
          loading {id}
        </h1>
      </>
    );
  return (
    <>
      <form
        className="flex gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (!isEditing) {
            updateLeaderboardName
              .mutateAsync({ name: newName })
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
          }
        }}
      >
        {isEditing ? (
          <input
            className="rounded-sm bg-almostWhite p-3 text-4xl font-heading text-almostBlack"
            value={newName}
            onChange={(e) => {
              setNewName(e.target.value);
            }}
            autoCorrect="off"
          />
        ) : (
          <h1 className="rounded-sm bg-almostWhite p-3 text-5xl font-heading text-almostBlack">
            {data.name}
          </h1>
        )}
        <Button
          animated={false}
          onClick={() => {
            setIsEditing((prev) => !prev);
          }}
        >
          {isEditing ? "Save" : "Edit"}
        </Button>
      </form>
      <Participants leadearboardId={id} />
    </>
  );
};

export default LeaderboardDashboard;
