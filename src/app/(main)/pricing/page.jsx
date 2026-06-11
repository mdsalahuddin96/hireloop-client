"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { FaCheck, FaRocket, FaBuilding } from "react-icons/fa";

const seekerPlans = [
  {
    name: "Free",
    id:'seeker_free',
    price: "$0",
    period: "/ forever",
    popular: false,
    features: [
      "Browse jobs",
      "Apply up to 5 jobs",
      "Basic profile",
      "Email notifications",
    ],
  },
  {
    name: "Pro",
    id:'seeker_pro',
    price: "$29",
    period: "/ month",
    popular: true,
    features: [
      "Unlimited applications",
      "Unlimited saved jobs",
      "Priority applications",
      "Application tracking",
      "Salary insights",
    ],
  },
  {
    name: "Enterprise",
    id:'seeker_enterprise',
    price: "$99",
    period: "/ month",
    popular: false,
    features: [
      "Everything in Pro",
      "Dedicated support",
      "Advanced analytics",
      "Custom branding",
    ],
  },
];

const recruiterPlans = [
  {
    name: "Free",
    id:'recruiter_free',
    price: "$0",
    period: "/ month",
    popular: false,
    features: [
      "3 active job posts",
      "Basic applicant tracking",
      "Email support",
    ],
  },
  {
    name: "Growth",
    id:'recruiter_growth',
    price: "$79",
    period: "/ month",
    popular: true,
    features: [
      "Unlimited job posts",
      "Applicant tracking",
      "Team collaboration",
      "Analytics dashboard",
    ],
  },
  {
    name: "Enterprise",
    id:'recruiter_enterprise',
    price: "$199",
    period: "/ month",
    popular: false,
    features: [
      "Everything in Growth",
      "Dedicated support",
      "ATS integration",
      "Custom branding",
    ],
  },
];

export default function PricingPage() {
  const [type, setType] = useState("seeker");

  const plans = type === "seeker" ? seekerPlans : recruiterPlans;

  return (
    <section className="container mx-auto px-4 py-20">
      {/* Header */}

      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold md:text-6xl">Simple Pricing</h1>

        <p className="mt-5 text-default-500">
          Flexible plans for job seekers and recruiters.
        </p>
      </div>

      {/* Toggle */}

      <div className="mt-10 flex justify-center">
        <div className="inline-flex rounded-2xl border p-1">
          <button
            onClick={() => setType("seeker")}
            className={`rounded-xl px-6 py-3 text-sm font-medium transition ${
              type === "seeker" ? "bg-cyan-500 text-white" : ""
            }`}
          >
            <div className="flex items-center gap-2">
              <FaRocket />
              Seeker
            </div>
          </button>

          <button
            onClick={() => setType("recruiter")}
            className={`rounded-xl px-6 py-3 text-sm font-medium transition ${
              type === "recruiter" ? "bg-cyan-500 text-white" : ""
            }`}
          >
            <div className="flex items-center gap-2">
              <FaBuilding />
              Recruiter
            </div>
          </button>
        </div>
      </div>

      {/* Cards */}

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-3xl border p-8 ${
              plan.popular ? "border-primary shadow-lg shadow-primary/20" : ""
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-xs font-medium text-white">
                Most Popular
              </div>
            )}

            <h3 className="text-2xl font-bold">{plan.name}</h3>

            <div className="mt-5">
              <span className="text-5xl font-bold">{plan.price}</span>

              <span className="text-default-500">{plan.period}</span>
            </div>

            <ul className="mt-8 space-y-4">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <FaCheck className="text-success" />

                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <form action="/api/checkout_sessions" method="POST">
            <input type="hidden" name="plan_id" value={plan.id}/>
              <section>
                <Button
                  type="submit"
                  role="link"
                  variant={plan.popular?"primary":"outline"}
                  className={`mt-10 w-full `}
                >
                  Get Started
                </Button>
              </section>
            </form>
          </div>
        ))}
      </div>
    </section>
  );
}
