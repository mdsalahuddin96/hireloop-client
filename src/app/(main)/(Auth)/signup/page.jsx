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
  Radio,
  RadioGroup,
} from "@heroui/react";

import { FaUser, FaLock, FaEye, FaEyeSlash, FaImage } from "react-icons/fa";

import { MdEmail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { ImSpinner8 } from "react-icons/im";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const searchParams=useSearchParams();
  const redirectTo=searchParams.get("callbackURL")
  const [pending, setPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());
    const { name, email, image, password, confirmPassword, role } = userData;
    const plan= role==="seeker"?"seeker_free":"recruiter_free";
    setMessage({ type: "", text: "" });

    if (password !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" });
      return;
    }

    const { data, error } = await authClient.signUp.email(
      {
        email,
        password,
        name,
        image: image || undefined,
        role,
        plan
      },
      {
        onRequest: () => {
          setPending(true);
        },
        onSuccess: (ctx) => {
          setPending(false);
          setMessage({
            type: "success",
            text: "Account created successfully!",
          });
          e.target.reset();
          router.push(redirectTo?`/signin?callbackURL=${redirectTo}`:"/signin");
        },
      },
    );
    if(error){
      console.log(error.message)
    }
    setPending(false)
  };

  // const handleGoogleLogin = async () => {
  //   try {
  //     /*
  //     await authClient.signIn.social({
  //       provider: "google",
  //     });
  //     */
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">Create Account</h1>

          <p className="mt-2 text-gray-400">
            Join HireLoop and start your journey.
          </p>
        </div>

        <Form className="w-full" onSubmit={handleSignup}>
          <Fieldset className="w-full">
            <FieldGroup>
              {/* Name */}

              <TextField
                isRequired
                name="name"
                validate={(value) => {
                  if (value.length < 3) {
                    return "Name must be at least 3 characters";
                  }
                  return null;
                }}
              >
                <Label>Name</Label>

                <InputGroup>
                  <InputGroup.Prefix>
                    <FaUser size={18} />
                  </InputGroup.Prefix>

                  <InputGroup.Input placeholder="John Doe" />

                  <InputGroup.Suffix />
                </InputGroup>

                <FieldError />
              </TextField>

              {/* Email */}

              <TextField isRequired name="email" type="email">
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

              {/* Image */}

              <TextField name="image">
                <Label>Profile Image URL</Label>

                <InputGroup>
                  <InputGroup.Prefix>
                    <FaImage size={18} />
                  </InputGroup.Prefix>

                  <InputGroup.Input placeholder="https://example.com/profile.jpg" />

                  <InputGroup.Suffix />
                </InputGroup>

                <Description>Optional</Description>

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
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                  />

                  <InputGroup.Suffix>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </InputGroup.Suffix>
                </InputGroup>

                <Description>Minimum 8 characters</Description>

                <FieldError />
              </TextField>

              {/* Confirm Password */}

              <TextField isRequired name="confirmPassword">
                <Label>Confirm Password</Label>

                <InputGroup>
                  <InputGroup.Prefix>
                    <FaLock size={18} />
                  </InputGroup.Prefix>

                  <InputGroup.Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="********"
                  />

                  <InputGroup.Suffix>
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </InputGroup.Suffix>
                </InputGroup>

                <FieldError />
              </TextField>
              <div className="flex flex-col gap-4">
                <Label>Role</Label>
                <RadioGroup
                  defaultValue="seeker"
                  name="role"
                  orientation="horizontal"
                >
                  <Radio value="seeker">
                    <Radio.Control>
                      <Radio.Indicator />
                    </Radio.Control>
                    <Radio.Content>
                      <Label>Job Seeker</Label>
                    </Radio.Content>
                  </Radio>
                  <Radio value="recruiter">
                    <Radio.Control>
                      <Radio.Indicator />
                    </Radio.Control>
                    <Radio.Content>
                      <Label>Recruiter </Label>
                    </Radio.Content>
                  </Radio>
                </RadioGroup>
              </div>
            </FieldGroup>

            {message.text && (
              <div
                className={`mt-4 rounded-xl p-3 text-sm ${
                  message.type === "success"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {message.text}
              </div>
            )}

            <Fieldset.Actions className="mt-6 w-full">
              <Button
                type="submit"
                className="w-full bg-[#5C53FE]"
                isDisabled={pending}
              >
                {pending ? (
                  <>
                    <ImSpinner8 className="animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </Fieldset.Actions>
          </Fieldset>
        </Form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-gray-500">OR</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <Button
          variant="bordered"
          className="w-full"
          // onPress={handleGoogleLogin}
        >
          <FcGoogle size={20} />
          Continue with Google
        </Button>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link href={redirectTo?`/signin?callbackURL=${redirectTo}`:"/signin"} className="font-medium text-[#5C53FE]">
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
}
