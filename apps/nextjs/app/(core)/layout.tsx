import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { getSession } from "../_data_access/getSession";

interface ICoreLayout {
  children: ReactNode;
}

export default async function CoreLayout({ children }: ICoreLayout) {
  const session = await getSession();
  if (!session) return redirect("/login");

  return <main>{children}</main>;
}
