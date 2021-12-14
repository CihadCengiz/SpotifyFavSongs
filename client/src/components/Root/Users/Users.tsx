import * as React from "react";
import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";
import AddFavorite from "./AddFavorite";
import AddUser from "./AddUser";

interface User {
  id: string;
  name: string;
  favorites: Favorite[];
}

interface QueryData {
  users: User[];
}

interface Favorite {
  id: string;
  title: string;
}

const User = styled.div`
  margin-bottom: 1rem;
`;

const UserName = styled.strong`
  font-size: 1.5rem;
`;

const Favorite = styled.span`
  background-color: #eeeeee;
  font-size: 1rem;
  font-weight: 300;
  padding: 0.25em;
  margin: 0.25rem 0.5rem 0.25rem 0;
`;

const Favorites = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin-top: 0.5rem;
`;

const Wrapper = styled.div``;

const query = gql`
  {
    users {
      id
      name
      favorites {
        id
        title
      }
    }
  }
`;

const createFavoriteMutation = gql`
  mutation ($userId: ID!, $title: String!) {
    createFavorite(userId: $userId, title: $title) {
      id
      title
    }
  }
`;

const createUserMutation = gql`
  mutation($name: String!) {
    createUser(name: $name) {
      id
      name
    }
  }
`;

const Users = () => {
  const { data, loading, refetch } = useQuery<QueryData>(query);

  const [createFavorite] = useMutation<
    {
      createFavorite: Favorite;
    },
    {
      userId: string;
      title: string;
    }
  >(createFavoriteMutation);

  const [createUser] = useMutation<
    {
      createUser: User;
    },
    {
      name: string;
    }
  >(createUserMutation);

  if (loading) return <>Loading...</>;

  return (
    <Wrapper>
      {data &&
        data.users.map((user) => (
          <User key={user.id}>
            <UserName>{user.name}</UserName>
            <Favorites>
              {user.favorites.map((favorite) => (
                <Favorite key={favorite.id}>{favorite.title}</Favorite>
              ))}
              <AddFavorite
                onAddFavorite={async ({ title }) => {
                  await createFavorite({
                    variables: { userId: user.id, title },
                  });
                  refetch();
                }}
              />
            </Favorites>
          </User>
        ))}
      <AddUser
        onAddUser={async ({ name }) => {
          await createUser({ variables: { name } });
          refetch();
        }}
      />
    </Wrapper>
  );
};

export default Users;
