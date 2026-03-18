export const colorPalettes = {
  trustful: {
    primary: "#0A7C6D",     // ruhig, medizinisch
    accent: "#2FBF71",
    background: "#F7FAF9",
  },

  modern: {
    primary: "#5C7AEA",
    accent: "#F76E11",
    background: "#FFFFFF",
  },

  classic: {
    primary: "#003366",
    accent: "#A0A0A0",
    background: "#FFFFFF",
  },
};

export type ColorPalette =
  typeof colorPalettes[keyof typeof colorPalettes];
