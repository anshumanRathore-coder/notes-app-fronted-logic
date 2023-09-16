import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Box,
  Center,
  Heading,
  useToast
} from "@chakra-ui/react";

import React, { useContext, useState } from "react";

import userContext from "../context/userContext";
import NavbarAfterAuth from "./NavbarAfterAuth";

export default function Addnote() {

  const info = useContext(userContext);
  const { userState, updateState } = info;


  const [note, setnote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleInput = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("api/notes/addNote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: note.title,
        description: note.description,
        tag: note.tag,
      }),
    });

    const jsonData = await response.json();
    if (jsonData.success==='true') {
      localStorage.setItem("userId", jsonData.note.user);
      toast({
        title: "Note is added succesfuly",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      updateState({ notCount: userState.notCount + 1 });
    }else{
      toast({
        title: jsonData.error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })

    }
  };
  const toast=useToast();
  return (
    <>
      <NavbarAfterAuth />
      <Center mt="3em">
        <FormControl>
          <VStack spacing={2}>
            <Box width={["20em", "20em", "30em"]}>
              <FormLabel>Title</FormLabel>
              <Input
                id="title"
                onChange={handleInput}
                name="title"
                value={note.title}
                type="text"
              />
            </Box>

            <Box width={["20em", "20em", "30em"]}>
              <FormLabel>Description</FormLabel>
              <Input
                id="description"
                onChange={handleInput}
                type="text"
                name="description"
                value={note.description}
              />
            </Box>

            <Box width={["20em", "20em", "30em"]}>
              <FormLabel>Tag</FormLabel>
              <Input
                id="username"
                onChange={handleInput}
                type="text"
                name="tag"
                value={note.tag}
              />
            </Box>

            <Button onClick={handleSubmit} colorScheme="green">
              Add Note
            </Button>
          </VStack>
        </FormControl>
      </Center>

      <Center>
        <Heading my="1em">Your All notes</Heading>
      </Center>
    </>
  );
}
