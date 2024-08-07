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
        bodyMobile: "calc(100vh - 125px - 36px)",
        body: "calc(100vh - 77px - 36px)",
      },
      minHeight: {
        bodyMobile: "calc(100vh - 125px - 36px)",
        body: "calc(100vh - 77px - 36px)",
      },
      height: {
        bodyMobile: "calc(100vh - 125px - 36px)",
        body: "calc(100vh - 77px - 36px)",
      },
    },
  },
  plugins: [],
};
export default config;
