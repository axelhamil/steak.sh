import {
  type BaseRepository,
  None,
  type Option,
  Result,
  Some,
  type UUID,
} from "@packages/ddd-kit";
import { db, eq, type Transaction, user as userTable } from "@packages/drizzle";
import { UserMap } from "@/src/application/mappers/user-map";
import type { IUserProps, User } from "@/src/domain/user/user-aggregate";

export class UserRepoImpl implements BaseRepository<User> {
  public async create(user: User, trx?: Transaction): Promise<Result<User>> {
    const invoker = trx ?? db;
    try {
      const userToPersist = UserMap.toPersistence(user);

      const command = invoker.insert(userTable).values(userToPersist);

      await command.execute();
      return Result.ok(user);
    } catch (err) {
      if (err instanceof Error) return Result.fail(err.message);
      return Result.fail("userRepoImpl.create.internal_database_error");
    }
  }

  public async update(user: User, trx?: Transaction): Promise<Result<User>> {
    const invoker = trx ?? db;
    try {
      const userToPersist = UserMap.toPersistence(user);

      const command = invoker.update(userTable).set(userToPersist);

      await command.execute();
      return Result.ok(user);
    } catch (err) {
      if (err instanceof Error) return Result.fail(err.message);
      return Result.fail("userRepoImpl.update.internal_database_error");
    }
  }

  public async delete(uuid: UUID<string>): Promise<Result<UUID<string>>> {
    try {
      const command = db
        .delete(userTable)
        .where(eq(userTable.id, uuid.value.toString()));

      await command.execute();
      return Result.ok(uuid);
    } catch (err) {
      if (err instanceof Error) return Result.fail(err.message);
      return Result.fail("userRepoImpl.delete.internal_database_error");
    }
  }

  public async findById(uuid: UUID<string>): Promise<Result<Option<User>>> {
    try {
      const query = db
        .select()
        .from(userTable)
        .where(eq(userTable.id, uuid.value));

      const [rawUser] = await query.execute();

      if (!rawUser) return Result.ok(None.of());

      const userResult = UserMap.toDomain(rawUser);
      if (userResult.isFailure) return Result.fail(userResult.getError());

      return Result.ok(Some.of(userResult.getValue()));
    } catch (err) {
      if (err instanceof Error) return Result.fail(err.message);
      return Result.fail("userRepoImpl.findById.internal_database_error");
    }
  }

  public async findAll(): Promise<Result<User[], string>> {
    try {
      const query = db.query.user.findMany();

      const rawUsers = await query.execute();

      const usersResult = rawUsers.map((usr) => UserMap.toDomain(usr));
      const validationResult = Result.combine(usersResult);

      if (validationResult.isFailure)
        return Result.fail(validationResult.getError());

      return Result.ok(usersResult.map((res) => res.getValue()));
    } catch (err) {
      if (err instanceof Error) return Result.fail(err.message);
      return Result.fail("userRepoImpl.findAll.internal_database_error");
    }
  }

  public async findBy(
    props: Partial<IUserProps>,
  ): Promise<Result<Option<User>>> {
    try {
      const conditions = [];

      if (props.email) {
        conditions.push(eq(userTable.email, props.email.value));
      }

      if (props.name) {
        conditions.push(eq(userTable.name, props.name.value));
      }

      if (conditions.length === 0) {
        return Result.fail("userRepoImpl.findBy.no_conditions_provided");
      }

      const query = db
        .select()
        .from(userTable)
        .where(
          conditions.length === 1
            ? conditions[0]
            : conditions.reduce((acc, condition) => acc && condition),
        );

      const [rawUser] = await query.execute();

      if (!rawUser) return Result.ok(None.of());

      const userResult = UserMap.toDomain(rawUser);
      if (userResult.isFailure) return Result.fail(userResult.getError());

      return Result.ok(Some.of(userResult.getValue()));
    } catch (err) {
      if (err instanceof Error) return Result.fail(err.message);
      return Result.fail("userRepoImpl.findBy.internal_database_error");
    }
  }

  public async exists(id: UUID<string>): Promise<Result<boolean>> {
    try {
      const query = db
        .select({ id: userTable.id })
        .from(userTable)
        .where(eq(userTable.id, id.value))
        .limit(1);

      const [result] = await query.execute();

      return Result.ok(!!result);
    } catch (err) {
      if (err instanceof Error) return Result.fail(err.message);
      return Result.fail("userRepoImpl.exists.internal_database_error");
    }
  }

  public async count(): Promise<Result<number>> {
    try {
      const query = db.select({ count: userTable.id }).from(userTable);

      const [result] = await query.execute();

      return Result.ok(Number(result?.count ?? 0));
    } catch (err) {
      if (err instanceof Error) return Result.fail(err.message);
      return Result.fail("userRepoImpl.count.internal_database_error");
    }
  }
}
