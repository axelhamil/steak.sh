import { Result, ValueObject } from "@packages/ddd-kit";
import { z } from "@packages/libs";

export class UserNameVo extends ValueObject<string> {
  private readonly schema = z
    .string()
    .min(1, "user.name.min")
    .max(50, "user.name.max")
    .nonempty("user.name.required");

  protected validate(value: string): Result<string, string> {
    const result = this.schema.safeParse(value);

    if (!result.success) return Result.fail(result.error.message);

    return Result.ok(value);
  }
}
