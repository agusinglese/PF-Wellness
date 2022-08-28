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
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { MdOutlineEditNote } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { getTurns } from "../../redux/actions";

function AdminAllTurnos() {
  const dispatch = useDispatch();
  const { turns } = useSelector((state) => state);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    dispatch(getTurns());
  }, [dispatch]);

  const handleClick = (id) => {
    console.log(id);
    //dispatch(getOnePatient(id));
    onOpen();
  };

  return (
    <>
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Fecha</Th>
              <Th>Hora</Th>
              <Th>Doctor</Th>
              <Th>Paciente</Th>
            </Tr>
          </Thead>
          <Tbody>
            {turns &&
              turns.map((e) => (
                <Tr>
                  <Td isNumeric>{e.id}</Td>
                  <Td>{e.date}</Td>
                  <Td>{e.hours_workings[0].hour}</Td>
                  <Td>{e.doctors[0].name}</Td>
                  <Td>paciente</Td>
                  <Td>
                    <Button
                      m="0.5rem"
                      colorScheme="teal"
                      size="sm"
                      onClick={() => handleClick(e.id)}
                    >
                      Detalle
                    </Button>
                    <Button m="0.5rem" colorScheme={"teal"} variant="ghost">
                      <Icon w={4} h={4} as={MdOutlineEditNote} />
                    </Button>
                    <Button
                      m="0.5rem"
                      colorScheme={"teal"}
                      variant="ghost"
                      fontSize="xs"
                    >
                      <Icon w={4} h={4} as={RiDeleteBin6Line} />
                    </Button>
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
          </ModalHeader>

          <ModalBody>
            PROXIMAMENTE
            {/*<PatientDetail id={patients.id} />*/}
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

export default AdminAllTurnos;
