/* eslint-disable @typescript-eslint/no-explicit-any */
import { Favorite } from "#root/db/models";

const createFavoriteResolver = (
  context: any,
  { userId, title }: { userId: string; title: string }
) => {
  return Favorite.create({ userId, title });
};

export default createFavoriteResolver;