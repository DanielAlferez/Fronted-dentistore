/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        light: "#53B848",
        dark: "#3A8732",
      },
      display: ["group-hover"],
      keyframes: {
        appear: {
          '0%' : { transform: 'translateX(200px)' },
          '100%' : { transform: 'translateX(0px)' },
        },
        disappear: {
          '0%' : { transform: 'translateX(0px)' },
          '100%' : { transform: 'translateX(200px)' },
        },
        up: {
          '0%' : { transform: 'translateY(0px)' },
          '100%' : { transform: 'translateY(-10px)' },
        }
      },
      animation: {
        'appear-cart' : 'appear 300ms linear both',
        'disappear-cart' : 'disappear 300ms linear both',
        'up-box' : 'up 200ms linear both'
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@headlessui/react"),
    require("@material-tailwind/react/utils/withMT"),
  ],
};
