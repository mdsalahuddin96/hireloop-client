"use client";

import { useState } from "react";
import Link from "next/link";

import {
  Form,
  Fieldset,
  FieldGroup,
  TextField,
  Label,
  FieldError,
  Description,
  Button,
  InputGroup,
} from "@heroui/react";

import { MdEmail } from "react-icons/md";

import {
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { FcGoogle } from "react-icons/fc";
import { ImSpinner8 } from "react-icons/im";
import { authClient } from "@/lib/auth-client";

export default function SigninPage() {
  const [pending, setPending] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const handleSignin = async (e) => {
    e.preventDefault();

    setMessage({
      type: "",
      text: "",
    });

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      setPending(true);
      const {data,error} = await authClient.signIn.email({
          email,
          password,
          callbackURL:'/'
        });

      if (error) {
        setMessage({
          type: "error",
          text:result.error.message ||"Invalid email or password",
        });
        return;
      }

      setMessage({
        type: "success",
        text: "Login successful!",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error?.message ||
          "Failed to sign in",
      });
    } finally {
      setPending(false);
    }
  };

//   const handleGoogleLogin = async () => {
//     try {
//       await authClient.signIn.social({
//         provider: "google",
//       });
//     } catch (error) {
//       setMessage({
//         type: "error",
//         text:
//           error?.message ||
//           "Google login failed",
//       });
//     }
//   };

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        {/* Header */}

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">
            Welcome Back
          </h1>

          <p className="mt-2 text-gray-400">
            Sign in to your HireLoop account.
          </p>
        </div>

        <Form
          className="w-full"
          onSubmit={handleSignin}
        >
          <Fieldset className="w-full">
            <FieldGroup>
              {/* Email */}

              <TextField
                isRequired
                name="email"
                type="email"
              >
                <Label>Email</Label>

                <InputGroup>
                  <InputGroup.Prefix>
                    <MdEmail size={18} />
                  </InputGroup.Prefix>

                  <InputGroup.Input placeholder="john@example.com" />

                  <InputGroup.Suffix />
                </InputGroup>

                <FieldError />
              </TextField>

              {/* Password */}

              <TextField
                isRequired
                name="password"
                validate={(value) => {
                  if (value.length < 8) {
                    return "Password must be at least 8 characters";
                  }

                  return null;
                }}
              >
                <Label>Password</Label>

                <InputGroup>
                  <InputGroup.Prefix>
                    <FaLock size={18} />
                  </InputGroup.Prefix>

                  <InputGroup.Input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="********"
                  />

                  <InputGroup.Suffix>
                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                    >
                      {showPassword ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )}
                    </button>
                  </InputGroup.Suffix>
                </InputGroup>

                <Description>
                  Enter your password
                </Description>

                <FieldError />
              </TextField>
            </FieldGroup>

            {/* Message */}

            {message.text && (
              <div
                className={`mt-4 rounded-xl p-3 text-sm ${
                  message.type ===
                  "success"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {message.text}
              </div>
            )}

            {/* Submit */}

            <Fieldset.Actions className="mt-6 w-full">
              <Button
                type="submit"
                className="w-full bg-[#5C53FE]"
                isDisabled={pending}
              >
                {pending ? (
                  <>
                    <ImSpinner8 className="animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </Fieldset.Actions>
          </Fieldset>
        </Form>

        {/* Divider */}

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-gray-500">
            OR
          </span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* Google Login */}

        <Button
          variant="bordered"
          className="w-full"
        //   onPress={handleGoogleLogin}
          isDisabled={pending}
        >
          <FcGoogle size={20} />
          Continue with Google
        </Button>

        {/* Footer Links */}

        <div className="mt-6 text-center">
          <Link
            href="/forgot-password"
            className="text-sm text-[#5C53FE] hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <p className="mt-4 text-center text-sm text-gray-400">
          Don&apost have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-[#5C53FE]"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
}