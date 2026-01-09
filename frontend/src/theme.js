import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#f3f5f7",
        color: "#121926",
      },
    },
  },
  fonts: {
    heading: "Space Grotesk, system-ui, sans-serif",
    body: "Manrope, system-ui, sans-serif",
  },
  colors: {
    brand: {
      50: "#eef4ff",
      100: "#d6e5ff",
      200: "#b3ccff",
      300: "#88adff",
      400: "#5c8bff",
      500: "#3b6ff5",
      600: "#2b58d6",
      700: "#2245a3",
      800: "#1c3575",
      900: "#152448"
    },
    accent: {
      500: "#ff7a18",
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "12px",
        fontWeight: "700",
      },
      variants: {
        solid: {
          bg: "brand.500",
          color: "white",
          _hover: { bg: "brand.600" },
        },
        outline: {
          borderColor: "gray.200",
          _hover: { bg: "gray.50" },
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: "16px",
          border: "1px solid #e5e7eb",
          bg: "white",
          boxShadow: "0 8px 24px rgba(18, 25, 38, 0.08)",
        },
      },
    },
  },
});

export default theme;
