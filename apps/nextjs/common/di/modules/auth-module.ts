import { createModule } from "@evyweb/ioctopus";
import { env } from "@/common/env";
import { UserRepoImpl } from "@/src/adapters/repositories/UserRepo-impl";
import { BetterAuthProvider } from "@/src/adapters/services/BatterAuth-provider";
import { SignInUseCase } from "@/src/application/usecases/signIn-usecase";
import { SignUpUseCase } from "@/src/application/usecases/signUp-usecase";
import { DI_SYMBOLS } from "../types";

export const createAuthModule = () => {
  const authModule = createModule();
  if (env.NODE_ENV === "test") {
  } else {
    authModule.bind(DI_SYMBOLS.IAuthProvider).toClass(BetterAuthProvider);
    authModule.bind(DI_SYMBOLS.IUserRepo).toClass(UserRepoImpl);
    authModule
      .bind(DI_SYMBOLS.SignUpUseCase)
      .toClass(SignUpUseCase, [DI_SYMBOLS.IUserRepo, DI_SYMBOLS.IAuthProvider]);
    authModule
      .bind(DI_SYMBOLS.SignInUseCase)
      .toClass(SignInUseCase, [DI_SYMBOLS.IUserRepo, DI_SYMBOLS.IAuthProvider]);
  }

  return authModule;
};
