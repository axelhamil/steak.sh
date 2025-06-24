import type { Result } from "@packages/ddd-kit";
import type { User } from "@/src/domain/user/user-aggregate";

export interface IAuthProvider {
  signUp(user: User): Promise<Result<string>>;
  signIn(user: User): Promise<Result<string>>;
}
