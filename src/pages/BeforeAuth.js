import NavbarBeforeAuth from "../components/NavbarBeforeAuth";
import todoImage from "../images/backGroundImage.jpg";

import { Center, Image } from "@chakra-ui/react";

export default function BeforeAuth() {
  return (
    <>
      <NavbarBeforeAuth />
      <Center>
        <Image h="60vh" src={todoImage} />
      </Center>
    </>
  );
}
