"use client";
import { Bell, Compass, Settings } from "lucide-react";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import userImage from "@/assets/user.png";
import { signOut, useSession } from "next-auth/react";
import useLogoLoadingStore from "@/stores/logoLoading";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const { isLogoLoading, setIsLoadingLogo } = useLogoLoadingStore();
  const { status } = useSession();

  const handleLogoutHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoadingLogo(true);
    setTimeout(() => {
      setIsLoadingLogo(false);
    }, 2000);
    signOut({ callbackUrl: "/login" });
  };

  return (
    <nav className="bg-[#08040b] text-white w-full py-4 border-b-gray-600 border-b-2 sticky top-0 z-50">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        {/* Logo Section */}
        <div className="logo flex items-center gap-2">
          <Compass size={30} className={`${isLogoLoading && "animate-spin"}`} />
          <Link href={"#"} className="text-2xl font-bold select-none">
            JobAlgorithma
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="md:flex flex-wrap items-center hidden justify-center gap-4 md:gap-9 text-lg mt-4 md:mt-0">
          {status === "authenticated" && (
            <>
              <Link href="/" className="block">
                Find Job
              </Link>
              <Link href="/" className="block">
                Messages
              </Link>
              <Link href="/" className="block">
                Hiring
              </Link>
              <Link href="/" className="block">
                Community
              </Link>
              <Link href="/" className="block">
                FAQ
              </Link>
            </>
          )}
        </div>

        {/* Profile and Settings */}
        <div className="flex items-center gap-6 mt-4 md:mt-0">
          {status === "authenticated" && (
            <Image
              src={userImage}
              alt="user"
              width={40}
              height={40}
              className="rounded-full"
            />
          )}
          {status === "authenticated" && (
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <Settings size={30} className="cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black text-white border-none z-50 font-medium">
                <DropdownMenuLabel className="cursor-pointer">
                  Settings
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={handleLogoutHandler}
                >
                  Logout
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Coming Soon
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
}
