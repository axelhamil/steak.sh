"use server";
import signUpController from "@/src/adapters/controllers/signUp-controller";
import type { ISignUpInputDto } from "@/src/dto/signUp-dto";

export default async function signUpAction(input: ISignUpInputDto) {
  return signUpController(input);
}
