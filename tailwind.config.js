const convertToTWColor = (varName) => {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${varName}), ${opacityValue})`;
    } else {
      return `rgb(var(${varName}))`;
    }
  };
};

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        skin: {
          neutral: convertToTWColor('--color-text-neutral'),
          mutedLight: convertToTWColor('--color-background-neutral'),
        },
      },
      boxShadow: {
        focus: `0 0 0 2px ${convertToTWColor('--color-text-neutral')}`,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
