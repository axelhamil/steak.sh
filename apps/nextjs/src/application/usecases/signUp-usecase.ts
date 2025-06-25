import { match, Result, type UseCase } from "@packages/ddd-kit";
import { User } from "@/src/domain/user/user-aggregate";
import { UserEmailVo } from "@/src/domain/user/userEmail-vo";
import { UserNameVo } from "@/src/domain/user/userName-vo";
import { UserPasswordVo } from "@/src/domain/user/userPassword-vo";
import type { ISignUpInputDto, ISignUpOutputDto } from "@/src/dto/signUp-dto";
import type { IAuthProvider } from "../ports/IAuthProvider";
import type { IUserRepo } from "../ports/IUserRepo";

export class SignUp implements UseCase<ISignUpInputDto, ISignUpOutputDto> {
  public constructor(
    private readonly userRepo: IUserRepo,
    private readonly authProvider: IAuthProvider,
  ) {}

  public async execute(
    input: ISignUpInputDto,
  ): Promise<Result<ISignUpOutputDto>> {
    const userEmailResult = UserEmailVo.create(input.email);
    if (userEmailResult.isFailure)
      return Result.fail(userEmailResult.getError());

    const userEmail = userEmailResult.getValue();

    const userExistsCheck = await this.checkUserExists(userEmail);
    if (userExistsCheck.isFailure)
      return Result.fail(userExistsCheck.getError());

    const userNameResult = UserNameVo.create(input.name);
    const userPasswordResult = UserPasswordVo.create(input.password);

    const validationResult = Result.combine([
      userNameResult,
      userPasswordResult,
    ]);
    if (validationResult.isFailure)
      return Result.fail(validationResult.getError());

    const userResult = User.create({
      email: userEmail,
      name: userNameResult.getValue(),
      password: userPasswordResult.getValue(),
    });
    if (userResult.isFailure) return Result.fail(userResult.getError());

    const user = userResult.getValue();

    const authResult = await this.authProvider.signUp(user);
    if (authResult.isFailure) return Result.fail(authResult.getError());

    return Result.ok({
      token: authResult.getValue(),
    });
  }

  private async checkUserExists(email: UserEmailVo): Promise<Result<void>> {
    const userExistsResult = await this.userRepo.findBy({
      email,
    });
    if (userExistsResult.isFailure)
      return Result.fail(userExistsResult.getError());

    return match<User, Result<void>>(userExistsResult.getValue(), {
      Some: () => Result.fail("user.email.already_exists"),
      None: () => Result.ok(),
    });
  }
}
