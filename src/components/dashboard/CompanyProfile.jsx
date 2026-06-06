"use client";

import { useState } from "react";
import {
  Form,
  Fieldset,
  FieldGroup,
  TextField,
  Label,
  Input,
  TextArea,
  FieldError,
  Description,
  Button,
  Chip,
  Modal,
  Avatar,
} from "@heroui/react";
import {
  LuBuilding2,
  LuGlobe,
  LuMapPin,
  LuUsers,
  LuPlus,
  LuExternalLink,
} from "react-icons/lu";
import { FiEdit } from "react-icons/fi";
import { BsUpload } from "react-icons/bs";
import { createCompany } from "@/lib/actions/company";

export default function CompanyProfile({recruiter,recruiterCompany}) {
  const [company, setCompany] = useState(recruiterCompany);

  // ২. ইউজার ইন্টারফেস স্টেটসমূহ
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");

  // ৩. Imgbb-তে লোগো আপলোড হ্যান্ডলার
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    try {
      // এখানে আপনার Imgbb API Key টি বসিয়ে নিবেন
      const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_KEY;
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        },
      );
      const data = await response.json();
      if (data.success) {
        setLogoUrl(data.data.url);
      } else {
        alert("Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  // ৪. ফর্ম সাবমিট হ্যান্ডলার (তৈরি এবং এডিট দুইটার জন্যই কাজ করবে)
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const updatedCompany = {
      name: data.name,
      industry: data.industry,
      website: data.website,
      location: data.location,
      employeeCount: data.employeeCount,
      description: data.description,
      logo:
        logoUrl ||
        company?.logo ||
        "https://images.unsplash.com/photo-1560179707-f14e90ef3623",
      status: company?.status || "Pending", // নতুন হলে ডিফোল্ট Pending থাকবে
      recruiterId:recruiter?.id
    };
    setIsSubmitting(true);

    // API সেভিং সিমুলেশন (এখানে আপনার অ্যাকচুয়াল MongoDB backend API কল হবে)
    const result = await createCompany(updatedCompany);
    if (result.insertedId) {
      setCompany(updatedCompany);
      setIsSubmitting(false);
      setIsOpen(false);
    }
  };
  console.log(company);

  // ৫. এডিট মোড ওপেন করার সময় এক্সিস্টিং লোগো সেট করা
  const openEditModal = () => {
    setLogoUrl(company?.logo || "");
    setIsOpen(true);
  };

  // স্টেট ব্যাজের জন্য কালার ম্যাপিং
  const statusColorMap = {
    Pending: "warning",
    Approved: "success",
    Rejected: "danger",
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-10 min-h-screen text-white">
      {/* ১. কোম্পানি রেজিস্টার্ড না থাকলে এই ভিউটি দেখাবে */}
      {!company ? (
        <div className="flex flex-col items-center justify-center border border-white/10 bg-[#161b22]/50 backdrop-blur-md rounded-2xl p-12 text-center shadow-xl">
          <div className="p-4 bg-[#5C53FE]/10 rounded-full text-[#5C53FE] mb-5">
            <LuBuilding2 size={40} />
          </div>
          <h2 className="text-2xl font-bold mb-2">No Company Registered Yet</h2>
          <p className="text-gray-400 max-w-sm mb-8 text-sm">
            To start posting job opportunities and recruiting top talents, you
            need to register your company profile first.
          </p>
          <Button
            onPress={() => {
              setLogoUrl("");
              setIsOpen(true);
            }}
            className="bg-[#5C53FE] text-white font-semibold rounded-xl px-6 h-11"
            startContent={<LuPlus size={18} />}
          >
            Register Company
          </Button>
        </div>
      ) : (
        <div className="border border-white/10 bg-[#161b22]/70 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-white/10">
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20 text-large rounded-2xl border border-white/10 object-cover bg-white/5">
                <Avatar.Image alt="Company logo" src={company.logo} />
              </Avatar>

              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl font-bold">{company.name}</h1>
                  <Chip
                    variant="flat"
                    color={statusColorMap[company.status]}
                    className="capitalize font-medium text-xs px-2"
                  >
                    {company.status}
                  </Chip>
                </div>
                <p className="text-[#5C53FE] text-sm font-medium mt-1">
                  {company.industry}
                </p>
              </div>
            </div>

            <Button
              onPress={openEditModal}
              variant="bordered"
              className="border-white/10 text-white hover:bg-white/5 rounded-xl h-10 text-sm font-medium"
              startContent={<FiEdit size={16} />}
            >
              Edit Profile
            </Button>
          </div>

          {/* মেটা ইনফরমেশন গ্রিড */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
              <LuGlobe className="text-gray-400" size={20} />
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">
                  Website
                </p>
                <a
                  href={company.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-gray-200 hover:text-[#5C53FE] transition flex items-center gap-1 mt-0.5"
                >
                  Visit Site <LuExternalLink size={12} />
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
              <LuMapPin className="text-gray-400" size={20} />
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">
                  Location
                </p>
                <p className="text-sm text-gray-200 mt-0.5">
                  {company.location}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
              <LuUsers className="text-gray-400" size={20} />
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">
                  Employees
                </p>
                <p className="text-sm text-gray-200 mt-0.5">
                  {company.employeeCount} Employees
                </p>
              </div>
            </div>
          </div>

          {/* ডেসক্রিপশন */}
          <div>
            <h3 className="text-lg font-semibold mb-2">About Company</h3>
            <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">
              {company.description}
            </p>
          </div>
        </div>
      )}

      {/* ৩. কোম্পানি রেজিস্টার এবং এডিটের জন্য HeroUI Modal */}
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop className="bg-black/60 backdrop-blur-sm">
          <Modal.Container>
            <Modal.Dialog className="bg-[#161b22] border border-white/10 text-white max-w-xl rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
              <Modal.CloseTrigger className="hover:bg-white/10 text-gray-400 hover:text-white rounded-lg transition" />

              <Modal.Header className="flex flex-col gap-1 border-b border-white/5 pb-4">
                <Modal.Heading className="text-xl font-bold flex items-center gap-2">
                  <LuBuilding2 className="text-[#5C53FE]" size={22} />
                  {company ? "Update Company Info" : "Register Your Company"}
                </Modal.Heading>
              </Modal.Header>

              <Modal.Body className="py-4">
                {/* HeroUI ৩.১ ফিজিকাল ফর্ম আর্কিটেকচার */}
                <Form
                  className="w-full flex flex-col gap-4"
                  onSubmit={onSubmit}
                >
                  <Fieldset className="w-full m-0 p-0 border-none flex flex-col gap-4">
                    <FieldGroup className="flex flex-col gap-4">
                      {/* কোম্পানির নাম */}
                      <TextField
                        isRequired
                        name="name"
                        defaultValue={company?.name || ""}
                        validate={(value) =>
                          value.length < 2
                            ? "Company name must be at least 2 characters"
                            : null
                        }
                      >
                        <Label className="text-sm font-medium text-gray-300">
                          Company Name
                        </Label>
                        <Input
                          placeholder="e.g. HireLoop Tech"
                          className="bg-[#0d1117] rounded-xl text-white"
                        />
                        <FieldError className="text-xs text-danger-400 mt-1" />
                      </TextField>

                      {/* ক্যাটাগরি ও ওয়েবসাইট ফ্লেক্স রো */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <TextField
                          isRequired
                          name="industry"
                          defaultValue={company?.industry || ""}
                        >
                          <Label className="text-sm font-medium text-gray-300">
                            Industry / Category
                          </Label>
                          <Input
                            placeholder="e.g. Software, Healthcare"
                            className="bg-[#0d1117] rounded-xl text-white"
                          />
                          <FieldError className="text-xs text-danger-400 mt-1" />
                        </TextField>

                        <TextField
                          isRequired
                          name="website"
                          type="url"
                          defaultValue={company?.website || ""}
                        >
                          <Label className="text-sm font-medium text-gray-300">
                            Website URL
                          </Label>
                          <Input
                            placeholder="https://example.com"
                            className="bg-[#0d1117] rounded-xl text-white"
                          />
                          <FieldError className="text-xs text-danger-400 mt-1" />
                        </TextField>
                      </div>

                      {/* লোকেশন ও এমপ্লয়ি রেঞ্জ ফ্লেক্স রো */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <TextField
                          isRequired
                          name="location"
                          defaultValue={company?.location || ""}
                        >
                          <Label className="text-sm font-medium text-gray-300">
                            Location
                          </Label>
                          <Input
                            placeholder="e.g. Dhaka, Bangladesh / Remote"
                            className="bg-[#0d1117] rounded-xl text-white"
                          />
                          <FieldError className="text-xs text-danger-400 mt-1" />
                        </TextField>

                        <TextField
                          isRequired
                          name="employeeCount"
                          defaultValue={company?.employeeCount || ""}
                        >
                          <Label className="text-sm font-medium text-gray-300">
                            Employee Count Range
                          </Label>
                          <Input
                            placeholder="e.g. 11-50, 100-500"
                            className="bg-[#0d1117] rounded-xl text-white"
                          />
                          <FieldError className="text-xs text-danger-400 mt-1" />
                        </TextField>
                      </div>

                      {/* লোগো আপলোড সেকশন (Imgbb ইন্টিগ্রেশন) */}
                      <div className="flex flex-col gap-2">
                        <span className="text-sm font-medium text-gray-300">
                          Company Logo
                        </span>
                        <div className="flex items-center gap-4 bg-[#0d1117] p-3 rounded-xl border border-white/10">
                          {logoUrl && (
                            <Avatar className="rounded-lg">
                              <Avatar.Image alt="John Doe" src={logoUrl} />
                            </Avatar>
                          )}
                          <label className="flex-1 flex flex-col items-center justify-center border border-dashed border-white/20 hover:border-[#5C53FE]/50 rounded-xl p-3 cursor-pointer bg-white/5 hover:bg-white/10 transition">
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                              <BsUpload size={16} />
                              <span>
                                {isUploading
                                  ? "Uploading to Imgbb..."
                                  : "Upload Logo Image"}
                              </span>
                            </div>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleLogoUpload}
                              disabled={isUploading}
                            />
                          </label>
                        </div>
                      </div>

                      {/* শর্ট ডেসক্রিপশন */}
                      <TextField
                        isRequired
                        name="description"
                        defaultValue={company?.description || ""}
                        validate={(value) =>
                          value.length < 20
                            ? "Description must be at least 20 characters"
                            : null
                        }
                      >
                        <Label className="text-sm font-medium text-gray-300">
                          Short Description
                        </Label>
                        <TextArea
                          placeholder="Tell us about your company vision, culture, and goals..."
                          rows={4}
                          className="bg-[#0d1117] rounded-xl text-white"
                        />
                        <Description className="text-xs text-gray-500 mt-1">
                          Minimum 20 characters.
                        </Description>
                        <FieldError className="text-xs text-danger-400 mt-1" />
                      </TextField>
                    </FieldGroup>

                    {/* মডালের অ্যাকশন বাটনসমূহ */}
                    <Fieldset.Actions className="flex items-center justify-end gap-3 mt-4 border-t border-white/5 pt-4">
                      <Button
                        type="button"
                        variant="secondary"
                        onPress={() => setIsOpen(false)}
                        className="bg-white/5 text-gray-300 hover:bg-white/10 rounded-xl font-medium"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="bg-[#5C53FE] text-white font-semibold rounded-xl"
                        isLoading={isSubmitting}
                        isDisabled={isUploading || isSubmitting}
                      >
                        {company ? "Save Changes" : "Register Company"}
                      </Button>
                    </Fieldset.Actions>
                  </Fieldset>
                </Form>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}
