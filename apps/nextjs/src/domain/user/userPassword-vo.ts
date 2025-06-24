import { Result, ValueObject } from "@packages/ddd-kit";
import { z } from "@packages/libs";

export class UserPasswordVo extends ValueObject<string> {
  private readonly schema = z.string().min(8, "user.password.min");

  protected validate(value: string): Result<string, string> {
    const result = this.schema.safeParse(value);

    if (!result.success) return Result.fail(result.error.message);

    return Result.ok(value);
  }
}
