"use client";
import { Bell, Compass, MapPin, Settings } from "lucide-react";
import { motion } from "framer-motion";
import React, { useState } from "react";
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
    <nav className="bg-[#08040b] text-white w-full h-full py-4 border-b-gray-600 border-b-2 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="logo flex items-center gap-2">
          <Compass size={30} className={`${isLogoLoading && "animate-spin"}`} />
          <Link href={"#"} className="text-2xl font-bold select-none">
          JobAlgorithma
          </Link>
        </div>
        {status === "authenticated" && (
          <div className="navigation flex items-center gap-9 text-sm">
            <Link href="/">Find Job</Link>
            <Link href="/">Messages</Link>
            <Link href="/">Hiring</Link>
            <Link href="/">Community</Link>
            <Link href="/">FAQ</Link>
          </div>
        )}
        <div className="flex items-center gap-20">
          {/* <div className="location flex items-center gap-0.5">
            <MapPin size={18} />
            <span>India</span>
          </div> */}
          <div className="settings flex items-center gap-2">
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
                  <Settings size={18} className="" />
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
            {
              status === "authenticated" && (
              <Bell size={18} className="" />
              )
            }
          </div>
        </div>
      </div>
    </nav>
  );
}
