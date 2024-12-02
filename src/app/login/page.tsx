"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Loader2, User, Lock, FolderPen } from "lucide-react";
import useLogoLoadingStore from "@/stores/logoLoading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AuthForm() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { setIsLoadingLogo } = useLogoLoadingStore();
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement> | string, name?: string) => {
      if (typeof e === "string" && name) {
        // Handle Select component
        setFormData((prev) => ({ ...prev, [name]: e }));
      } else {
        // Handle Input component
        const { name: inputName, value } = e.target as HTMLInputElement;
        setFormData((prev) => ({ ...prev, [inputName]: value }));
      }
      if (error) setError("");
    },
    [error]
  );

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setIsLoadingLogo(true);
    setError("");
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          name: formData.name,
          password: formData.password,
          role: (formData.role).toUpperCase(),
        }),
      });

      const data = await response.json();
      console.log("data", data);

      if (!response.ok) {
        setError(data.error || "Something went wrong");
        console.error("error", data);
        return;
      }
      formData.username = "";
      formData.name = "";
      formData.password = "";
      formData.confirmPassword = "";
      setIsLogin(true);
    } catch (err) {
      formData.password = "";
      formData.confirmPassword = "";
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
      setIsLoadingLogo(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLogin) {
      await handleRegister(e);
      return;
    }

    setIsLoading(true);
    setIsLoadingLogo(true);
    setError("");
    try {
      const result = await signIn("credentials", {
        redirect: false,
        callbackUrl: "/",
        username: formData.username,
        password: formData.password,
      });

      if (!result?.ok) {
        setError("Authentication failed");
      }
      formData.username = "";
      formData.password = "";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      formData.password = "";
    } finally {
      setIsLoading(false);
      setIsLoadingLogo(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-66px)] items-center justify-center bg-[#08040b] p-4">
      <div className="w-full max-w-md rounded-2xl bg-gray-800/30 backdrop-blur-xl">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-white">
              {isLogin ? "Welcome back" : "Create account"}
            </h1>
            <p className="text-sm text-gray-400">
              {isLogin
                ? "Enter your credentials to access your account"
                : "Enter your details to create your account"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-300">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={handleInputChange}
                    className="border-gray-700 bg-gray-800/50 pl-10 text-white placeholder:text-gray-500 focus:border-gray-500 focus:ring-gray-500"
                    placeholder="exampleuser"
                  />
                </div>
              </div>

              {/* Full Name */}
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-300">
                    Full Name
                  </Label>
                  <div className="relative">
                    <FolderPen className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="border-gray-700 bg-gray-800/50 pl-10 text-white placeholder:text-gray-500 focus:border-gray-500 focus:ring-gray-500"
                      placeholder="Enter Your Name"
                    />
                  </div>
                </div>
              )}

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="border-gray-700 bg-gray-800/50 pl-10 text-white placeholder:text-gray-500 focus:border-gray-500 focus:ring-gray-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-300">
                    Are you a
                  </Label>
                  <Select
                    onValueChange={(value) => handleInputChange(value, "role")}
                  >
                    <SelectTrigger className="w-full border-gray-700 bg-gray-800/50 pl-10 text-white placeholder:text-gray-500 focus:border-gray-500 focus:ring-gray-500">
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="recruiter">Recruiter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Confirm Password */}
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-300">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="border-gray-700 bg-gray-800/50 pl-10 text-white placeholder:text-gray-500 focus:border-gray-500 focus:ring-gray-500"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-md bg-gray-800/50 p-3 text-sm text-red-500">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className={cn(
                "relative w-full bg-white text-black hover:bg-gray-100",
                isLoading && "cursor-not-allowed opacity-70"
              )}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <ArrowRight className="mr-2 h-4 w-4" />
              )}
              {isLogin ? "Sign in" : "Create account"}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin((prev) => !prev)}
              className="text-sm text-gray-400 hover:text-white"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
