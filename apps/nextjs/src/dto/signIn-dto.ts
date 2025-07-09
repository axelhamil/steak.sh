import { z } from "@packages/libs";

export const signInInputDtoSchema = z.object({
  password: z.string().min(8, "user.password.min"),
  email: z.string().email("user.email.invalid"),
});

export const signInOutputDtoSchema = z.object({
  token: z.string(),
});

export type ISignInInputDto = z.infer<typeof signInInputDtoSchema>;
export type ISignInOutputDto = z.infer<typeof signInOutputDtoSchema>;
