import { Box, Image, useColorModeValue } from "@chakra-ui/react";
import logoLight from "../../assets/img/logo-light.png";
import logoDark from "../../assets/img/logo-dark.png";
function Splasher() {
  const logo = useColorModeValue(logoDark, logoLight);
  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Image
        src={logo}
        w="100px"
        h="100px"
        objectFit="contain"
      />
    </Box>
  );
}

export default Splasher;
