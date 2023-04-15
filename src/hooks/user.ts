import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import Api from "~/services/http";

export const useUser = ({
  username,
  email,
  avatar,
}: {
  username: string;
  email: string;
  avatar: string;
}) => {
  const { getAccessTokenSilently } = useAuth0();
  return useQuery(
    ["user"],
    async () => {
      return Api.post(
        "/user/signIn",
        {
          username,
          email,
          avatar,
        },
        {
          headers: {
            Authorization: `Bearer ${await getAccessTokenSilently()}`,
          },
        }
      );
    },
    { enabled: false }
  );
};
