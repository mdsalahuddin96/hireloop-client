"use client";

import { Input, Button, Chip, InputGroup } from "@heroui/react";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { PiBriefcaseBold } from "react-icons/pi";
import { FiUsers } from "react-icons/fi";
import { LuBuilding2 } from "react-icons/lu";
import { AiOutlineStar } from "react-icons/ai";
import globe from "../../public/images/globe.png";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen bg-[url('../../public/images/globe.png')] bg-center bg-cover bg-no-repeat pb-20">
      <div className="container mx-auto px-4">
        {/* Hero Content */}
        <div className="mx-auto flex max-w-5xl flex-col items-center pt-20 text-center md:pt-35">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-gray-300 backdrop-blur-xl">
            <span>💼</span>
            <span className="font-semibold text-white">50,000+</span>
            <span>NEW JOBS THIS MONTH</span>
          </div>
          {/* Title and description */}
          <div>
            <h1 className="max-w-4xl text-3xl font-bold leading-tight text-white md:text-5xl">
              Find Your Dream Job Today
            </h1>
            <p className="mt-6 max-w-2xl text-gray-400">
              HireLoop connects top talent with world-class companies. Browse
              thousands of curated opportunities and land your next role faster.
            </p>
          </div>

          {/* Search Box */}
          <div className="mt-12 w-full max-w-xl rounded-2xl border border-white/10 bg-[#0d1117]/80 p-2 backdrop-blur-xl">
            <div className="flex justify-center items-center flex-col gap-2 md:flex-row">
              <InputGroup>
                <InputGroup.Prefix>
                  <IoSearchOutline className="text-gray-400" />
                </InputGroup.Prefix>
                <InputGroup.Input
                  placeholder="Job title, skill or company"
                  variant="bordered"

                />
              </InputGroup>
              <div className="hidden md:block w-px h-6 bg-gray-600"></div>
              <InputGroup>
                <InputGroup.Prefix>
                  <HiOutlineLocationMarker className="text-gray-400" />
                </InputGroup.Prefix>
                <InputGroup.Input
                  placeholder="Location or Remote"
                  variant="bordered"
                
                />
              </InputGroup>

              <Button  className="rounded-xl bg-[#5C53FE]">
                <IoSearchOutline size={22} />
              </Button>
            </div>
          </div>

          {/* Trending */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm">
            <span className="text-gray-500">Trending Position</span>

            <Chip variant="flat" className="bg-white/5 text-gray-300">
              Product Designer
            </Chip>

            <Chip variant="flat" className="bg-white/5 text-gray-300">
              AI Engineering
            </Chip>

            <Chip variant="flat" className="bg-white/5 text-gray-300">
              DevOps Engineer
            </Chip>
          </div>
        </div>

        {/* Globe Section */}
        <div className="mt-72 flex flex-col">
          {/* Center Text */}
          <div className="z-20 text-center">
            <h3 className="text-3xl font-semibold text-white">
              Assisting over 15,000 job seekers
            </h3>
            <p className="mt-2 text-2xl text-gray-300">
              find their dream positions.
            </p>
          </div>
          {/* Stats */}
          <div className=" z-20 mt-20 grid gap-4 md:grid-cols-4">
            <StatCard
              icon={<PiBriefcaseBold />}
              value="50K"
              label="Active Jobs"
            />

            <StatCard icon={<LuBuilding2 />} value="12K" label="Companies" />

            <StatCard icon={<FiUsers />} value="2M" label="Job Seekers" />

            <StatCard
              icon={<AiOutlineStar />}
              value="97%"
              label="Satisfaction Rate"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ icon, value, label }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="mb-8 text-xl text-white">{icon}</div>

      <h3 className="text-5xl font-bold text-white">{value}</h3>

      <p className="mt-2 text-sm text-gray-400">{label}</p>
    </div>
  );
}
