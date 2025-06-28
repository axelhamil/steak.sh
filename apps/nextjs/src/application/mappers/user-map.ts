import { Result, UUID } from "@packages/ddd-kit";
import type { UserInsert, UserSelect } from "@packages/drizzle";
import { User } from "@/src/domain/user/user-aggregate";
import { UserEmailVo } from "@/src/domain/user/userEmail-vo";
import { UserNameVo } from "@/src/domain/user/userName-vo";

export class UserMap {
  public static toPersistence(user: User): UserInsert {
    return {
      email: user.get("email").value,
      name: user.get("name").value,
      id: user._id.value.toString(),
      updatedAt: user.get("updatedAt"),
      createdAt: user.get("createdAt"),
    };
  }

  public static toDomain(user: UserSelect): Result<User> {
    const userEmailResult = UserEmailVo.create(user.email);
    const userNameResult = UserNameVo.create(user.name);

    const validationResult = Result.combine([userEmailResult, userNameResult]);
    if (validationResult.isFailure)
      return Result.fail(validationResult.getError());

    return User.create(
      {
        email: userEmailResult.getValue(),
        name: userNameResult.getValue(),
        updatedAt: user.updatedAt,
        createdAt: user.createdAt,
      },
      new UUID(user.id),
    );
  }
}
