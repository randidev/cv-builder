import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        dot: "url('/images/bg-dot.svg')",
      },
      colors: {
        "gray-primary": "#dbdada",
      },
      maxHeight: {
        body: "calc(100vh - 77px)",
      },
      minHeight: {
        body: "calc(100vh - 77px)",
      },
      height: {
        body: "calc(100vh - 77px)",
      },
    },
  },
  plugins: [],
};
export default config;
