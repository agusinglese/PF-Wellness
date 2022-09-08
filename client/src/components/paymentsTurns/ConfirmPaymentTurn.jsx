import { Heading, Box, Button, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { postTurn, sendEmailPago, getOnePatient } from "../../redux/actions";

function ConfirmPaymentTurn() {
  const { search } = useLocation();
  const dispatch = useDispatch();
  const turnos = useSelector((state) => state.turnsByPatient);
  const { dataPayment, patientDetail } = useSelector((state) => state);

  var form = JSON.parse(localStorage.getItem("form"));

  const handleSubmit = () => {
    if (search.includes("approved")) {
      dispatch(postTurn(form));
    }
  };

  useEffect(() => {
    dispatch(getOnePatient(form.idPatient));
    handleSubmit();
  }, [dispatch]);

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Heading
          textColor="teal.500"
          mt={{
            base: "22rem",
            sm: "22rem",
            md: "15rem",
            lg: "15rem",
            xl: "6rem",
          }}
          p="1rem"
          textAlign="center"
          as="h3"
          size="2xl"
          w="70vw"
          bgColor="teal.50"
          borderTopRadius="2rem"
        >
          Pago confirmado!
        </Heading>
        <Box
          w="70vw"
          textAlign="center"
          fontSize="1.5rem"
          alignItems="center"
          p="2rem"
          bgColor="teal.50"
          borderBottomRadius="2rem"
        >
          <Text mb="1rem">Su turno ha sido confirmado con exito</Text>
          <Text colorScheme="teal" fontWeight="semibold" m="1rem" mb="0">
            Gracias por confiar en nosotros!
          </Text>
        </Box>
        <Link to="/">
          <Button
            m="1rem"
            colorScheme={"teal"}
            onClick={() => dispatch(sendEmailPago(patientDetail))}
          >
            Enviar comprobante
          </Button>
        </Link>
      </Box>
    </>
  );
}

export default ConfirmPaymentTurn;
