import axios from "axios";
import { env } from "~/env.mjs";

const Api = axios.create({
  baseURL: env.NEXT_PUBLIC_BACKEND_BASE_URL,
});

export default Api;
