import {
  FormControl,
  FormLabel,
  Input,
  Image,
  Stack,
  Button,
  VStack,
  Box,
  useToast
} from "@chakra-ui/react";

import React, { useContext, useState } from "react";

import NavbarBeforeAuth from "./NavbarBeforeAuth";
import todoImage from "../images/backGroundImage.jpg";

import { useNavigate } from "react-router";

import userContext from "../context/userContext";

export default function Signup() {

  const info = useContext(userContext);
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const jsonData = await response.json();
    if (jsonData.success==='true') {
      localStorage.setItem("token", jsonData.token);
      info.updateState({ isLogin: true });
      toast({
        title: "You are succesfully login to To Do App",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      navigate("/");
    }
    else{
      console.log(jsonData)
      toast({
        title: jsonData.error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  };
  
  const toast=useToast()
  return (
    <>
      <NavbarBeforeAuth />
      <Stack
        mt="2em"
        direction={["column", "column", "row"]}
        justify="space-around"
        align="center"
      >
        <Image height={[null, "60vh", "60vh"]} src={todoImage} />
        <FormControl>
          <VStack spacing={2}>
            <Box width={["20em", "20em", "30em"]}>
              <FormLabel>Email</FormLabel>
              <Input
                id="email"
                onChange={handleInput}
                type="email"
                name="email"
                value={credentials.email}
              />
            </Box>

            <Box width={["20em", "20em", "30em"]}>
              <FormLabel>Password</FormLabel>
              <Input
                id="password"
                onChange={handleInput}
                type="password"
                name="password"
                value={credentials.password}
              />
            </Box>
            <Button onClick={handleSubmit} colorScheme="blue">
              Submit
            </Button>
          </VStack>
        </FormControl>
      </Stack>
    </>
  );
}
