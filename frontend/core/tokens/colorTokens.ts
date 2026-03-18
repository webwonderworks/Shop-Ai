export const colorPalettes = {
  trustful: {
    primary: "#1F6E8C",
    accent: "#4FA3A5",
    background: "#FFFFFF",
  },

  modern: {
    primary: "#2A2A2A",
    accent: "#5C7AEA",
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
