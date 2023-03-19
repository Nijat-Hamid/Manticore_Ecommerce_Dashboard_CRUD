import {
  Box,
  Container,
  Flex,
  Icon,
  Input,
  InputLeftElement,
  InputGroup,
  HStack,
  IconButton,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorMode,
  useColorModeValue,
  Text,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Badge,
  Stack,
  CardBody,
  Heading,
  CardFooter,
  Image,
  Card,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { BsSun, BsMoonFill, BsBasket } from "react-icons/bs";
import {HiMenuAlt1} from "react-icons/hi"
import {
  AiOutlineSearch,
  AiOutlineUser,
  AiOutlineSetting,
  AiOutlineDelete,
  AiOutlineMenu
} from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import avatar from "../../assets/img/avatar.jpg";
import { useDispatch, useSelector } from "react-redux";
import { deleteCard } from "../../redux/cardSlice/cardSlice.jsx";
function Header({setNav}) {
  const { toggleColorMode } = useColorMode();
  const systemMode = useColorModeValue(BsSun, BsMoonFill);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const basket = useSelector((state) => state.cart.cardItems);
  const totalAmount = useSelector((state) => state.cart.cardTotalAmount);
  const dispatch = useDispatch();
  const [delID, setDelID] = useState([]);
  
  useEffect(() => {
    dispatch(deleteCard(delID));
  }, [delID],[dispatch]);

  return (
    <HStack pt="20px" bg="transparent" as="header">
      <Container maxW="full">
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader color="textFirst">Cart</DrawerHeader>
            <DrawerBody px={2}>
              {basket.length > 0 ? (
                basket.map((basket) => (
                  <Card
                    bg="cardBg"
                    boxShadow="none"
                    color="textFirst"
                    maxW="full"
                    direction="row"
                    align="flex-start"
                    key={basket.id}
                    mb={4}
                  >
                    <CardBody>
                      <Image
                        w="140px"
                        h="90px"
                        objectFit="cover"
                        src={basket.image}
                        alt={basket.name}
                        borderRadius="lg"
                      />
                    </CardBody>
                    <CardFooter w="calc(100% - 140px)" px="5px">
                      <Stack spacing={2} textAlign="left">
                        <Heading size="xs">{basket.name}</Heading>
                        <Text fontWeight="600" fontSize="md">
                          ${basket.config.price * basket.quantity}
                        </Text>
                        <IconButton
                          bg="miniCard"
                          aria-label="Delete from Basket"
                          onClick={() => setDelID((prev) => (prev = basket))}
                          icon={
                            <Icon
                              w="15px"
                              h="15px"
                              color="textThird"
                              as={AiOutlineDelete}
                            />
                          }
                        />
                      </Stack>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <Heading textAlign="center" fontSize={{base:"xl",sm:"3xl"}}>
                  Empty!{" "}
                  <Text mt={4} fontSize={{base:"sm",sm:"md"}}>
                    Please,add item to basket!
                  </Text>
                </Heading>
              )}
            </DrawerBody>
            <DrawerFooter
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text fontSize="lg" fontWeight="700">
                ${totalAmount}
              </Text>
              <Button colorScheme="blue">Pay</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Flex align="center" justify="space-between">
          <IconButton bg="miniCard" fontSize="lg" display={{base:"block", lg:"none"}} icon={<Icon w="20px" h="20px" color="textThird" onClick={setNav} as={HiMenuAlt1}/>}/>
          <Text fontWeight="500">Dashboard</Text>

          <HStack spacing="7px">
            <Box position="relative">
              <IconButton
                ref={btnRef}
                onClick={onOpen}
                bg="miniCard"
                aria-label="Basket"
                // size={{base:"sm",md:"md"}}
                w={{base:"30px",sm:"34px", md:"36px"}}
                h={{base:"34px",sm:"38px",md:"40px"}}
                icon={
                  <Icon w={{base:"14px", sm:"16px",md:"18px"}} h={{base:"14px", sm:"16px",md:"18px"}} color="textThird" as={BsBasket} />
                }
              />
              <Badge
                colorScheme="blue"
                position="absolute"
                pointerEvents="none"
                left="-8px"
                top="-6px"
                fontSize="12px"
              >
                {basket.length}
              </Badge>
            </Box>
            <IconButton
              bg="miniCard"
              onClick={toggleColorMode}
              w={{base:"30px",sm:"34px", md:"36px"}}
                h={{base:"34px",sm:"38px",md:"40px"}}
              aria-label="Dark & Light Mode"
              icon={
                <Icon w={{base:"14px", sm:"16px",md:"18px"}} h={{base:"14px", sm:"16px",md:"18px"}} color="textThird" as={systemMode} />
              }
            />
            <Box>
              <Menu gutter="12">
                <MenuButton
                  bg="miniCard"
                  w={{base:"28px",sm:"30px", md:"32px"}}
                h={{base:"30px",sm:"32px",md:"34px"}}
                  borderColor="transparent"
                  _hover={{
                    bg: "miniCard",
                  }}
                  as={IconButton}
                  aria-label="Options"
                  icon={<Avatar size={{base:"xs",sm:"sm"}} name="Nijat Hamid" src={avatar} />}
                  variant="outline"
                />
              </Menu>
            </Box>
          </HStack>
        </Flex>
      </Container>
    </HStack>
  );
}

export default Header;
