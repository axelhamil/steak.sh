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
import { signInInputDtoSchema } from "@/src/dto/signIn-dto";
import signInAction from "../_data_access/mutations/signIn-action";

export default function LoginForm() {
  const session = useSession();

  useEffect(() => {
    console.log(session);
  }, [session]);

  const form = useForm<z.infer<typeof signInInputDtoSchema>>({
    resolver: zodResolver(signInInputDtoSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signInInputDtoSchema>) => {
    const actionRes = await signInAction(values);
    let _token: string;

    switch (actionRes.type) {
      case "inputParseError":
        return form.setError("root", {
          message: actionRes.message,
        });
      case "error":
        return toast.error(String(actionRes.message));
      case "data":
        _token = actionRes.token;
        break;
      default:
        return "signIn.auth.unknow_error";
    }

    toast.success("signInForm.onSubmit.success");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
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
                <Input placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-4">
          Login
        </Button>
        <FormMessage />
      </form>
    </Form>
  );
}
