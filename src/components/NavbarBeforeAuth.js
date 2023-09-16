import { Button, Flex, Heading, Image, Spacer } from "@chakra-ui/react";

import logo from "../images/logo.png";

import { Link } from "react-router-dom";

export default function NavbarBeforeAuth() {
  return (
    <>
      <Flex h="5em" bgColor="black" color="white" align="center" gap={3}>
        <Flex width="50%" justify="space-between">
          <Link to="/">
            <Heading>To DO</Heading>
          </Link>

          <Link to="/">
            <Image src={logo} w="3em" rounded="full" />
          </Link>
        </Flex>
        <Spacer />

        <Link to="/login">
          <Button colorScheme="purple">Login</Button>
        </Link>

        <Link to="/signup">
          <Button mr="1em" colorScheme="purple">
            Sign up
          </Button>
        </Link>
      </Flex>
    </>
  );
}
