import {
  HStack,
  Image,
  Text,
  useColorModeValue,
  Box,
  useBoolean,
  List,
  ListItem,
  ListIcon,
  Link,
  Icon,
  IconButton
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";
import logoLight from "../../assets/img/logo-light.png";
import logoDark from "../../assets/img/logo-dark.png";
import { NavData } from "../../data/NavData.jsx";
import {HiMenuAlt3} from "react-icons/hi"

function Navbar({navState,setNav}) {
  const logo = useColorModeValue(logoDark, logoLight);
  const [hover, isHover] = useBoolean();
  return (
    <Box
      as={motion.nav}
      w={{base:"250px", lg:"90px"}}
      bg="bodyColor"
      p="25px 22px 0 25px"
      h="100vh"
      top="0"
      left={{base: navState? "0":"-500px",lg:'0'}}
      zIndex="333"
      mixBlendMode="normal"
      position={{base:"absolute", lg:"fixed"}}
      overflow="hidden"
      borderRadius="0px 40px 40px 0px"
      transition="0.35s ease-out"
      onMouseEnter={isHover.on}
      onMouseLeave={isHover.off}
      _hover={{base:"", lg:{ w: "270px" }}}
    >
      <HStack spacing="17px">
        <Image
          width="2.4rem"
          height="2.4rem"
          objectFit="contain"
          src={logo}
          alt="Manticore Dashboard"
        />
        <Text
          pointerEvents={{base:"all", lg:hover ? "all" : "none"}}
          visibility={{base:"visible", lg:hover ? "visible" : "hidden"}}
          opacity={{base:"1",lg:hover ? "1" : "0"}}
          transition=".35s ease-out"
          letterSpacing="0.2px"
          fontSize={{base:"lg",lg:"xl"}}
          textTransform="uppercase"
          fontWeight="600"
        >
          Manticore
        </Text>
        <IconButton
        display={{base:"block", lg:"none"}}
              bg="miniCard"
              onClick={setNav}
              aria-label="Dark & Light Mode"
              size="sm"
              icon={
                <Icon w="20px" h="20px" color="textThird" as={HiMenuAlt3} />
              }
          />
      </HStack>
      <List mt="2rem">
        {NavData.length > 0
          ? NavData.map((nav) => (
              <ListItem p="3px 0" key={nav.id} whiteSpace="nowrap">
                <Link
                  p="10px "
                  borderRadius="8px"
                  display="flex"
                  alignItems="center"
                  color="textThird!important"
                  _hover={{ bg: "miniCard", color: "textFirst!important" }}
                  as={RouterLink}
                  to={nav.page}
                >
                  <ListIcon as={nav.icon} fontSize="2xl" />
                  <Text
                    pl="4px"
                    fontWeight="500"
                    visibility={{base:"visible", lg:hover ? "visible" : "hidden"}}
                    pointerEvents={{base:'all',lg:hover ? "all" : "none"}}
                    opacity={{base:"1", lg:hover ? "1" : 0}}
                    display="inline"
                  >
                    {nav.name}
                  </Text>
                </Link>
              </ListItem>
            ))
          : ""}
      </List>
    </Box>
  );
}

export default Navbar;
