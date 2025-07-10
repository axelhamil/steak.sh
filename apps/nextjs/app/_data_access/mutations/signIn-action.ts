"use server";
import signInController from "@/src/adapters/controllers/signIn-controller";
import type { ISignInInputDto } from "@/src/dto/signIn-dto";

export default async function signInAction(input: ISignInInputDto) {
  return signInController(input);
}
