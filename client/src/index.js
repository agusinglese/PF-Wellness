import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import dotenv from "dotenv";
import "./index.css";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
dotenv.config();

export let baseURL = process.env.REACT_APP_API || "http://localhost:3001";

const colors = {
  brand: {
    900: "#fcf7d7",
    800: "#fea667",
    700: "#ffe461",
    600: "#c4c776",
    500: "#f4d092",
  },
};

const breakPoints = {
  brand: {
    sm: "320px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
    "2x1": "1536px",
  },
};
const theme = extendTheme({ colors, breakPoints });

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
