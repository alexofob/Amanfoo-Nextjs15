import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { signIn as _signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { emailSchema, type Email } from "@/domain/models/senior";

export function useSignIn() {
  const form = useForm<Email>({
    resolver: valibotResolver(emailSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
    },
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();

  async function signIn(data: Email) {
    setIsLoading(true);

    const signInResult = await _signIn("email", {
      email: data.email.toLowerCase(),
      redirect: false,
      callbackUrl: searchParams?.get("redirect_url") || "/",
    });

    setIsLoading(false);

    if (signInResult?.error) {
      return toast.error("Sign in failed.", {
        description: "Your sign in request failed. Please try again or contact the Administrator.",
      });
    }

    return toast.success(
      "Check your email, We sent you a login link. Be sure to check your spam too."
    );
  }

  return {
    form,
    isLoading,
    signIn,
  };
}
