"use client";

import {
  Form,
  FieldGroup,
  TextField,
  TextArea,
  Label,
  FieldError,
  Select,
  Button,
  Switch,
  ListBox,
  InputGroup,
  toast,
} from "@heroui/react";

import { FaBuilding } from "react-icons/fa";

import { useState } from "react";
import { newJobPost } from "@/lib/actions/jobs";
import { redirect } from "next/navigation";

export default function PostJobForm({company}) {
  const [isRemote, setIsRemote] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const jobData = Object.fromEntries(formData.entries());
    jobData.remote=isRemote;
    jobData.status="active";
    jobData.companyId="company_123"
    const res=await newJobPost(jobData);
    if(res.insertedId){
        toast.success("Job Post Successfully")
       e.target.reset()
        redirect("/dashboard/recruiter")
    }
    
  };

  return (
    <div className="mx-auto max-w-7xl p-4 lg:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Post a New Job</h1>

        <p className="mt-2 text-default-500">
          Create a new opportunity and attract top talent.
        </p>
      </div>

      <Form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* JOB INFO */}

          <section className="rounded-2xl border p-6">
            <h2 className="mb-6 text-xl font-semibold">Job Information</h2>

            <FieldGroup className="grid gap-5 md:grid-cols-2">
              {/* Job Title */}
              <TextField
                isRequired
                name="title"
                validate={(value) => {
                  if (value.length < 3) {
                    return "Job title must be at least 3 characters";
                  }
                  return null;
                }}
              >
                <Label>Job Title</Label>

                <InputGroup>
                  <InputGroup.Input placeholder="Frontend Developer" />
                </InputGroup>

                <FieldError />
              </TextField>

              {/* Category */}
              <Select name="category" placeholder="Select Category">
                <Label>Job Category</Label>

                <Select.Trigger>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>

                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="software-engineering">
                      Software Engineering
                      <ListBox.ItemIndicator />
                    </ListBox.Item>

                    <ListBox.Item id="design">
                      Design
                      <ListBox.ItemIndicator />
                    </ListBox.Item>

                    <ListBox.Item id="marketing">
                      Marketing
                      <ListBox.ItemIndicator />
                    </ListBox.Item>

                    <ListBox.Item id="sales">
                      Sales
                      <ListBox.ItemIndicator />
                    </ListBox.Item>

                    <ListBox.Item id="data-science">
                      Data Science
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>

              {/* Job Type */}
              <Select name="jobType" placeholder="Select Job Type">
                <Label>Job Type</Label>

                <Select.Trigger>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>

                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="full-time">
                      Full-time
                      <ListBox.ItemIndicator />
                    </ListBox.Item>

                    <ListBox.Item id="part-time">
                      Part-time
                      <ListBox.ItemIndicator />
                    </ListBox.Item>

                    <ListBox.Item id="remote">
                      Remote
                      <ListBox.ItemIndicator />
                    </ListBox.Item>

                    <ListBox.Item id="contract">
                      Contract
                      <ListBox.ItemIndicator />
                    </ListBox.Item>

                    <ListBox.Item id="internship">
                      Internship
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>

              {/* Deadline */}
              <TextField isRequired name="deadline">
                <Label>Application Deadline</Label>

                <InputGroup>
                  <InputGroup.Input type="date" />
                </InputGroup>

                <FieldError />
              </TextField>

              {/* Salary Min */}
              <TextField isRequired name="salaryMin">
                <Label>Minimum Salary</Label>

                <InputGroup>
                  <InputGroup.Input type="number" placeholder="500" />
                </InputGroup>

                <FieldError />
              </TextField>

              {/* Salary Max */}
              <TextField isRequired name="salaryMax">
                <Label>Maximum Salary</Label>

                <InputGroup>
                  <InputGroup.Input type="number" placeholder="1500" />
                </InputGroup>

                <FieldError />
              </TextField>

              {/* Currency */}
              <Select name="currency" placeholder="Currency">
                <Label>Currency</Label>

                <Select.Trigger>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>

                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="usd">
                      USD
                      <ListBox.ItemIndicator />
                    </ListBox.Item>

                    <ListBox.Item id="bdt">
                      BDT
                      <ListBox.ItemIndicator />
                    </ListBox.Item>

                    <ListBox.Item id="eur">
                      EUR
                      <ListBox.ItemIndicator />
                    </ListBox.Item>

                    <ListBox.Item id="gbp">
                      GBP
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>

              {/* Remote Toggle */}

              <Switch isSelected={isRemote} onChange={setIsRemote}>
                <Switch.Control>
                  <Switch.Thumb />
                </Switch.Control>
                <Switch.Content>
                  <Label className="text-sm">Remote Job</Label>
                </Switch.Content>
              </Switch>

              {!isRemote && (
                <>
                  {/* City */}
                  <TextField isRequired name="city">
                    <Label>City</Label>

                    <InputGroup>
                      <InputGroup.Input placeholder="Dhaka" />
                    </InputGroup>

                    <FieldError />
                  </TextField>

                  {/* Country */}
                  <TextField isRequired name="country">
                    <Label>Country</Label>

                    <InputGroup>
                      <InputGroup.Input placeholder="Bangladesh" />
                    </InputGroup>

                    <FieldError />
                  </TextField>
                </>
              )}
            </FieldGroup>
          </section>

          {/* DESCRIPTION */}

          <section className="rounded-2xl border p-6">
            <h2 className="mb-6 text-xl font-semibold">Job Description</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <FieldGroup className="space-y-2">
                <Label htmlFor="textarea-responsibility">
                  Job Responsibilities
                </Label>
                <TextArea
                  id="textarea-responsibility"
                  name="responsibilities"
                  rows={5}
                  className="w-full"
                  placeholder="Describe the responsibilities..."
                />
              </FieldGroup>
              <FieldGroup className="space-y-2">
                <Label htmlFor="textarea-requirements">Job Requirements</Label>
                <TextArea
                  id="textarea-requirements"
                  name="requirements"
                  rows={5}
                  className="w-full"
                  placeholder="Describe the requirements..."
                />
              </FieldGroup>
              <FieldGroup className="space-y-2">
                <Label htmlFor="textarea-benefits">Benefits</Label>
                <TextArea
                  id="textarea-benefits"
                  name="benefits"
                  rows={5}
                  className="w-full"
                  placeholder="Describe the benefits..."
                />
              </FieldGroup>
            </div>
          </section>

          {/* COMPANY */}

          <section className="rounded-2xl border p-6">
            <h2 className="mb-6 text-xl font-semibold">Company Information</h2>

            <div className="rounded-xl bg-content2 p-5">
              <div className="flex items-center gap-3">
                <FaBuilding />

                <div>
                  <h3 className="font-semibold">TechNova Ltd.</h3>

                  <p className="text-sm text-default-500">Approved Company</p>
                </div>
              </div>
            </div>
          </section>

          {/* SUBMIT */}

          <div className="flex justify-end">
            <Button color="primary" size="lg" type="submit">
              Publish Job
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
