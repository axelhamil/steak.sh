import { Result, type UseCase } from "@packages/ddd-kit";
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

    const userExistsOption = await this.userRepo.findBy({
      email: userEmailResult.getValue(),
    });
    if (userExistsOption.isSome())
      return Result.fail("user.email.already_exists");

    const userNameResult = UserNameVo.create(input.name);
    const userPasswordResult = UserPasswordVo.create(input.password);
    const validationResult = Result.combine([
      userNameResult,
      userPasswordResult,
    ]);
    if (validationResult.isFailure)
      return Result.fail(validationResult.getError());

    const userResult = User.create({
      email: userEmailResult.getValue(),
      name: userNameResult.getValue(),
      password: userPasswordResult.getValue(),
    });

    if (userResult.isFailure) return Result.fail(userResult.getError());

    const authResult = await this.authProvider.signUp(userResult.getValue());
    if (authResult.isFailure) return Result.fail(authResult.getError());

    return Result.ok({
      token: authResult.getValue(),
    });
  }
}
