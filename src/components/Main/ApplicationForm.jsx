"use client";

import { useState } from "react";

import {
  Form,
  TextField,
  TextArea,
  Label,
  Input,
  Button,
  Description,
  FieldError,
} from "@heroui/react";
import { createApplication } from "@/lib/actions/applications";

export default function ApplicationForm({ job, user }) {
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const applicationData = {
      jobId: job._id,
      jobTitle: job.title,
      companyName: job.companyName,
      companyId: job.companyId,
      applicantId: user.id,
      ...Object.fromEntries(formData.entries()),
    };

    try {
      setPending(true);
      const result = await createApplication(applicationData);
      console.log(result);
    } catch (error) {
      console.error(error);
    } finally {
      setPending(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Apply for {job.title}</h1>

        <p className="mt-2 text-default-500">
          Fill out the application form below.
        </p>
      </div>
      <Form
        className="flex flex-col gap-5 p-10 border border-white/10 rounded-2xl shadow-2xl"
        onSubmit={handleSubmit}
      >
        {/* form field */}
        <div className="grid md:grid-cols-2 gap-5">
          {/* left */}
          <div className="space-y-5">
            {/* Name */}
            <TextField
              isRequired
              name="applicantName"
              defaultValue={user?.name}
            >
              <Label>Full Name</Label>

              <Input placeholder="John Doe" />

              <FieldError />
            </TextField>
            {/* Email */}
            <TextField
              isRequired
              type="email"
              name="applicantEmail"
              defaultValue={user?.email}
            >
              <Label>Email</Label>

              <Input placeholder="john@example.com" />

              <FieldError />
            </TextField>

            {/* Phone */}

            <TextField
              isRequired
              name="applicantPhone"
              validate={(value) => {
                if (value.length < 11) {
                  return "Enter valid phone number";
                }

                return null;
              }}
            >
              <Label>Phone Number</Label>

              <Input placeholder="017xxxxxxxx" />

              <FieldError />
            </TextField>
          </div>
          {/* right */}
          <div className="space-y-5">
            {/* Portfolio */}
            <TextField name="portfolio" type="url">
              <Label>Portfolio / GitHub</Label>

              <Input placeholder="https://github.com/username" />

              <FieldError />
            </TextField>

            {/* Resume URL */}

            <TextField isRequired name="resume">
              <Label>Resume URL</Label>

              <Input placeholder="https://..." />

              <Description>
                Upload your CV and provide the public link.
              </Description>

              <FieldError />
            </TextField>
          </div>
        </div>

        {/* message and button */}
        <div className="space-y-5">
          <TextField isRequired name="coverLetter">
            <Label>Cover Letter</Label>

            <TextArea
              placeholder="Tell recruiter why you're a good fit..."
              rows={6}
            />

            <Description>Briefly introduce yourself.</Description>

            <FieldError />
          </TextField>

          <div className="flex gap-3">
            <Button
              color="primary"
              type="submit"
              isDisabled={pending}
              isPending={pending}
            >
              Submit Application
            </Button>

            <Button type="reset" variant="bordered">
              Reset
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
