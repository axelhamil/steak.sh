import { z } from "@packages/libs";

export const signUpInputDtoSchema = z.object({
  name: z
    .string()
    .min(1, "user.name.min")
    .max(50, "user.name.max")
    .nonempty("user.name.required"),
  email: z.string().email("user.email.invalid"),
  password: z.string().min(8, "user.password.min"),
});

export const signUpOutputDtoSchema = z.object({
  token: z.string(),
});

export type ISignUpInputDto = z.infer<typeof signUpInputDtoSchema>;
export type ISignUpOutputDto = z.infer<typeof signUpOutputDtoSchema>;
