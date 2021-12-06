import { User, Favorite } from "#root/db/models";

const resolvers = {
  favorites: (user: User) => {
    return Favorite.findAll({
      include: [
        {
          model: User,
          where: { id: user.id },
        },
      ],
      order: [["title", "ASC"]],
    });
  },
};

export default resolvers;
