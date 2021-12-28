import "@babel/polyfill";
import * as React from "react";
import { ApolloProvider } from "@apollo/client";
import { createGlobalStyle } from "styled-components";
import graphqlClient from "./api/graphql";
import Root from "./components/Root";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import code from "./App";

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;500&display=swap');
    body {
        font-family: Roboto, sans-serif;
    }
`;

export default function Favorites() {
  return (
    <Container>
        <Col>
      <ApolloProvider client={graphqlClient as any}>
        <GlobalStyle />
        <Root />
      </ApolloProvider>
        </Col>
        <Col>
        <Link to="/">
            <button className="btn btn-success btn-secondary">Go back</button>
        </Link>
        </Col>
    </Container>
  );
}
