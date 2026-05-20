import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "hsl(220, 80%, 95%)",
          100: "hsl(220, 80%, 90%)",
          200: "hsl(220, 80%, 80%)",
          300: "hsl(220, 80%, 70%)",
          400: "hsl(220, 80%, 60%)",
          500: "hsl(220, 80%, 50%)",
          600: "hsl(220, 80%, 40%)",
          700: "hsl(220, 80%, 30%)",
          800: "hsl(220, 80%, 20%)",
          900: "hsl(220, 80%, 12%)",
          950: "hsl(220, 80%, 7%)",
        },
        secondary: {
          50: "hsl(260, 70%, 95%)",
          100: "hsl(260, 70%, 90%)",
          200: "hsl(260, 70%, 80%)",
          300: "hsl(260, 70%, 70%)",
          400: "hsl(260, 70%, 62%)",
          500: "hsl(260, 70%, 55%)",
          600: "hsl(260, 70%, 45%)",
          700: "hsl(260, 70%, 35%)",
          800: "hsl(260, 70%, 25%)",
          900: "hsl(260, 70%, 15%)",
          950: "hsl(260, 70%, 8%)",
        },
        accent: {
          50: "hsl(170, 75%, 95%)",
          100: "hsl(170, 75%, 88%)",
          200: "hsl(170, 75%, 78%)",
          300: "hsl(170, 75%, 65%)",
          400: "hsl(170, 75%, 55%)",
          500: "hsl(170, 75%, 45%)",
          600: "hsl(170, 75%, 36%)",
          700: "hsl(170, 75%, 28%)",
          800: "hsl(170, 75%, 20%)",
          900: "hsl(170, 75%, 12%)",
          950: "hsl(170, 75%, 6%)",
        },
        "academic-dark": {
          bg: "hsl(222, 30%, 8%)",
          card: "hsl(222, 25%, 12%)",
          surface: "hsl(222, 22%, 16%)",
          border: "hsl(222, 18%, 22%)",
          hover: "hsl(222, 20%, 20%)",
          muted: "hsl(222, 15%, 55%)",
        },
        "academic-light": {
          bg: "hsl(220, 20%, 97%)",
          card: "hsl(0, 0%, 100%)",
          surface: "hsl(220, 15%, 95%)",
          border: "hsl(220, 15%, 88%)",
          hover: "hsl(220, 15%, 93%)",
          muted: "hsl(220, 10%, 45%)",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
        display: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "fade-in-down": "fadeInDown 0.5s ease-out forwards",
        "slide-in-left": "slideInLeft 0.5s ease-out forwards",
        "slide-in-right": "slideInRight 0.5s ease-out forwards",
        "slide-up": "slideUp 0.4s ease-out forwards",
        "scale-in": "scaleIn 0.3s ease-out forwards",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "float": "float 6s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        "gradient-x": "gradientX 8s ease infinite",
        "count-up": "countUp 1s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(59, 130, 246, 0.2), 0 0 20px rgba(59, 130, 246, 0.1)" },
          "100%": { boxShadow: "0 0 20px rgba(59, 130, 246, 0.4), 0 0 60px rgba(59, 130, 246, 0.2)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        gradientX: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        countUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "academic-gradient": "linear-gradient(135deg, hsl(220, 80%, 50%) 0%, hsl(260, 70%, 55%) 50%, hsl(170, 75%, 45%) 100%)",
        "academic-gradient-dark": "linear-gradient(135deg, hsl(220, 80%, 20%) 0%, hsl(260, 70%, 20%) 50%, hsl(170, 75%, 20%) 100%)",
      },
      boxShadow: {
        "glass": "0 8px 32px 0 rgba(31, 38, 135, 0.12)",
        "glass-dark": "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
        "academic": "0 4px 6px -1px rgba(59, 130, 246, 0.1), 0 2px 4px -2px rgba(59, 130, 246, 0.1)",
        "academic-lg": "0 10px 25px -5px rgba(59, 130, 246, 0.15), 0 8px 10px -6px rgba(59, 130, 246, 0.1)",
        "academic-xl": "0 20px 50px -12px rgba(59, 130, 246, 0.2)",
        "glow-primary": "0 0 20px rgba(59, 130, 246, 0.3)",
        "glow-secondary": "0 0 20px rgba(139, 92, 246, 0.3)",
        "glow-accent": "0 0 20px rgba(20, 184, 166, 0.3)",
      },
      borderRadius: {
        "xl": "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
