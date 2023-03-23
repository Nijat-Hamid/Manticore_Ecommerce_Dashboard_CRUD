import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  initialColorMode: "dark",
  useSystemColorMode: false,
  semanticTokens: {
    colors: {
      bodyColor: {
        default: "linear-gradient(180deg, #F6F9FC 0%, #ECECF9 100%)",
        _dark: "linear-gradient(180deg, #2E323F 0%, #0A061A 100%)",
      },
      cardBg: {
        default: "rgba(255, 255, 255, 0.9)",
        _dark: "rgba(255, 255, 255, 0.05)",
      },
      textFirst: {
        default: "#44486D",
        _dark: "#FFFFFF",
      },
      textSecond: {
        default: "#8A8EA6",
        _dark: "#868C9B",
      },
      textThird: {
        default: "#676B89",
        _dark: "#C8CCD8",
      },
      linkColor: {
        default: "#0F8BFD",
        _dark: "#3c88ce",
      },
      miniCard: {
        default: "rgba(68, 72, 109, 0.07)",
        _dark: "rgba(255, 255, 255, 0.05)",
      },
      borderColor:{
        default:"rgba(68, 72, 109, 0.2)",
        _dark:"rgba(255, 255, 255, 0.15)",
      },
      modalIcon:{
        default:"#4299E1",
        _dark:"#90CDF4"
      },
      bgRed:{
        default:"rgb(252, 97, 97)"
      },
      bgGreen:{
        default:"#0BD18A"
      },
      bgBlue:{
        default:"#00D0DE"
      }
    },
  },
  styles: {
    global: {
      body: {
        fontFamily: "body",
        bg: "bodyColor",
        color: "textFirst",
      },
      a: {
        color: "linkColor!important",
        transitionProperty: "all!important",
        transitionDuration: "600ms!important",
        transitionTimingFunction: "ease!important",
        _hover: {
          textDecoration: "none!important",
          color: "#54adff!important",
        },
      },
    },
  },
  fonts: {
    heading: `'Poppins',sans-serif`,
    body: `'Poppins',sans-serif`,
  },
  breakpoints:{
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    '2xl': '1400px',
  }
});

export default theme;
