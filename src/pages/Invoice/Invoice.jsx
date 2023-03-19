import {
  Box,
  Container,
  HStack,
  Stack,
  Image,
  Text,
  useColorModeValue,
  Tr,
  Td,
  Th,
  Thead,
  Tbody,
  TableContainer,
  Table,
  TableCaption,
  Tfoot,
} from "@chakra-ui/react";
import logoLight from "../../assets/img/logo-light.png";
import logoDark from "../../assets/img/logo-dark.png";
import { useSelector } from "react-redux";
function Invoice() {
  const logo = useColorModeValue(logoDark, logoLight);
  const basket = useSelector((state) => state.cart.cardItems);
  const totalAmount = useSelector((state) => state.cart.cardTotalAmount);
  return (
    <Box minH="90vh" my={5}>
      <Container maxW="1440px">
        <Box
          rounded="lg"
          bg="cardBg"
          border="1px solid"
          borderColor="transparent"
          p={{base:"20px",sm:"32px"}}
        >
          <Stack
            justify="space-between"
            align="center"
            borderBottom="1px solid"
            borderColor="whiteAlpha.300"
            pb="24px"
            direction={{base:"column",sm:"row"}}
          >
            <HStack spacing={3}>
              <Image
                width="2.4rem"
                height="2.4rem"
                objectFit="contain"
                src={logo}
                alt="Manticore Invoice"
              />
              <Text fontWeight="600" fontSize="lg">
                Manticore
              </Text>
            </HStack>
            <Box textAlign={{base:"center",sm:"right"}} pt={{base:"5",sm:"0"}}>
              <Text
                lineHeight="7px"
                color="textThird"
                fontWeight="400"
                fontSize="sm"
              >
                Customer ID: C1613
              </Text>
              <Text as="span" color="textSecond"   fontSize="xs">
                Azerbaijan,Baku. MirMahmud Kazimovski Street
              </Text>
            </Box>
          </Stack>
          <Box py="24px">
            <Text as="span" fontSize="xs" fontWeight="500" color="textSecond">
              {" "}
              16 March 2023
            </Text>
            <Text fontWeight="500" fontSize="xl">
              Invoice{" "}
              <Text fontWeight="400" color="textSecond" as="span">
                #0002
              </Text>
            </Text>
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="500">
              Customer Firm name
            </Text>
            <Text maxW="200px" fontSize="xs" color="textSecond">
              Claire Williams, 148 Hope Lane Palo Alto, CA 94304.
            </Text>
          </Box>
          <Box py="24px">
            <TableContainer>
              <Table variant="simple">
                <TableCaption
                  textAlign="left"
                  fontSize="xs"
                  px={0}
                  pb={5}
                  color="textThird"
                >
                  Note: When you tap "Pay" button in the Basket, the products
                  will be added to this table
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th
                      p={0}
                      fontSize="10px"
                      textTransform="capitalize"
                      color="textSecond"
                    >
                      Product Name
                    </Th>
                    <Th
                      fontSize="10px"
                      textTransform="capitalize"
                      color="textSecond"
                      isNumeric
                    >
                      Quantity
                    </Th>
                    <Th
                      fontSize="10px"
                      textTransform="capitalize"
                      color="textSecond"
                      isNumeric
                    >
                      Unit Price
                    </Th>
                    <Th
                      fontSize="10px"
                      textTransform="capitalize"
                      color="textSecond"
                      p={0}
                      isNumeric
                    >
                      Line Total
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {basket.length > 0
                    ? basket.map((item) => (
                        <Tr key={item.id}>
                          <Td fontSize="sm" p={0}>
                            {item.name}
                          </Td>
                          <Td fontSize="sm" isNumeric>
                            {item.quantity}
                          </Td>
                          <Td fontSize="sm" isNumeric>
                            {item.config?.price}$
                          </Td>
                          <Td fontSize="sm" p={0} isNumeric>
                            {item.total}$
                          </Td>
                        </Tr>
                      ))
                    : undefined}
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th
                      p="12px 0 0 0"
                      fontSize="14px"
                      textTransform="capitalize"
                      color="textThird"
                    >
                      Total
                    </Th>
                    <Th p="12px 0 0 0" isNumeric></Th>
                    <Th p="12px 0 0 0" isNumeric></Th>
                    <Th
                      p="12px 0 0 0"
                      fontSize="14px"
                      textTransform="capitalize"
                      color="textThird"
                      isNumeric
                    >
                      {totalAmount}$
                    </Th>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Invoice;
