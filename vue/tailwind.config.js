module.exports = {
  content: [
    "./index.html",
    "./components/**/*.{html,js}",
    "./views/**/*.{html,js}",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  variants: {
    extend: {
      opacity: ["disabled"],
      cursor: ["disabled"],
    },
  },
  theme: {
    fontSize: {
      '20px': '20px',
      '12px': '12px',

    },
    extend: {
      keyframes: {
        "fade-in-down": {
          from: {
            transform: "translateY(-0.75rem)",
            opacity: "0",
          },
          to: {
            transform: "translateY(0rem)",
            opacity: "1",
          },
        },
      },
      animation: {
        "fade-in-down": "fade-in-down 0.2s ease-in-out both",
      },
      height: {
        "50px": "50px",
        "60px": "60px"
      },
      width: {
        "30px": "30px",
        "20px": "20px",
        "1200px": "1200px",
        "800px": "800px",
        
      },
      minHeight: {
        "150px": "150px",
      },
    },
  },
  plugins: [
    require("flowbite/plugin")
  ],
};
