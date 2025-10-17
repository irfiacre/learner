import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        taxiMeter: "url('/img/taxi_car.jpg')",
      },
      colors: {
        primary: "#103D4B",
        primary_light: "#1E728C",
        background_color: "#F8F4EB",
        sidebar_background: "#1A212B",
        scroll_background: "#9393A3",
        modal_background: "#911259",
        progress_background: "#F4F3FD",
        footer_background: "#263238",
        text_light: "#858597",
        icon_background: "#EAEAFF",
        border_light: "#B8B8D2",
        sidebar_border: "#E6E6E6",
        successGreen: "#00BF63",
      },
    },
  },
  plugins: [],
};
export default config;