import "@babel/polyfill";
import * as React from "react";
import { ApolloProvider } from "@apollo/client";
import { render } from "react-dom";
import { createGlobalStyle } from "styled-components";
import graphqlClient from "./api/graphql";
import Root from "./components/Root";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;500&display=swap');
    body {
        font-family: Roboto, sans-serif;
    }
`;

render(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // <ApolloProvider client={graphqlClient as any}>
  //   <GlobalStyle />
  //   <Root />
  // </ApolloProvider>,
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("app")
);
