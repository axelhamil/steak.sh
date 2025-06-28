import type { IAuthProvider } from "@/src/application/ports/IAuthProvider";
import type { SignInUseCase } from "@/src/application/usecases/signIn-usecase";
import type { SignUpUseCase } from "@/src/application/usecases/signUp-usecase";

export const DI_SYMBOLS = {
  // Services
  IAuthProvider: Symbol.for("IAuthProvider"),
  // Repositories
  // Use Cases
  SignUpUseCase: Symbol.for("SignUpUsecase"),
  SignInUseCase: Symbol.for("SignInUseCase"),
  // Controllers
  // ISignInController: Symbol.for('ISignInController'),
};

export interface DI_RETURN_TYPES {
  // Services
  IAuthProvider: IAuthProvider;
  // Repositories
  // Use Cases
  SignUpUseCase: SignUpUseCase;
  SignInUseCase: SignInUseCase;
  // Controllers
  // ISignInController: ISignInController;
}
