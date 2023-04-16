import { type AppType } from "next/app";
import "~/styles/globals.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { env } from "~/env.mjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthWrapper from "~/AuthWrapper";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Analytics } from "@vercel/analytics/react";
import { AuthProvider } from "~/AuthContext";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  const queryClient = new QueryClient();

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin + "/dashboard"
      : "";

  return (
    <QueryClientProvider client={queryClient}>
      <Auth0Provider
        domain={env.NEXT_PUBLIC_AUTH_DOMAIN}
        clientId={env.NEXT_PUBLIC_AUTH_CLIENT_ID}
        authorizationParams={{
          redirect_uri: origin,
          audience: env.NEXT_PUBLIC_AUDIENCE,
        }}
      >
        <AuthProvider>
          <AuthWrapper>
            <MantineProvider
              theme={{
                colorScheme: "dark",
                fontFamily: "poppins",
              }}
            >
              <Notifications />
              <Component {...pageProps} />
              <Analytics />
            </MantineProvider>
          </AuthWrapper>
        </AuthProvider>
      </Auth0Provider>
    </QueryClientProvider>
  );
};

export default MyApp;
