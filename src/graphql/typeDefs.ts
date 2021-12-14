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

    type Mutation {
        createUser(name: String!): User!
        createFavorite(userId: ID!, title: String!): Favorite!
    }

    type Query {
        users: [User!]!
    }
`;

export default typeDefs;