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
import { useRouter } from "next/router";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  const queryClient = new QueryClient();

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin + "/dashboard"
      : "";

  const router = useRouter();

  if (router.pathname.startsWith("/public"))
    return (
      <MantineProvider
        theme={{
          colorScheme: "dark",
          fontFamily: "poppins",
        }}
      >
        <Notifications />
        <Analytics />
        <Component {...pageProps} />
      </MantineProvider>
    );

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        theme={{
          colorScheme: "dark",
          fontFamily: "poppins",
        }}
      >
        <Notifications />
        <Analytics />
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
              <Component {...pageProps} />
            </AuthWrapper>
          </AuthProvider>
        </Auth0Provider>
      </MantineProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
