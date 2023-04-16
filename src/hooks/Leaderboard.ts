import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Api from "../services/http";
import { type Leaderboard } from "~/types";

export const useCreateLeaderboard = () => {
  const { getAccessTokenSilently } = useAuth0();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const accessToken = await getAccessTokenSilently();
      return Api.post<{ leaderboard: { uid: string } }>(
        "/leaderboard",
        {
          name: "A very cool and new leaderboard",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ).then((data) => {
        void router.push(`/dashboard/${data.data.leaderboard.uid}`);
      });
    },
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

export const useDeleteLeaderboard = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ uid }: { uid: string }) => {
      return Api.delete(`/leaderboard/${uid}`, {
        headers: { Authorization: `Bearer ${await getAccessTokenSilently()}` },
      });
    },
    onSuccess: (_, { uid }) => {
      queryClient.setQueryData<Leaderboard[]>(["leaderboards"], (prev) => {
        const newArr = prev?.slice();
        newArr?.splice(
          newArr?.findIndex((lb) => lb.uid === uid),
          1
        );
        return newArr;
      });
    },
  });
};

export const useLeaderboards = () => {
  const { getAccessTokenSilently } = useAuth0();
  return useQuery({
    queryKey: ["leaderboards"],
    queryFn: async () => {
      return Api.get<{ leaderboards: Leaderboard[] }>("/leaderboard", {
        headers: { Authorization: `Bearer ${await getAccessTokenSilently()}` },
      }).then((data) => data.data.leaderboards);
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
