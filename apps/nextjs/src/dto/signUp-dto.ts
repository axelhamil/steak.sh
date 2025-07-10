import { z } from "@packages/libs";

export const signUpInputDtoSchema = z
  .object({
    name: z
      .string({
        message: "user.name.invalid_string",
      })
      .min(1, "user.name.min")
      .max(50, "user.name.max")
      .nonempty("user.name.required"),
    email: z
      .string({
        message: "user.email.invalid_string",
      })
      .email("user.email.invalid")
      .nonempty("user.email.non_empty"),
    password: z.string().min(8, "user.password.min"),
    confirmPassword: z.string().min(8, "user.confirmPassword.min"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "signUpForm.confirmPassowrd.doesntMatch",
    path: ["confirmPassword"],
  });

export const signUpOutputDtoSchema = z.object({
  token: z.string(),
});

export type ISignUpInputDto = z.infer<typeof signUpInputDtoSchema>;
export type ISignUpOutputDto = z.infer<typeof signUpOutputDtoSchema>;
