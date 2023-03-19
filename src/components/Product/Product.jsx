import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Box,
  IconButton,
  Icon,
  useToast,
} from "@chakra-ui/react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import { useState, useEffect } from "react";
import { addToCart } from "../../redux/cardSlice/cardSlice.jsx";
import { useDispatch } from "react-redux";
import { Link as ChakraLink } from "react-router-dom";
function Product(props) {
  const [quantity, setQuantity] = useState(1);
  const quantityInc = () => {
    setQuantity((quantity) => quantity + 1);
  };
  const quantityDec = () => {
    quantity == 1
      ? setQuantity((quantity) => (quantity = 1))
      : setQuantity((quantity) => quantity - 1);
  };
  const dispatch = useDispatch();
  const [handle, setHandle] = useState(false);
  useEffect(() => {
    if (handle === true) {
      dispatch(addToCart({ ...props.product, total: props.product.config.price * quantity,quantity:quantity }));
      setHandle(false);
    }
  }, [handle]);
  
  const toast = useToast();
  return (
    <Box>
      <Card bg="cardBg" boxShadow="none" color="textFirst" maxW="xs">
        <CardBody>
          <Image
            w="full"
            h={{base:"160px", md:"170px",lg:"200px"}}
            objectFit="cover"
            src={props.product.image}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md" textOverflow="ellipsis" noOfLines={2} h="45px">{props.product.name}</Heading>
            <ButtonGroup variant="outline" alignItems="center">
              <IconButton
                size="sm"
                onClick={quantityDec}
                icon={<Icon as={AiOutlineMinus} />}
              ></IconButton>
              <Text fontWeight="500" w="30px" textAlign="center" fontSize="md">
                {quantity}
              </Text>
              <IconButton
                size="sm"
                onClick={quantityInc}
                icon={<Icon as={AiOutlinePlus} />}
              ></IconButton>
            </ButtonGroup>
            <Text fontWeight="600" fontSize="xl">
              ${props.product.config.price * quantity}
            </Text>
          </Stack>
        </CardBody>
        <Divider borderColor="borderColor" />
        <CardFooter overflow="hidden" display="block">
          <ButtonGroup display="flex" justifyContent="space-between">
            <Button
              variant="solid"
              onClick={() => {setHandle(true);toast({
                title: `${props.product.name} added to basket`,
                status: 'info',
                duration: 4000,
                isClosable: true,
                position:"bottom-left",
                variant:'solid',
              })}}
              colorScheme="blue"
            >
              Add to cart
            </Button>
            <Button as={ChakraLink} to={`/products/${props.product.id}`} state={{data:props}}  variant="ghost" colorScheme="blue">
              Details
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </Box>
  );
}

export default Product;
