import {
  SimpleGrid,
  Box,
  Container,
  Spinner,
  Text,
  Select,
  HStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Product from "../../components/Product/Product.jsx";
import { fetchProducts } from "../../redux/productSlice/productSlice.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";

function Home() {
  const [sort, setSort] = useState("reversed");
  const [filter, setFilter] = useState(" ");
  const dispatch = useDispatch();
  const apiProducts = useSelector((state) => state.products.products);
  const filteredData = filter == " " ? apiProducts : apiProducts.filter((filterProduct) => filterProduct.category == filter); 
  const sortedData= sort == "reversed" ? [...filteredData].reverse() : filteredData;
  const [currentPage,setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8)
  const indexOfLastPost= currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedData.slice(indexOfFirstPost,indexOfLastPost);
  const paginate = pageNumber => setCurrentPage(pageNumber)
  const products=currentPosts;
  const isLoading=useSelector((state) => state.products.isLoading)
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  
  return (
    <Box >
      <Container maxW="1400px" centerContent>
        <HStack spacing={5} mt="12px" >
          <Select
            fontSize="sm"
            defaultValue={sort}
            onChange={(e) => setSort(e.target.value)}
            fontWeight="500"
            w="150px"
          >
            <option value="reversed">New to old</option>
            <option value="normal"> Old to New</option>
          </Select>
          <Select
            fontSize="sm"
            defaultValue={filter}
            onChange={(e) => setFilter(e.target.value)}
            fontWeight="500"
            w="150px"
          >
            <option value=" ">All</option>
            <option value="laptop"> Laptop</option>
            <option value="phone"> Phone</option>
            <option value="Desktop"> Desktop</option>
          </Select>
        </HStack>
        {
          isLoading ? (
            <Spinner
              w="80px"
              h="80px"
              margin="30px auto"
              thickness="10px"
              color="textFirst"
              display="block"
            />
          ):<SimpleGrid py="20px" columns={{base:"1",sm:"2",md:"3",xl:"4"}} spacing={{base:"10px",sm:"20px",lg:"20px",}}>
          {products.length > 0 ? (
            products.map((product) => (
              <Product product={product} key={product.id} />
            ))
          ) : ""}
        </SimpleGrid>
        }
        <Pagination postPerPage={postsPerPage} totalPosts={sortedData} paginate={paginate}/>
      </Container>
    </Box>
  );
}

export default Home;
