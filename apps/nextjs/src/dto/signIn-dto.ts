import { z } from "@packages/libs";

export const signInInputDtoSchema = z.object({
  name: z
    .string()
    .min(1, "user.name.min")
    .max(50, "user.name.max")
    .nonempty("user.name.required"),
  email: z.string().email("user.email.invalid"),
});

export const signInOutputDtoSchema = z.object({
  token: z.string(),
});

export type ISignInInputDto = z.infer<typeof signInInputDtoSchema>;
export type ISignInOutputDto = z.infer<typeof signInOutputDtoSchema>;
