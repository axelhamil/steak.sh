import type { ITransactionManagerService } from "@packages/drizzle/dist/services/transaction-manager.type";
import type { IAuthProvider } from "@/src/application/ports/IAuthProvider";
import type { IUserRepo } from "@/src/application/ports/IUserRepo";
import type { SignInUseCase } from "@/src/application/usecases/signIn-usecase";
import type { SignUpUseCase } from "@/src/application/usecases/signUp-usecase";

export const DI_SYMBOLS = {
  // Services
  ITransactionManagerService: Symbol.for("ITransactionManagerService"),
  IAuthProvider: Symbol.for("IAuthProvider"),
  // Repositories
  IUserRepo: Symbol.for("IUserRepo"),
  // Use Cases
  SignUpUseCase: Symbol.for("SignUpUsecase"),
  SignInUseCase: Symbol.for("SignInUseCase"),
  // Controllers
  // ISignInController: Symbol.for('ISignInController'),
};

export interface DI_RETURN_TYPES {
  // Services
  ITransactionManagerService: ITransactionManagerService;
  IAuthProvider: IAuthProvider;
  // Repositories
  IUserRepo: IUserRepo;
  // Use Cases
  SignUpUseCase: SignUpUseCase;
  SignInUseCase: SignInUseCase;
  // Controllers
  // ISignInController: ISignInController;
}
