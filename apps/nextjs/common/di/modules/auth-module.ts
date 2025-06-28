import { createModule } from "@evyweb/ioctopus";
import { env } from "@/common/env";
import { BetterAuthProvider } from "@/src/adapters/servixes/BatterAuth-provider";
import { SignInUseCase } from "@/src/application/usecases/signIn-usecase";
import { SignUpUseCase } from "@/src/application/usecases/signUp-usecase";
import { DI_SYMBOLS } from "../types";

export const createAuthModule = () => {
  const authModule = createModule();
  if (env.NODE_ENV === "test") {
  } else {
    authModule.bind(DI_SYMBOLS.IAuthProvider).toClass(BetterAuthProvider);
    authModule.bind(DI_SYMBOLS.SignUpUseCase).toClass(SignUpUseCase);
    authModule.bind(DI_SYMBOLS.SignInUseCase).toClass(SignInUseCase);
  }

  return authModule;
};
