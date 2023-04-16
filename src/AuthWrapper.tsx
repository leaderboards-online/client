import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import { useEffect, type FC, type ReactNode } from "react";
import Home from "./pages";
import Api from "./services/http";
import { type User } from "./types";
import { useAuth } from "./AuthContext";

const AuthWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const { getAccessTokenSilently, isLoading, isAuthenticated, user, logout } =
    useAuth0();
  const router = useRouter();
  const { setUser, user: data } = useAuth();
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      void (async () => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isAuthenticated]);

  if (
    router.pathname.startsWith("/dashboard") &&
    (isLoading || data === undefined)
  )
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-almostBlack text-center text-4xl font-heading text-almostWhite">
        Loading ...
      </div>
    );
  if (
    router.pathname.startsWith("/dashboard") &&
    (!isLoading || data !== undefined) &&
    data === null
  )
    return <Home />;

  return <>{children}</>;
};

export default AuthWrapper;
