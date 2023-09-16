import { Button, Flex, Heading, Image, Spacer, useToast} from "@chakra-ui/react";

import logo from "../images/logo.png";

import { Link } from "react-router-dom";

import userContext from "../context/userContext";

import { useContext } from "react";

export default function NavbarAfterAuth() {
  const context = useContext(userContext);
  const {updateState } = context;

  const handleSignout = () => {
    toast({
      title: "You signout succesfuly from notes app",
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
    updateState({ isLogin: false });
  };
  
  const toast=useToast()
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

        <Link to="/">
          <Button onClick={handleSignout} mr="2em" colorScheme="purple">
            Sign Out
          </Button>
          
        </Link>
      </Flex>
    </>
  );
}
