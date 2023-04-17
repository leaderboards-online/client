import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, type FC, type ReactNode } from "react";
import Api from "./services/http";
import { type User } from "./types";
import { useAuth } from "./AuthContext";
import Head from "next/head";
import Login from "./components/Login";

const AuthWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const { getAccessTokenSilently, isLoading, isAuthenticated, user, logout } =
    useAuth0();
  const { setUser, user: data } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        return void (async () => {
          Api.post<{ user: User }>(
            "/user/signIn",
            {
              username: user?.name,
              email: user?.email,
              avatar: user?.picture,
            },
            {
              headers: {
                Authorization: `Bearer ${await getAccessTokenSilently()}`,
              },
            }
          )
            .then((data) => data.data.user)
            .then((user) => setUser(user))
            .catch(() => {
              logout();
              setUser(null);
            });
        })();
      }
      setUser(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isAuthenticated]);

  if (isLoading || data === undefined)
    return (
      <>
        <Head>
          <title>leaderboards.online</title>
          <meta name="description" content="setup leaderboards in a click" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-almostBlack text-center text-4xl font-heading text-almostWhite">
          Loading ...
        </div>
      </>
    );

  if ((!isLoading || data !== undefined) && data === null) return <Login />;

  return <>{children}</>;
};

export default AuthWrapper;
