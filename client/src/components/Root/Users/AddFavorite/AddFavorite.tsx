import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

interface AddFavoriteProps {
    onAddFavorite: ({ title }: { title: string}) => Promise<void>;
}

const AddFavoriteButton = styled.button`
  border: 0.0625 dashed #aaaaaa;
  color: #555555;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 400;
  padding: 0.25em;

  :hover {
    cursor: pointer;
  }
`;

const TextField = styled.input`
  border: 0;
  border-bottom: 0.125rem solid #cccccc;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 300;
  padding: 0.25em;
  :focus {
    border-bottom-color: #aaaaaa;
    outline: none;
  }
`;

const Wrapper = styled.div`
  margin: 0.25rem 0;
`;

const AddFavorite = ({ onAddFavorite: pushAddFavorite}: AddFavoriteProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const { formState: { isSubmitting, isValid }, handleSubmit, register, reset} = useForm({mode: "onChange"});

  if (!isAdding) {
    return (
      <Wrapper>
        <AddFavoriteButton onClick={() => setIsAdding(true)}>
          + Add Favorite
        </AddFavoriteButton>
      </Wrapper>
    );
  }

  const onSubmit = handleSubmit(async ({ title }) => {
      await pushAddFavorite({ title });
      reset();
      setIsAdding(false);
  });

  return (
      <Wrapper>
          <form onSubmit={onSubmit}>
              <TextField autoFocus disabled={isSubmitting} type="text" {...register("title", {required: true})} />
              <button disabled={isSubmitting || !isValid} type="submit">Add</button>
          </form>
      </Wrapper>
  );
};

export default AddFavorite;
