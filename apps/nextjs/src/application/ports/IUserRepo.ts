import type { BaseRepository } from "@packages/ddd-kit";
import type { User } from "@/src/domain/user/user-aggregate";

export interface IUserRepo extends BaseRepository<User> {}
