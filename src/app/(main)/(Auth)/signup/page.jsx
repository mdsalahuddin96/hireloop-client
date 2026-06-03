"use client";

import { useState } from "react";
import { Input, Button, Link, Card } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { LuUser, LuMail, LuLock, LuImage } from "react-icons/lu";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
// Import your Better Auth client instance wrapper
// import { authClient } from "@/lib/auth-client"; 
// import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  
  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
    confirmPassword: "",
  });

  // UI States
  const [errors, setErrors] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState({ type: "", text: "" });

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  // Client-side validation logic
  const validateForm = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Invalid email address";
    }

    if (formData.image && !/^https?:\/\/.+/.test(formData.image)) {
      tempErrors.image = "Please enter a valid image URL (optional)";
    }

    if (!formData.password) {
      tempErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      tempErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Email/Password Credentials Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setServerMessage({ type: "", text: "" });

    if (!validateForm()) return;

    setIsLoading(true);

    const { email, password, name, image } = formData;

    await authClient.signUp.email({
      email,
      password,
      name,
      image: image || undefined, // send undefined if empty so Better Auth ignores it
      callbackURL: "/", // Change to your desired post-login route
      onRequest: () => {
        setIsLoading(true);
      },
      onSuccess: () => {
        setIsLoading(false);
        setServerMessage({ type: "success", text: "Account created successfully! Redirecting..." });
        setTimeout(() => router.push("/dashboard"), 1500);
      },
      onError: (ctx) => {
        setIsLoading(false);
        setServerMessage({ 
          type: "error", 
          text: ctx.error.message || "Something went wrong. Please try again." 
        });
      },
    });
  };

  // Google Social Sign-in
  const handleGoogleLogin = async () => {
    setServerMessage({ type: "", text: "" });
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard", 
    });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0d1117] px-4 py-12">
      <Card className="w-full max-w-md border border-white/10 bg-[#161b22]/90 backdrop-blur-xl p-2 shadow-2xl">
        <Card.Content className="flex flex-col gap-5">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white">Create your account</h1>
            <p className="mt-2 text-sm text-gray-400">Join HireLoop and find your dream job</p>
          </div>

          {/* Social Login */}
          <Button
            variant="bordered"
            className="w-full border-white/10 text-white hover:bg-white/5 font-medium rounded-xl h-11"
            startContent={<FcGoogle size={20} />}
            onPress={handleGoogleLogin}
          >
            Sign up with Google
          </Button>

          {/* <div className="flex items-center gap-2 my-1">
            <Divider className="flex-1 bg-white/10" />
            <span className="text-xs text-gray-500 uppercase">Or continue with</span>
            <Divider className="flex-1 bg-white/10" />
          </div> */}

          {/* Status Messages */}
          {serverMessage.text && (
            <div
              className={`p-3 rounded-xl text-sm font-medium ${
                serverMessage.type === "success"
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "bg-danger-500/10 text-danger-400 border border-danger-500/20"
              }`}
            >
              {serverMessage.text}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            <Input
              label="Full Name"
              name="name"
              placeholder="John Doe"
              variant="bordered"
              labelPlacement="outside"
              value={formData.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
              errorMessage={errors.name}
              startContent={<LuUser className="text-gray-400" />}
              classNames={{ inputWrapper: "border-white/10 hover:border-white/20" }}
            />

            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="you@example.com"
              variant="bordered"
              labelPlacement="outside"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
              errorMessage={errors.email}
              startContent={<LuMail className="text-gray-400" />}
              classNames={{ inputWrapper: "border-white/10 hover:border-white/20" }}
            />

            <Input
              label="Profile Image URL (Optional)"
              name="image"
              placeholder="https://example.com/avatar.jpg"
              variant="bordered"
              labelPlacement="outside"
              value={formData.image}
              onChange={handleChange}
              isInvalid={!!errors.image}
              errorMessage={errors.image}
              startContent={<LuImage className="text-gray-400" />}
              classNames={{ inputWrapper: "border-white/10 hover:border-white/20" }}
            />

            <Input
              label="Password"
              name="password"
              placeholder="••••••••"
              variant="bordered"
              labelPlacement="outside"
              value={formData.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
              errorMessage={errors.password}
              startContent={<LuLock className="text-gray-400" />}
              classNames={{ inputWrapper: "border-white/10 hover:border-white/20" }}
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <IoEyeOffOutline className="text-xl text-gray-400" />
                  ) : (
                    <IoEyeOutline className="text-xl text-gray-400" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
            />

            <Input
              label="Confirm Password"
              name="confirmPassword"
              placeholder="••••••••"
              variant="bordered"
              labelPlacement="outside"
              value={formData.confirmPassword}
              onChange={handleChange}
              isInvalid={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword}
              startContent={<LuLock className="text-gray-400" />}
              classNames={{ inputWrapper: "border-white/10 hover:border-white/20" }}
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleConfirmVisibility}>
                  {isConfirmVisible ? (
                    <IoEyeOffOutline className="text-xl text-gray-400" />
                  ) : (
                    <IoEyeOutline className="text-xl text-gray-400" />
                  )}
                </button>
              }
              type={isConfirmVisible ? "text" : "password"}
            />

            <Button
              type="submit"
              className="mt-2 bg-[#5C53FE] text-white font-semibold rounded-xl h-11"
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>

          {/* Redirect link */}
          <p className="text-center text-sm text-gray-400 mt-2">
            Already have an account?{" "}
            <Link href="/signin" className="text-[#5C53FE] text-sm font-medium hover:underline">
              Sign In
            </Link>
          </p>
        </Card.Content>
      </Card>
    </main>
  );
}