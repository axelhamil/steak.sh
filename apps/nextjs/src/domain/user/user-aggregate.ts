import { Aggregate, Result, type UUID } from "@packages/ddd-kit";
import { UserId } from "./user-id";
import type { UserEmailVo } from "./userEmail-vo";
import type { UserNameVo } from "./userName-vo";
import type { UserPasswordVo } from "./userPassword-vo";

export interface IUserProps {
  name: UserNameVo;
  email: UserEmailVo;
  password?: UserPasswordVo;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User extends Aggregate<IUserProps> {
  private constructor(props: IUserProps, id?: UUID<string>) {
    super(props, id);
  }

  public get id(): UserId {
    return UserId.create(this._id as UUID<string>);
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
