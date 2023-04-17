import { useAuth0 } from "@auth0/auth0-react";
import { motion } from "framer-motion";
import { env } from "~/env.mjs";

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <motion.button
      whileHover={{ x: 5 }}
      onClick={() => {
        loginWithRedirect({
          authorizationParams: {
            audience: env.NEXT_PUBLIC_AUDIENCE,
          },
        }).catch((e: Error) => {
          console.log({ e });
        });
      }}
      className="text-5xl font-black"
    >
      {"sign in ->"}
    </motion.button>
  );
};

export default Login;
