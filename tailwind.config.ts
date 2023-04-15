import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)"],
      },
      colors: {
        almostBlack: "#1A1A1A",
        almostWhite: "#F6F6F6",
        lightGray: "#B1B1B1",
      },
      fontSize: {
        // xl: "64px",
        // lg: "48px",
        // md: "20px",
      },
      fontWeight: {
        heading: "700",
      },
    },
  },
  plugins: [],
} satisfies Config;
