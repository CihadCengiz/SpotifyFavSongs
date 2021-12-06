import { gql } from "apollo-server";

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        favorites: [Favorite!]!
    }

    type Favorite {
        id: ID!
        title: String!
    }

    type Query {
        users: [User!]!
    }
`;

export default typeDefs;