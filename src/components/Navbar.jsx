"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@heroui/react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { PiBriefcaseBold } from "react-icons/pi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {
      label: "Browse Jobs",
      href: "/jobs",
    },
    {
      label: "Companies",
      href: "/companies",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0D1117]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white">
            <PiBriefcaseBold size={20} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">HireLoop</h2>
            <p className="text-xs text-gray-400">Smart Hiring</p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center rounded-2xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-xl">
          <nav className="hidden items-center gap-8  lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-gray-300 transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          {/* Separator */}
          <div className="mx-3 h-5 w-px bg-white/20" />

          {/* Desktop Actions */}
          <div className="hidden items-center gap-5 lg:flex ml-4">
            <Link
              href="/login"
              className="font-medium text-violet-400 hover:text-violet-300"
            >
              Sign In
            </Link>

            <Button
              href="/register"
              className="bg-white font-semibold text-black"
            >
              Get Started
            </Button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white lg:hidden"
        >
          {isOpen ? <IoClose size={28} /> : <HiOutlineMenuAlt3 size={28} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="border-t border-white/10 bg-[#0D1117] lg:hidden">
          <div className="space-y-4 p-5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-gray-300 transition hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <div className="flex flex-col gap-3 pt-3">
              <Link
                href="/login"
                className="font-medium text-violet-400 hover:text-violet-300"
              >
                Sign In
              </Link>

              <Button href="/register" color="primary">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
