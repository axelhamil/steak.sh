import type { ZodIssue } from "zod";
import { getInjection } from "@/common/di/container";
import {
  type ISignUpInputDto,
  type ISignUpOutputDto,
  signUpInputDtoSchema,
} from "@/src/dto/signUp-dto";

const inputParseErrorPresenter = (err: ZodIssue[]) => {
  return {
    type: "inputParseError",
    message: err,
  } as const;
};

const errorPresenter = (err: string) => {
  return {
    type: "error",
    message: err,
  } as const;
};

const presenter = (data: ISignUpOutputDto) => {
  return {
    type: "data",
    token: data.token,
  } as const;
};

export default async function signUpController(
  input: ISignUpInputDto,
): Promise<
  ReturnType<
    typeof presenter | typeof inputParseErrorPresenter | typeof errorPresenter
  >
> {
  const { data, error: inputParseError } =
    signUpInputDtoSchema.safeParse(input);

  console.log({ inputParseError });

  if (inputParseError) return inputParseErrorPresenter(inputParseError.errors);

  const signUpUseCase = getInjection("SignUpUseCase");
  const useCaseResult = await signUpUseCase.execute(data);

  if (useCaseResult.isFailure) return errorPresenter(useCaseResult.getError());

  const useCaseData = useCaseResult.getValue();
  console.log(useCaseData);

  return presenter(useCaseData);
}
