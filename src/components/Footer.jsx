"use client";

import Link from "next/link";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { PiBriefcaseBold } from "react-icons/pi";
import { BsTwitterX } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="container mx-auto px-4 py-16">
        {/* Top Section */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white">
                <PiBriefcaseBold size={20} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-white">
                  HireLoop
                </h2>
                <p className="text-xs text-gray-400">
                  Smart Hiring Platform
                </p>
              </div>
            </Link>

            <p className="mt-6 max-w-xs text-sm leading-7 text-gray-400">
              Connecting talented professionals with
              world-class companies through a seamless
              and modern hiring experience.
            </p>

            {/* Social Links */}
            <div className="mt-8 flex gap-3">
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-gray-300 transition hover:bg-[#5C53FE] hover:text-white"
              >
                <FaFacebookF />
              </Link>

              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-gray-300 transition hover:bg-[#5C53FE] hover:text-white"
              >
                <BsTwitterX />
              </Link>

              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-gray-300 transition hover:bg-[#5C53FE] hover:text-white"
              >
                <FaLinkedinIn />
              </Link>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-5 font-semibold text-[#5C53FE]">
              Product
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  href="/jobs"
                  className="text-gray-400 transition hover:text-white"
                >
                  Browse Jobs
                </Link>
              </li>

              <li>
                <Link
                  href="/companies"
                  className="text-gray-400 transition hover:text-white"
                >
                  Companies
                </Link>
              </li>

              <li>
                <Link
                  href="/pricing"
                  className="text-gray-400 transition hover:text-white"
                >
                  Pricing
                </Link>
              </li>

            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-5 font-semibold text-[#5C53FE]">
              Navigation
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 transition hover:text-white"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 transition hover:text-white"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  href="/faq"
                  className="text-gray-400 transition hover:text-white"
                >
                  Help Center
                </Link>
              </li>

              <li>
                <Link
                  href="/blog"
                  className="text-gray-400 transition hover:text-white"
                >
                  Career Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-5 font-semibold text-[#5C53FE]">
              Resources
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  href="/guidelines"
                  className="text-gray-400 transition hover:text-white"
                >
                  Community Guidelines
                </Link>
              </li>

              <li>
                <Link
                  href="/success-stories"
                  className="text-gray-400 transition hover:text-white"
                >
                  Success Stories
                </Link>
              </li>

              <li>
                <Link
                  href="/newsroom"
                  className="text-gray-400 transition hover:text-white"
                >
                  Newsroom
                </Link>
              </li>

              <li>
                <Link
                  href="/careers"
                  className="text-gray-400 transition hover:text-white"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-gray-500 md:flex-row">
          <p>
            © {new Date().getFullYear()} HireLoop. All rights
            reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/terms"
              className="hover:text-white"
            >
              Terms & Conditions
            </Link>

            <Link
              href="/privacy"
              className="hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              href="/cookies"
              className="hover:text-white"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}