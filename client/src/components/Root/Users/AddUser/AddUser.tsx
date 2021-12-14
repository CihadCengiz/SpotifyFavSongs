import * as React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

interface AddUserProps {
    onAddUser: ({ name }: { name: string }) => Promise<void>;
}

const Wrapper = styled.form`
    margin-top: 1rem;
`;

const Button = styled.button`
    display: inline-block;
    font-family: inherit;
    font-size: 1.2rem;
    font-weight: 300;
    margin-left: 0.5rem;
`;

const TextField = styled.input`
    font-family: inherif;
    font-size: 1.2rem;
    font-weight: 300;
`;

const AddUser = ({ onAddUser: pushAddUser }: AddUserProps) => {
    const { formState: { isSubmitting, isValid}, handleSubmit, register, reset} = useForm<{ name: string}>({ mode: "onChange"});

    const onSubmit = handleSubmit(async ({ name }) => {
        await pushAddUser({ name });
        reset();
    });
  return (
      <Wrapper onSubmit={onSubmit}>
          <TextField disabled={isSubmitting} placeholder="User Name" type="text" {...register("name", {required: true})} />
          <Button disabled={isSubmitting || !isValid} type="submit">Add User</Button>
      </Wrapper>
  );
};

export default AddUser;
