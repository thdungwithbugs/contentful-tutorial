import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        orbit: {
          from: {
            top: "50%",
            left: "50%",
            transform: "translateX(-50%) translateY(-50%) rotate(0)",
          },
          to: {
            top: "50%",
            left: "50%",
            transform: "translateX(-50%) translateY(-50%) rotate(360deg)",
          },
        },
        "anti-orbit2": {
          from: {
            left: "50%",
            top: "100%",
            transform: "translateX(-50%) translateY(-50%) rotate(360deg)",
          },
          to: {
            left: "50%",
            top: "100%",
            transform: "translateX(-50%) translateY(-50%) rotate(0)",
          },
        },
        "anti-orbit1": {
          from: {
            left: "50%",
            top: "0",
            transform: "translateX(-50%) translateY(-50%) rotate(360deg)",
          },
          to: {
            left: "50%",
            top: "0",
            transform: "translateX(-50%) translateY(-50%) rotate(0)",
          },
        },
        "anti-orbit3": {
          from: {
            left: "50%",
            top: "0",
            transform: "translateX(-50%) translateY(-50%) rotate(360deg)",
          },
          to: {
            left: "50%",
            top: "0",
            transform: "translateX(-50%) translateY(-50%) rotate(0)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "ping-slow": "ping 5s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
