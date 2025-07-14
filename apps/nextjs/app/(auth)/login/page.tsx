import { Button } from "@packages/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@packages/ui/components/ui/card";
import Link from "next/link";
import LoginForm from "./login-form";

export default function LoginPage() {
  return (
    <main className="h-screen w-full flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader className="flex items-center justify-center">
          <CardTitle>
            <h1 className="text-5xl font-bold md:text-3xl">Steak.sh</h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <p>
            Don&apos;t have an account ?
            <Button variant="link" asChild>
              <Link href="/signup">Sign up</Link>
            </Button>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
