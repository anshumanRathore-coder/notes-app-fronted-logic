import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  Text,
  VStack,
  Stack,
  useColorModeValue,
  HStack,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast
} from "@chakra-ui/react";


import { useContext, useState } from "react";
import userContext from "../context/userContext";

export default function SingleNote(props) {
  const info = useContext(userContext);
  const { userState, updateState } = info;

  const toast=useToast()
  
  const handleDelete = async () => {
    await fetch(`api/notes/deleteNote/${id}`, {
      method: "DELETE",
    });
    toast({
      title: "You note is deleted successfuly",
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
    updateState({ noteCount: userState.notCount - 1 });
  };

  const handleUpdate = async () => {
   const response=await fetch(`api/notes/updateNote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: note.title,
        description: note.description,
        tag: note.tag,
      }),
    });
    const jsonData=await response.json();
    if (jsonData.success==='true') {
      onClose();
      toast({
        title: "You note is update successfuly",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      updateState({ noteCount: userState.notCount + 1 });
    }
    else{
      toast({
        title: "Title and description is required",
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  };
  
  const handleInput = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  const { id, title, description, tag, date } = props;
  const normalDate = new Date(date);
  // Get the year, month, and day components
  const year = normalDate.getFullYear(); 
  const month = normalDate.getMonth() + 1;
  const day = normalDate.getDate();
  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;


  const { isOpen, onOpen, onClose } = useDisclosure();

  const [note, setnote] = useState({ title: "", description: "", tag: "" });
  
  return (
    <>
      <Box
        // eslint-disable-next-line react-hooks/rules-of-hooks
        width="350px"
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
      >
        <Stack justify="space-evenly">
          <Heading
            // eslint-disable-next-line react-hooks/rules-of-hooks
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"body"}
          >
            {title}
          </Heading>
          <Text
            color={"green.500"}
            textTransform={"uppercase"}
            fontWeight={800}
            fontSize={"sm"}
            letterSpacing={1.1}
          >
            {tag}
          </Text>
          <Text
            textTransform={"uppercase"}
            fontWeight={800}
            fontSize={"sm"}
            letterSpacing={1.1}
          >
            {formattedDate}
          </Text>
          <Text color={"gray.500"}>{description}</Text>
          <HStack>
            <IconButton
              onClick={handleDelete}
              bgColor="white"
              position={"relative"}
              bottom="0px"
              right="0px"
              icon={<DeleteIcon />}
            />
            <IconButton
              onClick={onOpen}
              bgColor="white"
              position={"relative"}
              bottom="0px"
              right="0px"
              icon={<EditIcon />}
            />
          </HStack>
        </Stack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>
          <FormControl>
            <VStack spacing={2}>
              <Box width={["20rem", "25rem"]}>
                <FormLabel>Title</FormLabel>
                <Input
                  id="title"
                  onChange={handleInput}
                  name="title"
                  value={note.title}
                  type="text"
                />
              </Box>

              <Box width={["20rem", "25rem"]}>
                <FormLabel>Description</FormLabel>
                <Input
                  id="description"
                  onChange={handleInput}
                  type="text"
                  name="description"
                  value={note.description}
                />
              </Box>

              <Box width={["20rem", "25rem"]}>
                <FormLabel>Tag</FormLabel>
                <Input
                  id="username"
                  onChange={handleInput}
                  type="text"
                  name="tag"
                  value={note.tag}
                />
              </Box>
            </VStack>
          </FormControl>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleUpdate} variant="ghost">
              Update note
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
