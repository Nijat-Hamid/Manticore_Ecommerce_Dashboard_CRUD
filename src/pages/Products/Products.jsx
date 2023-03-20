import {
  Box,
  Container,
  Stack,
  ButtonGroup,
  Button,
  Icon,
  Text,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  HStack,
  IconButton,
  Badge,
  Image,
  Spinner,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Radio,
  RadioGroup,
  SimpleGrid,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import {
  AiOutlinePlus,
  AiOutlineDelete,
  AiOutlineDownload,
  AiOutlineEdit,
} from "react-icons/ai";
import { Field, Form, Formik } from "formik";
import { BiError } from "react-icons/bi";
import { useState, useEffect, useRef } from "react";
import Pagination from "../../components/Pagination/Pagination.jsx";
import {
  fetchProducts,
  deleteProducts,
  patchProducts,
  addProducts
} from "../../redux/productSlice/productSlice.jsx";
import { jsonDownload } from "../../redux/jsonSlice/jsonSlice.jsx";
import { useSelector, useDispatch } from "react-redux";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase/Firebase.jsx";
import { memo } from "react";
const Products = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.products.products);
  const isLoading = useSelector((state) => state.products.isLoading);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpened,
    onOpen: onOpened,
    onClose: onClosed,
  } = useDisclosure();
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();
  const cancelRef = useRef();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const [delId, setDelId] = useState();
  const deleter = () => {
    dispatch(deleteProducts(delId));
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = [...productList]
    .reverse()
    .slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [json, setJson] = useState(false);

  useEffect(() => {
    json == true && dispatch(jsonDownload());
    setJson(false);
  }, [json]);

  const [modalData, setModalData] = useState([]);

  const [imgUrl, setImgUrl] = useState("");
  const [progresspercent, setProgresspercent] = useState(0);
  const imgUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const storageRef = ref(storage, `${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl((url) => (url = downloadURL));
        });
      }
    );
  };
  function validate(value) {
    let error;
    if (!value || value.toString().trim().length == 0) {
      error = "Please, provide any data!";
    }
    return error;
  }
  const [value, setValue] = useState("phone");
  const toast = useToast();
  return (
    <Box minH="90vh" my={5}>
      <Container maxW="full">
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isCentered
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="md" fontWeight="500">
                Confirm
              </AlertDialogHeader>

              <AlertDialogBody display="flex" alignItems="center">
                <Icon fontSize="3rem" me="8px" as={BiError} /> Are you sure you
                want to delete?
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button size="sm" ref={cancelRef} onClick={onClose}>
                  No
                </Button>
                <Button
                  size="sm"
                  colorScheme="yellow"
                  onClick={() => {
                    onClose();
                    deleter();
                  }}
                  ml={3}
                >
                  Yes
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
        <Modal isOpen={isOpened} size="xl" onClose={onClosed}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{modalData.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Image
                w="150px"
                h="150px"
                m="0 auto"
                objectFit="cover"
                rounded="lg"
                src={modalData.image}
              />
              <Formik
                initialValues={{
                  id: `${modalData.id}`,
                  name: `${modalData.name}`,
                  price: `${modalData.config?.price}`,
                  date: `${modalData.config?.date}`,
                  os: `${modalData.config?.os}`,
                  cpu: `${modalData.config?.cpu}`,
                  gpu: `${modalData.config?.gpu}`,
                  color: `${modalData.config?.color}`,
                  storage: `${modalData.config?.storage}`,
                }}
                onSubmit={(values, actions) => {
                  setTimeout(() => {
                    dispatch(patchProducts(values));
                    actions.setSubmitting(false);
                    onClosed();
                    toast({
                      title: `"${values.name}" is updated`,
                      status: "success",
                      duration: 7000,
                      isClosable: true,
                      position: "bottom-right",
                    });
                  }, 1000);
                }}
              >
                {(props) => (
                  <Form>
                    <SimpleGrid
                      minChildWidth="160px"
                      spacingY={3}
                      spacingX={10}
                      mt={3}
                    >
                      <Field name="id" validate={validate}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.id && form.touched.id}
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              ID:
                            </FormLabel>
                            <Input
                              type="number"
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                              isDisabled
                              {...field}
                              placeholder="ID"
                            />
                            <FormErrorMessage>
                              {form.errors.id}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="name" validate={validate}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.name && form.touched.name}
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              Name:
                            </FormLabel>
                            <Input
                              {...field}
                              type="text"
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                              placeholder="Name"
                            />
                            <FormErrorMessage>
                              {form.errors.name}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="price" validate={validate}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.price && form.touched.price}
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              Price:
                            </FormLabel>
                            <Input
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                              type="number"
                              {...field}
                              placeholder="Price"
                            />
                            <FormErrorMessage>
                              {form.errors.price}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="date" validate={validate}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.date && form.touched.date}
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              Date:
                            </FormLabel>
                            <Input
                              {...field}
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                              type="text"
                              placeholder="Date"
                            />
                            <FormErrorMessage>
                              {form.errors.date}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="os" validate={validate}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.os && form.touched.os}
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              OS:
                            </FormLabel>
                            <Input
                              {...field}
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                              type="text"
                              placeholder="OS"
                            />
                            <FormErrorMessage>
                              {form.errors.os}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="cpu" validate={validate}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.cpu && form.touched.cpu}
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              CPU:
                            </FormLabel>
                            <Input
                              {...field}
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                              type="text"
                              placeholder="CPU"
                            />
                            <FormErrorMessage>
                              {form.errors.cpu}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="gpu" validate={validate}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.gpu && form.touched.gpu}
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              GPU:
                            </FormLabel>
                            <Input
                              {...field}
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                              type="text"
                              placeholder="GPU"
                            />
                            <FormErrorMessage>
                              {form.errors.gpu}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="storage" validate={validate}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.storage && form.touched.storage
                            }
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              Storage:
                            </FormLabel>
                            <Input
                              {...field}
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                              type="text"
                              placeholder="Storage"
                            />
                            <FormErrorMessage>
                              {form.errors.storage}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="color" validate={validate}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.color && form.touched.color}
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              Color:
                            </FormLabel>
                            <Input
                              {...field}
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                              type="text"
                              placeholder="Color"
                            />
                            <FormErrorMessage>
                              {form.errors.color}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </SimpleGrid>
                    <Button
                      mt={4}
                      colorScheme="teal"
                      isLoading={props.isSubmitting}
                      type="submit"
                      fontSize={{ base: "sm", md: "md", lg: "lg" }}
                      w="130px"
                      display="block"
                      margin="30px auto 10px auto"
                    >
                      Submit
                    </Button>
                  </Form>
                )}
              </Formik>
            </ModalBody>
          </ModalContent>
        </Modal>
        <Modal isOpen={isOpenModal} size="xl" onClose={onCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add New Item</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {imgUrl.length > 0 ? (
                <Image
                  w="150px"
                  h="150px"
                  m="0 auto"
                  objectFit="cover"
                  rounded="lg"
                  src={imgUrl}
                />
              ) : null}
              <HStack spacing={3} paddingY={3}>
                <Button as="label" cursor="pointer" htmlFor="uploadIMG">
                  Choose Image
                </Button>
                <CircularProgress
                  value={progresspercent}
                  size="40px"
                  color="teal.400"
                >
                  <CircularProgressLabel>
                    {progresspercent}%
                  </CircularProgressLabel>
                </CircularProgress>
                <Input
                  onChange={imgUpload}
                  id="uploadIMG"
                  type="file"
                  pointerEvents="none"
                  position="absolute"
                  visibility="hidden"
                  zIndex="-333"
                  opacity="0"
                  accept="image/*"
                />
              </HStack>
              <Formik
                enableReinitialize={true}
                initialValues={{
                  image: `${imgUrl}`,
                  id: `${productList.length}`,
                  name: "",
                  category: `${value}`,
                  price: "",
                  date: "",
                  os: "",
                  cpu: "",
                  gpu: "",
                  color: "",
                  storage: "",
                }}
                onSubmit={(values, actions) => {
                  setTimeout(() => {
                    dispatch(addProducts(values));
                    actions.setSubmitting(false);
                    onCloseModal();
                    toast({
                      title: `"${values.name}" is created`,
                      status: "success",
                      duration: 5000,
                      isClosable: true,
                      position: "bottom-right",
                    });
                  }, 1000);
                }}
              >
                {(props) => (
                  <Form>
                    <SimpleGrid
                      minChildWidth="200px"
                      spacingY={3}
                      spacingX={10}
                      mt={3}
                    >
                      <Field name="id" validate={validate}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.id && form.touched.id}
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              ID:
                            </FormLabel>
                            <Input
                              type="number"
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                              isDisabled
                              {...field}
                              placeholder="ID"
                            />
                            <FormErrorMessage>
                              {form.errors.id}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="name" validate={validate}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.name && form.touched.name}
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              Name:
                            </FormLabel>
                            <Input
                              {...field}
                              type="text"
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                              placeholder="Name"
                            />
                            <FormErrorMessage>
                              {form.errors.name}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="category" validate={validate}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.category && form.touched.category
                            }
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              Category:
                            </FormLabel>
                            <RadioGroup
                              onChange={setValue}
                              name="category"
                              value={value}
                            >
                              <Stack direction="row" {...field}>
                                <Radio
                                  size={{ base: "sm", md: "md" }}
                                  value="phone"
                                >
                                  Phone
                                </Radio>
                                <Radio
                                  size={{ base: "sm", md: "md" }}
                                  value="laptop"
                                >
                                  Laptop
                                </Radio>
                                <Radio
                                  size={{ base: "sm", md: "md" }}
                                  value="Desktop"
                                >
                                  Desktop
                                </Radio>
                              </Stack>
                            </RadioGroup>
                            <FormErrorMessage>
                              {form.errors.category}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="price" validate={validate}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.price && form.touched.price}
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              Price:
                            </FormLabel>
                            <Input
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                              type="number"
                              {...field}
                              placeholder="Price"
                            />
                            <FormErrorMessage>
                              {form.errors.price}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="date" validate={validate}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.date && form.touched.date}
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              Date:
                            </FormLabel>
                            <Input
                              {...field}
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                              type="text"
                              placeholder="Date"
                            />
                            <FormErrorMessage>
                              {form.errors.date}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="os" validate={validate}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.os && form.touched.os}
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              OS:
                            </FormLabel>
                            <Input
                              {...field}
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                              type="text"
                              placeholder="OS"
                            />
                            <FormErrorMessage>
                              {form.errors.os}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="cpu" validate={validate}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.cpu && form.touched.cpu}
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              CPU:
                            </FormLabel>
                            <Input
                              {...field}
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                              type="text"
                              placeholder="CPU"
                            />
                            <FormErrorMessage>
                              {form.errors.cpu}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="gpu" validate={validate}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.gpu && form.touched.gpu}
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              GPU:
                            </FormLabel>
                            <Input
                              {...field}
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                              type="text"
                              placeholder="GPU"
                            />
                            <FormErrorMessage>
                              {form.errors.gpu}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="storage" validate={validate}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.storage && form.touched.storage
                            }
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              Storage:
                            </FormLabel>
                            <Input
                              {...field}
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                              type="text"
                              placeholder="Storage"
                            />
                            <FormErrorMessage>
                              {form.errors.storage}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="color" validate={validate}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.color && form.touched.color}
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              Color:
                            </FormLabel>
                            <Input
                              {...field}
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                              type="text"
                              placeholder="Color"
                            />
                            <FormErrorMessage>
                              {form.errors.color}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </SimpleGrid>
                    <Button
                      mt={4}
                      colorScheme="teal"
                      isLoading={props.isSubmitting}
                      type="submit"
                      fontSize={{ base: "sm", md: "md", lg: "lg" }}
                      w="130px"
                      display="block"
                      margin="30px auto 10px auto"
                    >
                      Submit
                    </Button>
                  </Form>
                )}
              </Formik>
            </ModalBody>
          </ModalContent>
        </Modal>
        <Box bg="cardBg" p={2} borderRadius="8px">
          <Stack
            direction={{base:"column", sm:"row"}}
            justify="space-between"
            align="center"
            borderRadius="8px"
            border="1px solid"
            borderColor="borderColor"
            p={3}
            spacing={3}
          >
            <ButtonGroup variant="solid" size="sm" spacing="3">
              <Button
                onClick={onOpenModal}
                p={2}
                boxShadow="lg"
                leftIcon={<Icon fontSize="lg" as={AiOutlinePlus} />}
                colorScheme="green"
              >
                New Item
              </Button>
              <Button
                p={2}
                onClick={() => setJson((prev) => (prev = true))}
                boxShadow="lg"
                leftIcon={<Icon fontSize="lg" as={AiOutlineDownload} />}
                colorScheme="pink"
              >
                Export DB
              </Button>
            </ButtonGroup>
            <Text
              fontWeight="600"
              color="textThird"
              pointerEvents="none"
              fontSize={{ base: "sm", md: "md" }}
            >
              Manage Products
            </Text>
          </Stack>
          {isLoading ? (
            <Spinner
              w="80px"
              h="80px"
              margin="30px auto"
              thickness="10px"
              color="textFirst"
              display="block"
            />
          ) : (
            <TableContainer my={3}  maxW={{base:""}} >
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Image</Th>
                    <Th>Price</Th>
                    <Th>Category</Th>
                    <Th>Status</Th>
                    <Th textAlign="center">Edit</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {currentPosts.length > 0
                    ? currentPosts.map((post) =>
                        post == null ? (
                          ""
                        ) : (
                          <Tr key={post.id}>
                            <Td w="400px">{post.name}</Td>
                            <Td minW="150px">
                              <Image
                                w="100px"
                                height="70px"
                                rounded="lg"
                                objectFit="cover"
                                src={post.image}
                                alt={post.name}
                              />
                            </Td>
                            <Td>${post.config.price}</Td>
                            <Td>{post.category}</Td>
                            <Td>
                              <Badge
                                rounded="full"
                                px="10px"
                                py="5px"
                                colorScheme="green"
                              >
                                In Stock
                              </Badge>
                            </Td>
                            <Td w="30px">
                              <HStack spacing={3}>
                                <IconButton
                                  colorScheme="teal"
                                  aria-label="Edit"
                                  size="sm"
                                  onClick={() => {
                                    onOpened();
                                    setModalData(post);
                                  }}
                                  rounded="full"
                                  icon={<Icon as={AiOutlineEdit} />}
                                />
                                <IconButton
                                  onClick={() => {
                                    onOpen();
                                    setDelId((prev) => (prev = post.id));
                                  }}
                                  colorScheme="yellow"
                                  aria-label="Delete"
                                  size="sm"
                                  rounded="full"
                                  icon={<Icon as={AiOutlineDelete} />}
                                />
                              </HStack>
                            </Td>
                          </Tr>
                        )
                      )
                    : undefined}
                </Tbody>
              </Table>
            </TableContainer>
          )}
          <Pagination
            postPerPage={postsPerPage}
            totalPosts={productList}
            paginate={paginate}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default memo(Products);
