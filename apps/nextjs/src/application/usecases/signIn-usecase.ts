import { match, Result, type UseCase } from "@packages/ddd-kit";
import type { User } from "@/src/domain/user/user-aggregate";
import { UserEmailVo } from "@/src/domain/user/userEmail-vo";
import { UserPasswordVo } from "@/src/domain/user/userPassword-vo";
import type { ISignInInputDto, ISignInOutputDto } from "@/src/dto/signIn-dto";
import type { IAuthProvider } from "../ports/IAuthProvider";
import type { IUserRepo } from "../ports/IUserRepo";

export class SignInUseCase
  implements UseCase<ISignInInputDto, ISignInOutputDto>
{
  public constructor(
    private readonly userRepo: IUserRepo,
    private readonly authProvider: IAuthProvider,
  ) {}

  public async execute(
    input: ISignInInputDto,
  ): Promise<Result<ISignInOutputDto>> {
    const userEmailResult = UserEmailVo.create(input.email);
    if (userEmailResult.isFailure)
      return Result.fail(userEmailResult.getError());

    const userResult = await this.checkUserExists(userEmailResult.getValue());
    if (userResult.isFailure) return Result.fail(userResult.getError());

    const userPasswordResult = UserPasswordVo.create(input.password);
    if (userEmailResult.isFailure)
      return Result.fail(userEmailResult.getError());

    const authResult = await this.authProvider.signIn(
      userResult.getValue(),
      userPasswordResult.getValue(),
      true,
    );
    if (authResult.isFailure) return Result.fail(authResult.getError());

    return Result.ok({
      token: authResult.getValue(),
    });
  }

  private async checkUserExists(email: UserEmailVo): Promise<Result<User>> {
    const userExistsOption = await this.userRepo.findBy({
      email,
    });
    if (userExistsOption.isFailure)
      return Result.fail(userExistsOption.getError());

    return match<User, Result<User>>(userExistsOption.getValue(), {
      Some: (user) => Result.ok(user),
      None: () => Result.fail("user.email.not_found"),
    });
  }
}
