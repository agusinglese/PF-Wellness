import {
  Box,
  Heading,
  Stack,
  List,
  Button,
  ListItem,
  ListIcon,
  Center,
  Spacer,
  Text,
  useDisclosure,
  Radio,
  RadioGroup,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
  Modal,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import PaymentModal from "./PaymentModal";
import { baseURL } from "../../index";
import axios from "axios";
import { FcNext } from "react-icons/fc";
import { useAuth0 } from "@auth0/auth0-react";

function WellnessAsociados() {
  const { isAuthenticated } = useAuth0();
  const [paymentActive, setPaymentActive] = useState(false);
  const [mensual, setMensual] = useState(false);
  const [semestral, setSemestral] = useState(false);
  const [anual, setAnual] = useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const dispatch = useDispatch();
  const [link, setLink] = useState();
  const notAuthenticatedModal = useDisclosure();

  const [input, setInput] = useState({
    reason: "Wellness Asociados",
    price: 7000,
  });

  const handlePayment = async () => {
    if (isAuthenticated) {
      //try {
      const generarLink = await axios.post(`${baseURL}/asociados`, input);
      console.log(generarLink);
      window.location.href = generarLink.data;
      setLink(generarLink.data);
      //} catch (error) {

      //}
    } else {
      notAuthenticatedModal.onOpen();
    }
    //setPaymentActive(true);
    //onOpen();
  };

  return (
    <>
      {" "}
      <Center
        h="100vh"
        bgRepeat="no-repeat"
        bgSize="cover"
        top={0}
        bgImage="linear-gradient(
      rgba(230, 255, 250, 0.5),
      rgba(230, 255, 250, 0.7)
    ),
    url(https://revistavive.com/wp-content/uploads/2017/12/la-felicidad.jpg)"
        mb={2}
        flexDirection="column"
      >
        <Heading
          textAlign="center"
          as="h1"
          fontSize={{ base: "2xl", sm: "4xl", md: "5xl", lg: "6xl" }}
          m="1rem"
          mt={{ base: "6rem", sm: "6rem", md: "4rem", lg: "1rem" }}
        >
          Asociate a Wellness
        </Heading>
        <Box w={{ base: "75%", sm: "75%", md: "60%" }} textAlign="center">
          <Text as="i" fontSize="xl">
            "Vivi la experiencia Wellness al 100%"
          </Text>
        </Box>
      </Center>
      <Box display="flex" flexDirection={"column"} alignItems="center">
        <Box>
          <Heading
            textAlign={"center"}
            as="h4"
            fontSize={{ base: "xl", sm: "xl", md: "xl", xl: "3xl" }}
            m="1rem"
          >
            Disfruta de los beneficios que <Spacer /> Wellness Asociados puede
            ofrecerte:
          </Heading>

          <List spacing={4} m="2rem">
            <ListItem>
              <ListIcon as={FcNext} />
              Atención personalizada y excelencia médica
            </ListItem>
            <ListItem>
              <ListIcon as={FcNext} />
              Cobertura 100% garantizada en todos nuestros servicios los 365
              días del año
            </ListItem>
            <ListItem>
              <ListIcon as={FcNext} />
              Traslados hacia y desde la clínica en casos de emergencia
            </ListItem>
            <ListItem>
              <ListIcon as={FcNext} />
              Personal disponible las 24hrs del día
            </ListItem>
            <ListItem>
              <ListIcon as={FcNext} />
              Atención domiciliaria sin costo en casos en donde el paciente no
              pueda movilizarse
            </ListItem>
          </List>
        </Box>
        <Box bg="teal.50" w="100%">
          <Heading
            m="1rem"
            mb="2rem"
            textAlign={"center"}
            as="h4"
            fontSize={{ base: "xl", sm: "xl", md: "xl", xl: "3xl" }}
          >
            Descubri los planes que tenemos para vos:
          </Heading>

          <RadioGroup
            colorScheme={"teal"}
            onChange={(e) => {
              if (e === "7000") {
                setAnual(false);
                setSemestral(false);
                setMensual(true);
              } else if (e === "35000") {
                setAnual(false);
                setSemestral(true);
                setMensual(false);
              } else if (e === "63000") {
                setAnual(true);
                setSemestral(false);
                setMensual(false);
              }
              setInput({ ...input, price: parseInt(e) });
            }}
            value={input.price}
          >
            <Stack
              m="1rem"
              direction={{
                base: "column",
                sm: "column",
                md: "column",
                lg: "row",
              }}
              justifyContent="space-around"
              alignItems={"center"}
            >
              <Box
                m="1rem"
                w="15rem"
                h="13rem"
                borderRadius={"0.5rem"}
                bg={mensual ? "#fdde9f" : "white"}
                boxShadow={"2xl"}
                display="flex"
                flexDirection={"column"}
                alignItems="center"
                textAlign={"center"}
              >
                <Text
                  m="0.5rem"
                  mt={"1rem"}
                  fontWeight={"bold"}
                  fontSize="xl"
                  color="teal.700"
                >
                  Plan mensual
                </Text>
                <Text m="0.5rem">Abona mensualmente la cuota</Text>
                <Box display="flex">
                  <Text fontWeight={"semibold"}> $ 7.000/mes</Text>
                </Box>
                <Radio m="1rem" value="7000"></Radio>
              </Box>
              <Box
                w="15rem"
                h="13rem"
                borderRadius={"0.5rem"}
                bg={semestral ? "#fdde9f" : "white"}
                boxShadow={"2xl"}
                display="flex"
                flexDirection={"column"}
                alignItems="center"
                textAlign={"center"}
                m="1rem"
              >
                <Text
                  m="0.5rem"
                  mt={"1rem"}
                  fontWeight={"bold"}
                  fontSize="xl"
                  color="teal.700"
                >
                  Plan Semestral
                </Text>
                <Text m="0.5rem">Abona cada 6 meses la cuota</Text>
                <Box display="flex">
                  <Text as="del" color="red" mr="0.3rem">
                    $ 7.000/mes
                  </Text>{" "}
                  <Text fontWeight={"semibold"} color="green">
                    {" "}
                    ⟶ $ 5.833/mes
                  </Text>
                </Box>
                <Text m="1rem" mb="0" fontWeight={"semibold"}>
                  {" "}
                  $ 35.000/semestral
                </Text>
                <Radio m="1rem" value="35000"></Radio>
              </Box>
              <Box
                w="15rem"
                h="13rem"
                borderRadius={"0.5rem"}
                bg={anual ? "#fdde9f" : "white"}
                boxShadow={"2xl"}
                display="flex"
                flexDirection={"column"}
                alignItems="center"
                textAlign={"center"}
                m="1rem"
              >
                <Text
                  m="0.5rem"
                  mt={"1rem"}
                  fontWeight={"bold"}
                  fontSize="xl"
                  color="teal.700"
                >
                  Plan Anual
                </Text>
                <Text m="0.5rem">Abona cada 12 meses la cuota</Text>
                <Box display="flex">
                  <Text as="del" color="red" mr="0.3rem">
                    $ 7.000/mes
                  </Text>{" "}
                  <Text fontWeight={"semibold"} color="green">
                    {" "}
                    ⟶ $ 5.250/mes
                  </Text>
                </Box>
                <Text m="1rem" mb="0" fontWeight={"semibold"}>
                  {" "}
                  $ 63.000/anual
                </Text>
                <Radio m="1rem" value="63000"></Radio>
              </Box>
            </Stack>
          </RadioGroup>
          <Box display="flex" justifyContent={"center"} m="1rem">
            <Button colorScheme="teal" onClick={() => handlePayment()}>
              Suscribirse
            </Button>
          </Box>
        </Box>
      </Box>
      <PaymentModal
        paymentActive={paymentActive}
        onClose={onClose}
        isOpen={isOpen}
        linkPayment={link}
      />
      <Modal
        isCentered
        isOpen={notAuthenticatedModal.isOpen}
        onClose={notAuthenticatedModal.onClose}
        colorScheme="teal"
      >
        <ModalOverlay />
        <ModalContent w="80%" bgColor="green.50">
          <ModalCloseButton />
          <ModalHeader color="#C53030">Lo sentimos!</ModalHeader>

          <ModalBody>
            <Text color="#C53030">
              Para suscribirte debes estar logueado en la página.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Spacer />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default WellnessAsociados;
