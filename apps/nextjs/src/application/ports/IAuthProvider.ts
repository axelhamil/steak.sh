import type { Result } from "@packages/ddd-kit";
import type { User } from "@/src/domain/user/user-aggregate";
import type { UserPasswordVo } from "@/src/domain/user/userPassword-vo";

export interface IAuthProvider {
  signUp(user: User): Promise<Result<string>>;
  signIn(
    user: User,
    password: UserPasswordVo,
    rememberMe?: boolean,
  ): Promise<Result<string>>;
}
