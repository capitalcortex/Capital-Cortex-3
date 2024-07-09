import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        theme: ['var(--font-theme)'],
        inter: ['var(--font-inter)']
      },
      colors: {
        theme: "#eeb127",
        "theme-light": "#FBF4EB",
        "theme-red": "#D0312D",
        "theme-green": { 50: "#46D387", 100: "#0E2D1D" },
        "theme-blue": { 50: "#4352DF" },
        "theme-gray": {
          25: "#FAFAFB",
          50: "#F8F8F8",
          75: "#F4F4F4",
          100: "#EDEDED",
          125: "#E8E8E9",
          150: "#DDDDDE",
          175: "#D1D1D2",
          200: "#C6C6C7",
          225: "#BABBBC",
          250: "#AFAFB1",
          275: "#A3A4A6",
          300: "#98999B",
          325: "#8C8D8F",
          350: "#818284",
          375: "#767679",
          400: "#6A6B6E",
          425: "#5F6063",
          450: "#535458",
          475: "#48494C",
          500: "#3C3D41",
          525: "#313236",
          550: "#25272B",
          575: "#1A1B20",
          600: "#414337",
          625: "#D6D5CD"
        },
        dolphin: "#79797A",
        blackRussian:"#212226",
        tuna:"#48494C",
        apple:"#63A84A",
        green_hint:"#E0EEDB",
        roman:"#E35656",
        tutu:"#F9DDDD",
      },
      padding: {
        46: "11.5rem" // 184px
      },
      width: {
        50: "12.5rem"
      },
      maxWidth: {
        202: "50.5rem", // 808px
        128: "32rem" // 512px
      },
      lineHeight: {
        "1": "1",
        "12": "3rem" // 48px
      },
      spacing: {
        "30": "7.5rem" // 120px
      },
      zIndex: {
        100: "100"
      },
      screens: {
        "max-575":{"max":"575px"},
        md: "800px",
        "max-xs": { "max": "474px" },
        xs: '475px',
        "9xl": "6144px",
        "8xl": "4068px",
        "7xl": "3072px",
        "6xl": "2304px",
        "5xl": "2048px",
        "4xl": "1920px",
        "3xl": "1706px",
        "theme-container":"1400px"
      },
    },
  },
  plugins: [],
}
export default config
