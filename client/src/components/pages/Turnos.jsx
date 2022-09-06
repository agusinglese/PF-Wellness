import {
  Box,
  Heading,
  Center,
  Text,
  Wrap,
  WrapItem,
  CircularProgress,
  useColorModeValue,
} from "@chakra-ui/react";
import NavStaff from "../NavStaff";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../Pagination";
import DoctorCard from "../doctor/DoctorCard";
import { useEffect } from "react";
import { getHours } from "../../redux/actions";

function Turnos() {
  const allDoctors = useSelector((state) => state.doctors);
  const dispatch = useDispatch();
  console.log(allDoctors, "doc");

  //-----Estilos para modo oscuro----//

  const bgselec = useColorModeValue("white", "#2D3748");
  const colorLetra = useColorModeValue("#1a202c", "#4A5568");

  //---------------------------------//

  useEffect(() => {
    dispatch(getHours());
  }, [dispatch]);

  //PAGINADO
  const [page, setPage] = useState(1);
  const [forPage] = useState(6);
  const [input, setInput] = useState(1);
  const max = Math.ceil(allDoctors.length / forPage);
  return (
    <>
      <Center
        h={{ base: "100vh", sm: "100vh", md: "80vh", lg: "70vh" }}
        bgRepeat="no-repeat"
        bgSize="cover"
        top={0}
        bgImage="linear-gradient(
      rgba(230, 255, 250, 0.7),
      rgba(230, 255, 250, 0.7)
    ),
    url(https://parrocchiagrumello.it/wp-content/uploads/2018/03/97079_agenda1.jpg)"
        flexDirection="column"
      >
        <Heading
          textAlign="center"
          as="h1"
          fontSize={{ base: "2xl", sm: "4xl", md: "5xl", lg: "6xl" }}
          m="1rem"
          color={colorLetra}
          mt={{ base: "10rem", sm: "10rem", md: "8rem", lg: "5rem" }}
        >
          Turnos Online
        </Heading>
        <Box w={{ base: "75%", sm: "75%", md: "60%" }} textAlign="center">
          <Text as="i" fontSize="xl" color={colorLetra}>
            "Selecciona el profesional con el que deseas consultar"
          </Text>
        </Box>
      </Center>

      <Box bg={bgselec} justifyContent="center">
        <Center>
          <NavStaff setInput={setInput} setPage={setPage} />
        </Center>
        {!allDoctors.length ? (
          <Center m="10rem">
            <CircularProgress isIndeterminate color="teal.500" size="100px" />
          </Center>
        ) : (
          false
        )}
        <Wrap justify={"center"}>
          {allDoctors &&
            allDoctors
              .slice((page - 1) * forPage, (page - 1) * forPage + forPage)
              .map((doc) => {
                return (
                  <WrapItem key={doc.id}>
                    <DoctorCard
                      name={doc.name}
                      picture={doc.picture}
                      general_area={doc.general_area?.name}
                      specialty={doc.specialty}
                      id={doc.id}
                    />
                  </WrapItem>
                );
              })}
        </Wrap>
        <Pagination
          page={page}
          setPage={setPage}
          PerPage={max}
          input={input}
          setInput={setInput}
        />
      </Box>
    </>
  );
}

export default Turnos;
