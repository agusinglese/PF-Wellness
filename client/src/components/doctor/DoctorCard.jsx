import React, { useState } from "react";

import { Link } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  ModalCloseButton,
  Box,
  Image,
  Text,
  useDisclosure,
  Heading,
  Avatar,
  Spacer,
  Flex,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import DoctorDetail from "./DoctorDetail";
import { useAuth0 } from "@auth0/auth0-react";

import { getDetailDoctors } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

export default function DoctorCard({
  id,
  picture,
  name,
  general_area,
  specialty,
}) {
  const dispatch = useDispatch();

  const { user, logout, isAuthenticated, loginWithRedirect } = useAuth0();
  const usuario = useSelector((state) => state.user);
  console.log(usuario, "USUARIOOOO");

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const [overlay, setOverlay] = useState(<OverlayOne />);

  const notVerificadeModal = useDisclosure();
  const notAuthenticatedModal = useDisclosure();
  const notActivoModal = useDisclosure();
  const notInfoComplete = useDisclosure();
  const modal = useDisclosure();

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
              modal.onOpen();
            }}
            w={"full"}
            rounded={"md"}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
          >
            Leer más
          </Button>

          {isAuthenticated &&
          usuario.activo &&
          user.email_verified &&
          usuario.prepaid_healths?.length > 0 ? (
            <Link to={`/calendar/${id}`}>
              <Button
                onClick={() => dispatch(getDetailDoctors(id))}
                mt={"1rem"}
                colorScheme="teal"
                variant="solid"
                w={"full"}
                rounded={"md"}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
              >
                Pedir turno
              </Button>
            </Link>
          ) : (
            <Button
              colorScheme="teal"
              variant="solid"
              onClick={() =>
                isAuthenticated
                  ? user.email_verified
                    ? usuario.prepaid_healths?.length
                      ? usuario.activo
                        ? true
                        : notActivoModal.onOpen()
                      : notInfoComplete.onOpen()
                    : notVerificadeModal.onOpen()
                  : notAuthenticatedModal.onOpen()
              }
              mt={"1rem"}
              w={"full"}
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              Pedir turno
            </Button>
          )}
        </Box>
      </Box>

      <Modal
        isCentered
        isOpen={notInfoComplete.isOpen}
        onClose={notInfoComplete.onClose}
        colorScheme="teal"
        w="100%"
      >
        <ModalOverlay />
        <ModalContent bgColor="green.50" w="80%">
          <ModalHeader color="#C53030">
            Datos personales incompletos
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              Para poder solicitar un turno, tus datos personales obligatorios
              deben estar completos.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="teal"
              variant="ghost"
              mr={3}
              onClick={() => notInfoComplete.onClose}
            >
              Cancelar
            </Button>
            <Link to={`/userProfile/${usuario.id}`}>
              <Button colorScheme={"teal"}>Ir al perfil</Button>
            </Link>
            <Spacer />
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isCentered
        isOpen={notVerificadeModal.isOpen}
        onClose={notVerificadeModal.onClose}
        colorScheme="teal"
        w="100%"
      >
        <ModalOverlay />
        <ModalContent bgColor="green.50" w="80%">
          <ModalHeader color="#C53030">Ups!!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text color="#C53030">Debes verificar el email</Text>
          </ModalBody>
          <ModalFooter>
            <Spacer />
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isCentered
        isOpen={notAuthenticatedModal.isOpen}
        onClose={notAuthenticatedModal.onClose}
        colorScheme="teal"
        w="100%"
      >
        <ModalOverlay />
        <ModalContent bgColor="green.50" w="80%">
          <ModalHeader color="#C53030">Ups!!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text color="#C53030">Debes estar registrado</Text>
          </ModalBody>
          <ModalFooter>
            <Spacer />
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isCentered
        isOpen={notActivoModal.isOpen}
        onClose={notActivoModal.onClose}
        colorScheme="teal"
      >
        <ModalOverlay />
        <ModalContent w="80%" bgColor="green.50">
          <ModalCloseButton />
          <ModalHeader color="#C53030">Lo Sentimos!</ModalHeader>

          <ModalBody>
            <Text color="#C53030">
              Te encuentras deshabilitado, comunicate con
              wellnesclinica@gmail.com.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Spacer />
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={modal.isOpen} onClose={modal.onClose}>
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

          <ModalBody>
            <DoctorDetail id={id} />
          </ModalBody>

          <ModalFooter>
            <Link to="/opiniones">
              <Button colorScheme={"teal"} variant="ghost">
                Ver comentarios
              </Button>
            </Link>
            <Button
              bg="#2C7A7B"
              color="white"
              mr={3}
              onClick={() => modal.onClose()}
            >
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
