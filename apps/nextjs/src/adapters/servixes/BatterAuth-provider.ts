import { Result } from "@packages/ddd-kit";
import { auth } from "@/auth";
import type { IAuthProvider } from "@/src/application/ports/IAuthProvider";
import type { User } from "@/src/domain/user/user-aggregate";

export class BetterAuthProvider implements IAuthProvider {
  public async signUp(user: User): Promise<Result<string>> {
    try {
      const password = user.get("password")?.value;

      if (!password) return Result.fail("auth.signup.password_cannot_be_empty");

      const { token } = await auth.api.signUpEmail({
        body: {
          email: user.get("email").value,
          password,
          name: user.get("name").value,
        },
      });

      if (!token) return Result.fail("auth.signup.token_not_generate");

      return Result.ok(token);
    } catch (err) {
      if (err instanceof Error) return Result.fail(err.message);
      return Result.fail("auth.signup.unknown_error");
    }
  }

  public async signIn(
    user: User,
    rememberMe: boolean,
  ): Promise<Result<string>> {
    try {
      const password = user.get("password")?.value;

      if (!password) return Result.fail("auth.signup.password_cannot_be_empty");

      const { token } = await auth.api.signInEmail({
        body: {
          email: user.get("email").value,
          password,
          rememberMe,
        },
      });

      if (!token) return Result.fail("auth.signin.token_not_generate");

      return Result.ok(token);
    } catch (err) {
      if (err instanceof Error) return Result.fail(err.message);
      return Result.fail("auth.signin.unknown_error");
    }
  }
}
