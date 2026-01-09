import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
// import "@fontsource/space-grotesk/400.css";
// import "@fontsource/space-grotesk/600.css";
// import "@fontsource/space-grotesk/700.css";
// import "@fontsource/manrope/400.css";
// import "@fontsource/manrope/500.css";
// import "@fontsource/manrope/600.css";
import App from "./App.jsx";
import theme from "./theme.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
