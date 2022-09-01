import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { AiOutlineComment } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getDetailDoctors, getDoctors, getHours } from "../../../redux/actions";
import DoctorDetail from "../../DoctorDetail";

//BUSCAR EN EL HISTORIAL DE TURNOS, LOS MEDICOS CON LOS QUE ALGUNA VEZ SE ATENDIO
function PatientAllDoctors() {
  const dispatch = useDispatch();
  const { doctors, doctorDetail } = useSelector((state) => state);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    dispatch(getDoctors());
    //dispatch(getDoctorsByPatient(id))
    dispatch(getHours());
  }, [dispatch]);

  const handleClick = (id) => {
    console.log(id);
    dispatch(getDetailDoctors(id));
    onOpen();
  };

  return (
    <>
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th isNumeric>ID</Th>
              <Th>Nombre</Th>
              <Th>Área</Th>
              <Th>Especialidad</Th>
            </Tr>
          </Thead>
          <Tbody>
            {doctors &&
              doctors.map((e) => (
                <Tr key={e.id}>
                  <Td isNumeric>{e.id}</Td>
                  <Td>{e.name}</Td>
                  <Td>{e.general_area?.name}</Td>
                  <Td>{e.specialty}</Td>
                  <Td>
                    <Button
                      m="0.5rem"
                      colorScheme="teal"
                      size="sm"
                      onClick={() => handleClick(e.id)}
                    >
                      Detalle
                    </Button>
                    <Link to="/testimonials">
                      <Button
                        m="0.5rem"
                        colorScheme={"teal"}
                        variant="ghost"
                        fontSize="xs"
                      >
                        <Icon w={4} h={4} as={AiOutlineComment} />
                      </Button>
                    </Link>
                  </Td>
                </Tr>
              ))}
          </Tbody>
          <Tfoot></Tfoot>
        </Table>
      </TableContainer>

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
            {doctorDetail.name}
          </ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody>
            {/* <Lorem count={2} /> */}
            <DoctorDetail id={doctorDetail.id} />
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

export default PatientAllDoctors;
