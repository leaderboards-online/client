import { type AppType } from "next/app";
import "~/styles/globals.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { env } from "~/env.mjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthWrapper from "~/AuthWrapper";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  const queryClient = new QueryClient();

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin + "/dashboard"
      : "";

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <Auth0Provider
        domain={env.NEXT_PUBLIC_AUTH_DOMAIN}
        clientId={env.NEXT_PUBLIC_AUTH_CLIENT_ID}
        authorizationParams={{
          redirect_uri: origin,
          audience: "https://api.leaderboards.land",
        }}
      >
        <AuthWrapper>
          <MantineProvider
            theme={{
              colorScheme: "dark",
              fontFamily: "poppins",
            }}
          >
            <Notifications />
            <Component {...pageProps} />
          </MantineProvider>
        </AuthWrapper>
      </Auth0Provider>
    </QueryClientProvider>
  );
};

export default MyApp;
