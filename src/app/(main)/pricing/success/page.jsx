import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";
import { createSubscription } from "@/lib/actions/subscription";
import { metadata } from "@/app/layout";
import { email } from "better-auth";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Please provide a valid session_id");
  }

  const {
    status,
    customer_details: { email: customerEmail },
    metadata
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    redirect("/");
  }

  if (status === "complete") {
    const subscriptionInfo = {
      planId: metadata.planId,
      email: customerEmail,
    };
    const result = await createSubscription(subscriptionInfo);
    console.log(result);
    return (
      <div className="container mx-auto flex min-h-[80vh] items-center justify-center px-4 py-10">
        <div className="w-full max-w-2xl rounded-3xl border border-green-500/20 bg-content1 p-8 text-center shadow-xl md:p-12">
          {/* Success Icon */}
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-green-500/10 p-5">
              <FaCheckCircle className="text-6xl text-green-500" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold md:text-4xl">
            Payment Successful 🎉
          </h1>

          <p className="mt-4 text-default-500">
            Thank you for upgrading your HireLoop subscription.
          </p>

          {/* Email */}
          <div className="mt-8 rounded-2xl border bg-content2 p-5">
            <p className="text-sm text-default-500">
              Confirmation Email Sent To
            </p>

            <p className="mt-2 break-all text-lg font-semibold">
              {customerEmail}
            </p>
          </div>

          {/* Message */}
          <div className="mt-8 space-y-3 text-default-600">
            <p>Your subscription has been activated successfully.</p>

            <p>
              You can now access all premium features included in your plan.
            </p>
          </div>

          {/* Actions */}
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-medium text-white transition hover:opacity-90"
            >
              Go to Dashboard
              <FaArrowRight />
            </Link>

            <Link
              href="/jobs"
              className="inline-flex items-center justify-center rounded-xl border px-6 py-3 font-medium transition hover:bg-content2"
            >
              Browse Jobs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
