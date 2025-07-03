import { createContainer } from "@evyweb/ioctopus";
import { createAuthModule } from "./modules/auth-module";
import { createTransactionModule } from "./modules/transaction-module";
import { type DI_RETURN_TYPES, DI_SYMBOLS } from "./types";

const ApplicationContainer = createContainer();

ApplicationContainer.load(Symbol("AuthModule"), createAuthModule());
ApplicationContainer.load(
  Symbol("TransactionModule"),
  createTransactionModule(),
);

export function getInjection<K extends keyof typeof DI_SYMBOLS>(
  symbol: K,
): DI_RETURN_TYPES[K] {
  return ApplicationContainer.get(DI_SYMBOLS[symbol]);
}
