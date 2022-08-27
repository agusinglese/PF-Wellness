import React from "react";
import { Link } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Box,
  Wrap,
  Image,
  Text,
  useDisclosure,
  Heading,
  Avatar,
  Center,
  Flex,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import DoctorDetail from "./DoctorDetail";
import { getDetailDoctors } from "../redux/actions";
import { useDispatch } from "react-redux";

export default function DoctorCard({
  id,
  picture,
  name,
  general_area,
  specialty,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  return (
    <>
      <Box
        m="3rem"
        w={"18rem"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Image
          h={"100px"}
          w={"100%"}
          src={
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJgAAAFLCAMAAAAdwbUmAAAAA1BMVEX///+nxBvIAAAASElEQVR4nO3BMQEAAADCoPVPbQlPoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABuBsXTAAGdBi/eAAAAAElFTkSuQmCC"
          }
          objectFit={"cover"}
        />
        <Flex justify={"center"} mt={-12}>
          <Avatar
            size={"xl"}
            src={picture}
            alt={"Author"}
            css={{
              border: "2px solid white",
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={1} align={"center"}>
            <Heading
              textAlign="center"
              mb={"2rem"}
              fontSize={"2xl"}
              fontWeight={350}
              fontFamily={"body"}
            >
              {name}
            </Heading>
            <Text h={"5rem"} textAlign="center" color={"gray.500"}>
              {general_area} - {specialty}
            </Text>
          </Stack>

          <Button
            colorScheme="teal"
            variant="solid"
            onClick={() => {
              dispatch(getDetailDoctors(id));
              onOpen();
            }}
            w={"full"}
            color={"white"}
            rounded={"md"}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
          >
            Leer más
          </Button>
          <Link to={`/calendar/${id}`}>
            <Button
              onClick={() => dispatch(getDetailDoctors(id))}
              mt={"1rem"}
              colorScheme="teal"
              variant="solid"
              w={"full"}
              color={"white"}
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              Pedir turno
            </Button>
          </Link>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#EBF8FF">
          <ModalHeader
            fontSize={"2xl"}
            textAlign="center"
            color="#2C7A7B"
            fontFamily={"body"}
          >
            {" "}
            {name}
          </ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody>
            {/* <Lorem count={2} /> */}
            <DoctorDetail id={id} />
          </ModalBody>

          <ModalFooter>
            <Button bg="#2C7A7B" color="white" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
