/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "#root/db/models";

const createUserResolver = (context: any, { name }: { name: string }) => {
    return User.create({ name });
  };
  
  export default createUserResolver;