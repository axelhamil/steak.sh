import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { getSession } from "../_data_access/getSession";

interface AuthLayout {
  children: ReactNode;
}

export default async function AuthLayout({ children }: AuthLayout) {
  const session = await getSession();
  if (session) redirect("/dashboard");

  return <>{children}</>;
}
