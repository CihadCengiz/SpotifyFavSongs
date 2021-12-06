import { User } from "#root/db/models";

const userResolver = () => {
    return User.findAll();
};

export default userResolver;