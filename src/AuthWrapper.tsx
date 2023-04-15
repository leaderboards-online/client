import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import { useEffect, type FC, type ReactNode, useState } from "react";
import Home from "./pages";
import { useUser } from "./hooks/user";
import { type AxiosError } from "axios";
import { notifications } from "@mantine/notifications";

const AuthWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const { isLoading, getAccessTokenSilently, isAuthenticated, user } =
    useAuth0();
  const router = useRouter();
  const [token, setToken] = useState("");

  const {
    data,
    refetch,
    isLoading: authLoading,
  } = useUser({
    username: user?.name as string,
    email: user?.email as string,
    avatar: user?.picture as string,
  });

  useEffect(() => {
    if (!isLoading && isAuthenticated && user && !data) {
      void (async () => {
        const accessToken = await getAccessTokenSilently();
        setToken(accessToken);
      })();
      if (token) {
        refetch().catch((e: AxiosError<{ message: string }>) => {
          notifications.show({
            message: e.response?.data.message,
            color: "red",
          });
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isLoading, token]);

  if (isLoading || authLoading) return <h1>Loading ...</h1>;
  if (
    (!isLoading || !authLoading) &&
    !data &&
    router.pathname.startsWith("/dashboard")
  )
    return <Home />;

  return <>{children}</>;
};

export default AuthWrapper;
