const convertToTWColor = (varName) => {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${varName}), ${opacityValue})`;
    } else {
      return `rgb(var(${varName}))`;
    }
  };
};

const RATIO = 1.24;
const BASE = 1;
const S1 = BASE * RATIO;
const S2 = S1 * RATIO;
const S3 = S2 * RATIO;
const S4 = S3 * RATIO;
const S5 = S4 * RATIO;
const S_1 = BASE / RATIO;
const S_2 = S_1 / RATIO;
const S_3 = S_2 / RATIO;
const S_4 = S_3 / RATIO;
const S_5 = S_4 / RATIO;

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Iosevka Aile', 'serif'],
    },
    fontSize: {
      '2xs': [`${S_3}rem`, RATIO],
      xs: [`${S_2}rem`, RATIO],
      s: [`${S_1}rem`, RATIO],
      base: [`clamp(1em, 1em + ${S_3}vw, ${S1}em)`],
      l: [`${S1}rem`, RATIO],
      xl: [`${S2}rem`, RATIO],
      '2xl': [`${S3}rem`, RATIO],
      '3xl': [`${S4}rem`, RATIO],
    },
    extend: {
      colors: {
        skin: {
          neutralLight: convertToTWColor('--color-text-neutralLight'),
          neutral: convertToTWColor('--color-text-neutral'),
          neutralDark: convertToTWColor('--color-text-neutralDark'),

          mutedDark: convertToTWColor('--color-background-dark'),
          mutedBase: convertToTWColor('--color-background-base'),
          mutedLight: convertToTWColor('--color-background-light'),

          accent: convertToTWColor('--color-accent-base'),

          errorLight: convertToTWColor('--color-errorLight'),
          errorDark: convertToTWColor('--color-errorDark'),
        },
      },
      spacing: {
        xs: `${S_2}rem`,
        s: `${S_1}rem`,
        m: `${RATIO}rem`,
        l: `${S2}rem`,
        xl: `${S3}rem`,
        '2xl': `${S4}rem`,
        '3xl': `${S5}rem`,
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
