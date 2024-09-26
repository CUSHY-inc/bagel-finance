import { User } from "@prisma/client";
import { handleFailed, handleSucceed } from "..";

export async function getUser({ id }: { id: number }): Promise<User> {
  return fetch(`/api/users/${id}`).then(handleSucceed).catch(handleFailed);
}
