"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import ROUTES from "@/constants/routes";
import { signIn } from "next-auth/react";

const SocialAuthForm = () => {
  const buttonClass =
    "background-dark400_light900 body-medium text-dark200_light800 rounded-2 min-h-12 flex-1 px-4 py-3";

  const handleSignIn = async (provider: "github" | "google") => {
    try {
      await signIn(provider, {
        callbackUrl: ROUTES.HOME,
        redirect: true,
      });
    } catch (error) {
      console.error("Error signing in with provider:", provider, error);
      toast.error("Sign-in failed", {
        description: error instanceof Error ? error.message : "An error occurred during sign in",
      });
    }
  };
  return (
    <div className="mt-10 flex flex-wrap gap-2.5">
      <Button className={buttonClass} onClick={() => handleSignIn("github")}>
        <Image
          src="/icons/github.svg"
          width={20}
          height={20}
          alt="Github Logo"
          className="invert-colors mr-2.5 object-contain"
        />
        <span>Log in with Github</span>
      </Button>
      <Button className={buttonClass} onClick={() => handleSignIn("google")}>
        <Image
          src="/icons/google.svg"
          width={20}
          height={20}
          alt="Goggle Logo"
          className="invert-colors mr-2.5 object-contain"
        />
        <span>Log in with Google</span>
      </Button>
    </div>
  );
};
export default SocialAuthForm;
