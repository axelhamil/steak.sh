import { UUID } from "@packages/ddd-kit";

export class UserId extends UUID<string> {
  protected [Symbol.toStringTag] = "UserId";

  private constructor(id: UUID<string>) {
    super(id ? id.value : new UUID<string>().value);
  }
  public static create(id: UUID<string>): UserId {
    return new UserId(id);
  }
}
