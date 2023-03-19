import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
} from "@chakra-ui/react";
import { MdLocalShipping } from "react-icons/md";
import { useLocation } from "react-router-dom";

function SingleProducts() {
  const location = useLocation();
  const data = location.state?.data.product;

  return (
    <Container maxW="7xl">
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Image
            rounded={"md"}
            alt={data.name}
            src={data.image}
            fit={"cover"}
            align={"center"}
            w={{base:"100%",  lg:"700px"}}
            h={{ base: "100%", sm: "400px", lg: "500px" }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {data.name}
            </Heading>
            <Text
              color={useColorModeValue("gray.900", "gray.400")}
              fontWeight={300}
              fontSize={"2xl"}
            >
              ${data.config.price}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("blue.500", "blue.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Product Details
              </Text>

              <List spacing={2} >
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Date:
                  </Text>{" "}
                  {data.config.date}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Color:
                  </Text>{" "}
                  {data.config.color}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    OS:
                  </Text>{" "}
                  {data.config.os}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    CPU:
                  </Text>{" "}
                  {data.config.cpu}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    GPU:
                  </Text>{" "}
                  {data.config.gpu}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Storage:
                  </Text>{" "}
                  {data.config.storage}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Category:
                  </Text>{" "}
                  <Text textTransform="capitalize" as="span">
                    {data.category}
                  </Text>
                </ListItem>
              </List>
            </Box>
          </Stack>
          <Stack direction="row" alignItems="center" p={6} justifyContent={"center"}>
            <MdLocalShipping />
            <Text>2-3 business days delivery</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}

export default SingleProducts;
