import {
  Box,
  Center,
  Heading,
  FormLabel,
  Input,
  Textarea,
  FormControl,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import ReactStars from "react-rating-stars-component";
import React from "react";
import { Context } from "./Context";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { addReview } from "../redux/actions";
import { useDispatch } from "react-redux";

function MakeReviews() {
  const { mostrar, setMostrar } = React.useContext(Context);
  const history = useHistory();
  setMostrar(false);
  const dispatch = useDispatch();

  const [input, setInput] = useState([
    {
      name: "",
      review: "",
      doctors: "All",
      rating: 0,
    },
  ]);
  const [errors, setErrors] = useState({ flag: true });

  function validations(input) {
    let error = {};

    if (!input.name) {
      error.name = "Necesitas completar con tu nombre";
    }
    if (!input.review) {
      error.review = "Completa este campo";
    }
    if (!input.rating) {
      error.rating = "Debes elegir un rating";
    }
    return error;
  }

  const [rating, setRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!errors.name) {
      dispatch(addReview(input));
    }
    history.push("/");
    setMostrar(true);
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validations({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const ratingChanged = (newRating) => {
    console.log(newRating);
    setInput({ ...input, rating: newRating });
    setErrors(
      validations({
        ...input,
        rating: newRating,
      })
    );
  };
  return (
    <>
      <Center
        h="70vh"
        bgImage="linear-gradient(
      rgba(230, 255, 250, 0.7),
      rgba(230, 255, 250, 0.7)
    ),
    url(https://cdn.pixabay.com/photo/2019/10/27/15/49/assist-4582129_960_720.jpg)"
        bgRepeat="no-repeat"
        bgSize="cover"
      >
        <Heading
          textAlign="center"
          as="h1"
          fontSize={{ base: "4xl", sm: "4xl", md: "5xl", lg: "5xl" }}
        >
          Tu opinión nos importa
        </Heading>
      </Center>

      <Box display="flex" justifyContent={"center"} bg="whitesmoke">
        <Box
          bg="white"
          borderWidth="1px"
          borderRadius="0.5rem"
          p="1rem"
          m="2rem"
          boxShadow="2xl"
        >
          <FormControl>
            <FormControl isInvalid={errors.name}>
              <FormLabel m="1rem">Nombre</FormLabel>
              <Input
                name="name"
                value={input.name}
                placeholder="Tu nombre"
                onChange={(e) => handleChange(e)}
              />
              {errors.name && (
                <FormErrorMessage>{errors.name} </FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={errors.review}>
              <FormLabel m="1rem">Tu experiencia en Wellness</FormLabel>
              <Textarea
                maxLength="80"
                name="review"
                type="text"
                value={input.review}
                placeholder="Tu experiencia"
                onChange={(e) => handleChange(e)}
              />
              {errors.review && (
                <FormErrorMessage>{errors.review} </FormErrorMessage>
              )}
            </FormControl>
            <Box ml="1.5rem" mt="1rem">
              <FormControl isInvalid={errors.rating}>
                <ReactStars
                  value={rating}
                  count={5}
                  onChange={ratingChanged}
                  size={40}
                  activeColor="#ffd700"
                />
                {errors.rating && (
                  <FormErrorMessage>{errors.rating} </FormErrorMessage>
                )}
              </FormControl>
            </Box>
            <Link to="/">
              <Button
                m="1rem"
                ml="4.5rem"
                mt="2rem"
                colorScheme={"teal"}
                onClick={(e) => handleSubmit(e)}
                disabled={Object.keys(errors).length}
              >
                Confirmar
              </Button>
            </Link>
          </FormControl>
        </Box>
      </Box>
    </>
  );
}
export default MakeReviews;
