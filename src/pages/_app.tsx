import { type AppType } from "next/app";
import "~/styles/globals.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { env } from "~/env.mjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { useRouter } from "next/router";
import StaticLayout from "~/Layouts/StaticLayout";
import { lazy, Suspense } from "react";
import SuspenseFallback from "~/components/SuspenseFallback";

const Notifications = lazy(() =>
  import("@mantine/notifications").then((module) => ({
    default: module.Notifications,
  }))
);
const MantineProvider = lazy(() =>
  import("@mantine/core").then((module) => ({
    default: module.MantineProvider,
  }))
);
const AuthWrapper = lazy(() => import("~/AuthWrapper"));
const AuthProvider = lazy(() =>
  import("~/AuthContext").then((module) => ({ default: module.AuthProvider }))
);
const DashboardLayout = lazy(() => import("~/Layouts/DashboardLayout"));

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  const queryClient = new QueryClient();

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin + "/dashboard"
      : "";

  const router = useRouter();

  if (router.pathname.startsWith("/public"))
    return (
      <>
        <Analytics />
        <Component {...pageProps} />
      </>
    );

  if (!router.pathname.startsWith("/dashboard"))
    return (
      <>
        <Analytics />
        <StaticLayout>
          <Component {...pageProps} />
        </StaticLayout>
      </>
    );

  return (
    <Suspense fallback={<SuspenseFallback />}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider
          theme={{
            colorScheme: "dark",
            fontFamily: "manrope",
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
              <DashboardLayout>
                <AuthWrapper>
                  <Component {...pageProps} />
                </AuthWrapper>
              </DashboardLayout>
            </AuthProvider>
          </Auth0Provider>
        </MantineProvider>
      </QueryClientProvider>
    </Suspense>
  );
};

export default MyApp;
