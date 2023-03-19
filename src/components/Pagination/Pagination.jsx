import { Box, ListItem, List, Button } from "@chakra-ui/react";
const  Pagination=( {postPerPage, totalPosts,paginate} ) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts.length / postPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <Box as="nav">
      <List display="flex" alignItems="center" justifyContent="center">
        {pageNumbers.map((number) => (
          <ListItem key={number} mx="2px">
            <Button onClick={()=> paginate(number)} colorScheme="blue">{number}</Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Pagination;
