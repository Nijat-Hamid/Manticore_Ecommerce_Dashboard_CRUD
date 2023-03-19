import {
  Box,
  Container,
  Flex,
  Text,
  Image,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import logoLight from "../../assets/img/logo-light.png";
import logoDark from "../../assets/img/logo-dark.png";

function Footer() {
  const logo = useColorModeValue(logoDark, logoLight);
  return (
    <Box as="footer">
      <Container maxW="full">
        <Flex h="4rem" justify="space-between" align="center">
          <HStack spacing="7px">
            <Image
              width="2rem"
              height="2rem"
              objectFit="cover"
              src={logo}
              alt="Manticore"
            />
            <Text letterSpacing="0.2px" fontSize="md" textTransform="uppercase" fontWeight="600">
              Manticore
            </Text>
          </HStack>
          <Text color="textThird" fontSize="sm">
            © by Nijat Hamid - 2022
          </Text>
        </Flex>
      </Container>
    </Box>
  );
}

export default Footer;
