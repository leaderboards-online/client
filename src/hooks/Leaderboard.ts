import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Api from "../services/http";
import axios, { type AxiosError } from "axios";
import { notifications } from "@mantine/notifications";
import { type Leaderboard } from "~/types";

export const useCreateLeaderboard = () => {
  const { getAccessTokenSilently } = useAuth0();
  const router = useRouter();

  return useMutation(async function lol() {
    const accessToken = await getAccessTokenSilently();
    Api.post<{ leaderboard: { uid: string } }>(
      "/leaderboard",
      {
        name: "A very cool and new leaderboard",
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((data) => {
        void router.push(`/dashboard/${data.data.leaderboard.uid}`);
      })
      .catch((error: Error | AxiosError) => {
        if (axios.isAxiosError<{ message: string }>(error)) {
          notifications.show({
            message: error.response?.data.message,
            color: "red",
          });
        }
      });
  });
};

export const useLeaderboard = (leaderboardId: string) => {
  return useQuery({
    queryKey: ["leaderboards", leaderboardId],
    queryFn: async () => {
      return Api.get<{ leaderboard: Leaderboard }>(
        `/leaderboard/${leaderboardId}`
      ).then((data) => data.data.leaderboard);
    },
  });
};

export const useUpdateLeaderboardName = (leaderboardId: string) => {
  const queryClient = useQueryClient();
  const { getAccessTokenSilently } = useAuth0();
  return useMutation({
    mutationFn: async ({ name }: { name: string }) => {
      return Api.put<{ leaderboard: Leaderboard }>(
        `/leaderboard/${leaderboardId}/name`,
        {
          name,
        },
        {
          headers: {
            Authorization: `Bearer ${await getAccessTokenSilently()}`,
          },
        }
      ).then((data) => data.data.leaderboard);
    },
    onSuccess: (leaderboard) => {
      queryClient.setQueryData(["leaderboards", leaderboardId], leaderboard);
    },
  });
};
