import type { ZodIssue } from "zod";
import { getInjection } from "@/common/di/container";
import {
  type ISignInInputDto,
  type ISignInOutputDto,
  signInInputDtoSchema,
} from "@/src/dto/signIn-dto";

const inputParseErrorPresenter = (err: ZodIssue[]) => {
  return {
    type: "inputParseError",
    message: err.join(";"),
  } as const;
};

const errorPresenter = (err: string) => {
  return {
    type: "error",
    message: err,
  } as const;
};

const presenter = (data: ISignInOutputDto) => {
  return {
    type: "data",
    token: data.token,
  } as const;
};

export default async function signInController(
  input: ISignInInputDto,
): Promise<
  ReturnType<
    typeof presenter | typeof inputParseErrorPresenter | typeof errorPresenter
  >
> {
  const { data, error: inputParseError } =
    signInInputDtoSchema.safeParse(input);

  if (inputParseError) return inputParseErrorPresenter(inputParseError.errors);

  const signInUseCase = getInjection("SignInUseCase");
  const useCaseResult = await signInUseCase.execute(data);

  if (useCaseResult.isFailure) return errorPresenter(useCaseResult.getError());

  const useCaseData = useCaseResult.getValue();

  return presenter(useCaseData);
}
