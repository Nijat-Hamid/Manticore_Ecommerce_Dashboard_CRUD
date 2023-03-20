import {
  Box,
  Container,
  HStack,
  Image,
  SimpleGrid,
  Text,
  Icon,
  Stack,
} from "@chakra-ui/react";
import quantity from "../../assets/icons/quantity.svg";
import rate from "../../assets/icons/rate.svg";
import value from "../../assets/icons/value.svg";
import {
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiOutlineMinus,
} from "react-icons/ai";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { memo } from "react";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { TransactionData } from "../../data/TransactionData.jsx";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {  
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false
    },
  },
};
const labels = ["Jan", "Febr", "Mar", "Apr", "May", "June", "July"];
export const data = {
  labels,
  datasets: [
    {
      label: "Plan",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(252, 97, 97, 0.5)",
      borderRadius: "10",
    },
    {
      label: "Growth",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(0, 208, 222, 0.5)",
      borderRadius: "10",
    },
  ],
};
function Dashboard() {
  return (
    <Box minH="90vh" my={5}>
      <Container maxW="1400px">
        <SimpleGrid columns={{base:"1",sm:"2",xl:"3"}} spacing={5}>
          <HStack
            border="1px solid"
            borderColor="transparent"
            rounded="xl"
            padding="14px 12px"
            justify="space-between"
            align="center"
            bg="cardBg"
          >
            <Box>
              <Text fontWeight="500" fontSize="sm" textTransform="uppercase">
                Conversation Rate
              </Text>
              <Box>
                <HStack mt="5px" spacing="12px">
                  <HStack
                    bg="bgRed"
                    p="3px 7px"
                    spacing="2px"
                    boxShadow="0px 6px 20px rgb(252 97 97 / 30%)"
                    rounded="md"
                  >
                    <Icon as={AiOutlineArrowDown} />
                    <Text>0.6%</Text>
                  </HStack>
                  <Text fontSize={{ base: "lg", md: "xl" }}>0.81%</Text>
                </HStack>
              </Box>
            </Box>
            <Box maxW={{base:"100px",sm:"100px",md:"300px"}}>
              <Image src={rate} w="full" h="full" objectFit="cover" alt="" />
            </Box>
          </HStack>
          <HStack
            border="1px solid"
            borderColor="transparent"
            rounded="xl"
            padding="14px 12px"
            justify="space-between"
            align="center"
            bg="cardBg"
          >
            <Box>
              <Text fontWeight="500" fontSize="sm" textTransform="uppercase">
                AVG. ORDER VALUE
              </Text>
              <Box>
                <HStack mt="5px" spacing="12px">
                  <HStack
                    bg="bgGreen"
                    p="3px 7px"
                    spacing="2px"
                    boxShadow="0px 6px 20px rgb(11 209 138 / 30%)"
                    rounded="md"
                  >
                    <Icon as={AiOutlineArrowUp} />
                    <Text>4.2%</Text>
                  </HStack>
                  <Text fontSize={{ base: "lg", md: "xl" }}>$300</Text>
                </HStack>
              </Box>
            </Box>
            <Box maxW={{base:"100px",sm:"100px",md:"300px"}}>
              <Image src={value} w="full" h="full" objectFit="cover" alt="" />
            </Box>
          </HStack>
          <HStack
            border="1px solid"
            borderColor="transparent"
            rounded="xl"
            padding="14px 12px"
            justify="space-between"
            align="center"
            bg="cardBg"
          >
            <Box>
              <Text fontWeight="500" fontSize="sm" textTransform="uppercase">
                ORDER QUANTITY
              </Text>
              <Box>
                <HStack mt="5px" spacing="12px">
                  <HStack
                    bg="bgBlue"
                    p="3px 7px"
                    spacing="2px"
                    boxShadow="0px 6px 20px rgb(0 208 222 / 30%)"
                    rounded="md"
                  >
                    <Icon as={AiOutlineMinus} />
                    <Text>2.1%</Text>
                  </HStack>
                  <Text fontSize={{ base: "lg", md: "xl" }}>1,602</Text>
                </HStack>
              </Box>
            </Box>
            <Box maxW={{base:"110px",sm:"90px",md:"300px"}}>
              <Image
                src={quantity}
                w="full"
                h="full"
                objectFit="cover"
                alt=""
              />
            </Box>
          </HStack>
        </SimpleGrid>
        <Stack spacing={4} my={5} direction={{base:"column", xl:"row"}} overflow="hidden">
          <Box  p={3} bg="cardBg" w={{base:"full",xl:"900px"}} h={{base:"300px",sm:"400px",xl:"600px"}} overflow="hidden" rounded="xl">
            <Bar  options={options} width="100%" height="100%" data={data} />
          </Box>
          <Box  p={3} bg="cardBg" w={{base:"full",xl:"450px"}}  h={{base:"500px",sm:"480px",xl:"600px"}}  overflow="hidden" rounded="xl">
            <Text textTransform="uppercase" fontWeight="500" fontSize="sm" >Transaction History</Text>
            <Box  pt="4">
              {
                TransactionData.length > 0 ? TransactionData.map((data) => 
                <HStack align="flex-start" key={data.id} mb={{base:"4",xl:"8"}} overflow="hidden" >
                <Box p={2} bg={data.iconbg} w="28px" h="28px" rounded="full" overflow="hidden" display="flex" alignItems="center" justifyContent="center" >
                   <Icon as={data.icon} fontSize="lg" color="textFirst" />
                </Box>
                <Box display="flex" w="calc(100% - 28px)" pl="5px" mb="16px" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Text fontSize="sm" fontWeight="400" lineHeight={1}>{data.name}</Text>
                  <Text color="textThird" fontSize="xs" as="span">{data.date}</Text>
                </Box>
                <Text fontSize="sm" fontWeight="500" color={data.color}>{data.price}</Text>
                </Box>
                </HStack>
                ):undefined
              }
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default memo(Dashboard);
