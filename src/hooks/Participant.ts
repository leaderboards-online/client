import { useAuth0 } from "@auth0/auth0-react";
import { adventurerNeutral } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Api from "~/services/http";
import { type Participant } from "~/types";

export const useUpdateScore = (type: "increment" | "decrement") => {
  const queryClient = useQueryClient();
  const { getAccessTokenSilently } = useAuth0();

  return useMutation({
    mutationFn: async ({
      amount,
      participantId,
      leaderboardId,
    }: {
      amount: number;
      participantId: string;
      leaderboardId: string;
    }) => {
      return Api.put<{ participant: Participant }>(
        `/participant/${leaderboardId}/${participantId}`,
        {
          amount,
          type,
        },
        {
          headers: {
            Authorization: `Bearer ${await getAccessTokenSilently()}`,
          },
        }
      ).then((data) => data.data.participant);
    },
    onSuccess: (participant, { leaderboardId }) => {
      queryClient.setQueryData<Participant[]>(
        ["leaderboards", leaderboardId, "participants"],
        (prev) => {
          const newArr = prev?.slice() as Participant[];
          newArr[newArr.findIndex((value) => value._id === participant._id)] =
            participant;
          return newArr;
        }
      );
    },
  });
};

export const useParticipants = (leaderboardId: string) =>
  useQuery({
    queryKey: ["leaderboards", leaderboardId, "participants"],
    queryFn: async () => {
      return Api.get<{ participants: Participant[] }>(
        `/participant/${leaderboardId}`
      ).then((data) => data.data.participants);
    },
  });

export const useAddParticipant = (leaderboardId: string) => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, points }: { name: string; points: number }) => {
      const avatar = createAvatar(adventurerNeutral, {
        seed: name,
      }).toDataUriSync();
      return Api.post<{ participant: Participant }>(
        `/participant/${leaderboardId}`,
        { name, points, avatar },
        {
          headers: {
            Authorization: `Bearer ${await getAccessTokenSilently()}`,
          },
        }
      ).then((data) => data.data.participant);
    },
    onSuccess: (participant) => {
      queryClient.setQueryData<Participant[]>(
        ["leaderboards", leaderboardId, "participants"],
        (prev) => {
          if (prev) {
            const newArr = prev.slice();
            newArr.push(participant);
            return newArr;
          }
          return [participant];
        }
      );
    },
  });
};

export const useDeleteParticipant = (
  participantId: string,
  leaderboardId: string
) => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      return Api.delete(`/participant/${leaderboardId}/${participantId}`, {
        headers: { Authorization: `Bearer ${await getAccessTokenSilently()}` },
      });
    },
    onSuccess: () => {
      queryClient.setQueryData<Participant[]>(
        ["leaderboards", leaderboardId, "participants"],
        (participants) => {
          const newParticipants = participants?.slice();
          newParticipants?.splice(
            newParticipants?.findIndex(
              (participant) => participant._id === participantId
            ),
            1
          );
          return newParticipants;
        }
      );
    },
  });
};
