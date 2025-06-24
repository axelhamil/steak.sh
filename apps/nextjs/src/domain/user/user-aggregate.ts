import { Aggregate, Result, type UUID } from "@packages/ddd-kit";
import type { UserEmailVo } from "./userEmail-vo";
import type { UserNameVo } from "./userName-vo";
import type { UserPasswordVo } from "./userPassword-vo";

export interface IUserProps {
  name: UserNameVo;
  email: UserEmailVo;
  password: UserPasswordVo;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User extends Aggregate<IUserProps> {
  private constructor(props: IUserProps, id?: UUID<string>) {
    super(props, id);
  }

  static create(props: IUserProps, id?: UUID<string>): Result<User> {
    return Result.ok(
      new User(
        {
          ...props,
          createdAt: props.createdAt ?? new Date(),
          updatedAt: props.updatedAt ?? new Date(),
        },
        id,
      ),
    );
  }
}
