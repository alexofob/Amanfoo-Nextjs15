import { type Metadata } from "next";
import Image from "next/image";

import Icons from "@/components/shared/icons";
import amanfooLogo from "@/public/amanfoo-logo.jpg";

import SigninForm from "./signin-form";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your account",
};

export default function SigninPage() {
  return (
    <div className="container z-10">
      <Image
        alt="Prempeh College logo"
        src={amanfooLogo}
        width={160}
        height={160}
        className="mx-auto mb-8"
        priority
      />
      <h1 className="mb-6 text-center text-3xl font-bold tracking-tight">Amanfoo</h1>
      <div className="mx-auto flex w-full flex-col justify-center space-y-10 sm:w-[350px]">
        <div className="flex flex-col text-center">
          <div className="text-center">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent">
              <Icons.security className="h-8 w-8 text-accent-foreground" />
            </span>
          </div>

          <h2 className="my-2 text-2xl font-semibold tracking-tight">Welcome back, senior</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Enter your email to sign in to your account
          </p>
          <SigninForm />
        </div>
      </div>
    </div>
  );
}
