import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { getSession } from "../_data_access/getSession";

interface IAuthLayout {
  children: ReactNode;
}

export default async function AuthLayout({ children }: IAuthLayout) {
  const session = await getSession();
  if (session) return redirect("/dashboard");

  return (
    <main className="h-screen w-full flex items-center justify-center">
      {children}
    </main>
  );
}
