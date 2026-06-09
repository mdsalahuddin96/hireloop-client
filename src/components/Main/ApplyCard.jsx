"use client";

import { useSession } from "@/lib/auth-client";
import { Button, TextField, Label, InputGroup } from "@heroui/react";
import Link from "next/link";

import { useState } from "react";

export default function ApplyCard({job}) {
  const { data } = useSession();
  const user = data?.user;
  const [loading, setLoading] = useState(false);

  const handleApply = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      alert("Application Submitted");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sticky top-24 rounded-2xl border p-6">
      <h3 className="mb-6 text-xl font-semibold">Apply Now</h3>

      <form onSubmit={handleApply} className="space-y-4">
        <TextField isReadOnly defaultValue={user?.name}>
          <Label>Name</Label>

          <InputGroup>
            <InputGroup.Input />
          </InputGroup>
        </TextField>

        <TextField isReadOnly defaultValue={user?.email}>
          <Label>Email</Label>

          <InputGroup>
            <InputGroup.Input />
          </InputGroup>
        </TextField>

        <TextField name="applyDate" isRequired>
          <Label>Apply Date</Label>

          <InputGroup>
            <InputGroup.Input type="date" />
          </InputGroup>
        </TextField>
        <Link href={`/jobs/apply?redirect=/jobs/${job._id}`}>
          <Button color="primary" className="w-full">
            {loading ? "Applying..." : "Apply Job"}
          </Button>
        </Link>
      </form>

      {/* <p className="mt-4 text-xs text-default-500">
        Login and active seeker plan
        required to apply.
      </p> */}
    </div>
  );
}
