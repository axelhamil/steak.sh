"use client";
import type { z } from "@packages/libs";
import { Button } from "@packages/ui/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@packages/ui/components/ui/form";
import { Input } from "@packages/ui/components/ui/input";
import { toast, useForm, zodResolver } from "@packages/ui/index";
import { useEffect } from "react";
import { useSession } from "@/common/auth/auth-client";
import { signUpInputDtoSchema } from "@/src/dto/signUp-dto";
import signUpAction from "../_data_access/mutations/signup-form";

export default function SignUpForm() {
  const session = useSession();

  useEffect(() => {
    console.log(session);
  }, [session]);

  const form = useForm<z.infer<typeof signUpInputDtoSchema>>({
    resolver: zodResolver(signUpInputDtoSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpInputDtoSchema>) => {
    console.log("ici");
    const actionRes = await signUpAction(values);
    let _token: string;

    switch (actionRes.type) {
      case "inputParseError":
        return form.setError("root", {
          message: actionRes.message.map((zod) => zod.message).join(";"),
        });
      case "error":
        return toast.error(actionRes.message);
      case "data":
        _token = actionRes.token;
        break;
      default:
        return "signUp.auth.unknow_error";
    }

    session.refetch();

    toast.success("signUpForm.onSubmit.success");
  };

  const rootError = form.formState.errors.root?.message;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john@doe.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-4">
          Sign UP
        </Button>
        <FormMessage>{rootError}</FormMessage>
      </form>
    </Form>
  );
}
