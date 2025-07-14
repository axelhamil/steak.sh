import { Button } from "@packages/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@packages/ui/components/ui/card";
import Link from "next/link";
import SignUpForm from "./signup-form";

export default function SignUpPage() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="flex items-center justify-center">
        <CardTitle>
          <h1 className="text-5xl font-bold md:text-3xl">Steak.sh</h1>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <p>
          Already have an account ?
          <Button variant="link" asChild>
            <Link href="/login">Login</Link>
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}
