"use client";
import {
  Button,
  Input,
  Label,
  ListBox,
  SearchField,
  Select,
} from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";

const JobSearchFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL-এ অলরেডি কোনো ভ্যালু থাকলে সেটা ইনিশিয়াল স্টেট হিসেবে থাকবে
  const [searchInp, setSearchInp] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [jobType, setJobType] = useState(searchParams.get("jobType") || "");
  const [country, setCountry] = useState(searchParams.get("country") || "");

  const handleFilter = () => {
    const params = new URLSearchParams();

    if (searchInp) params.set("search", searchInp);
    if (category) params.set("category", category);
    if (jobType) params.set("jobType", jobType);
    if (country) params.set("country", country);

    // URL আপডেট হবে, যেমন: /jobs?search=react&location=dhaka
    router.push(`/jobs?${params.toString()}`);
  };

  const handleReset = () => {
    setSearchInp("");
    setCategory("");
    setJobType("");
    setCountry("");
    router.push("/jobs"); // URL ক্লিন করে দেওয়া
  };

  useEffect(()=>{
    const timer=setTimeout(handleFilter,500)
    return ()=>clearTimeout(timer)
  },[searchInp])
  return (
    <div className="mt-8 container mx-auto rounded-2xl border border-default-200 p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
        <SearchField name="search" className="w-full" value={searchInp}>
          <Label>Search Job</Label>
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input
              className="w-full"
              placeholder="Search..."
              onChange={(e)=>setSearchInp(e.target.value)}
            />
            <SearchField.ClearButton onClick={()=>setSearchInp("")} />
          </SearchField.Group>
        </SearchField>
        <Select
          className="w-full"
          placeholder="Select one"
          value={category}
          onChange={(value) => setCategory(value)}
        >
          <Label>Category</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              <ListBox.Item id="software-engineering">
                <Label>Software Engineering</Label>
                <ListBox.ItemIndicator />
              </ListBox.Item>

              <ListBox.Item id="design">
                <Label>Design</Label>
                <ListBox.ItemIndicator />
              </ListBox.Item>

              <ListBox.Item id="marketing">
                <Label>Marketing</Label>
                <ListBox.ItemIndicator />
              </ListBox.Item>

              <ListBox.Item id="data-science">
                <Label>Data Science</Label>
                <ListBox.ItemIndicator />
              </ListBox.Item>

              <ListBox.Item id="sales">
                <Label>Sales</Label>
                <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
        <Select
          className="w-full"
          placeholder="Select one"
          value={jobType}
          onChange={(value) => setJobType(value)}
        >
          <Label>Job Type</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              <ListBox.Item id="full-time">
                <Label>Full Time</Label>
                <ListBox.ItemIndicator />
              </ListBox.Item>

              <ListBox.Item id="part-time">
                <Label>Part Time</Label>
                <ListBox.ItemIndicator />
              </ListBox.Item>

              <ListBox.Item id="contract">
                <Label>Contract</Label>
                <ListBox.ItemIndicator />
              </ListBox.Item>

              <ListBox.Item id="internship">
                <Label>Internship</Label>
                <ListBox.ItemIndicator />
              </ListBox.Item>

              <ListBox.Item id="remote">
                <Label>Remote</Label>
                <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
        <div className="flex flex-col gap-2">
          <Label>Country</Label>
          <Input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="rounded-xl border border-border/70 bgsurface px-4 py-2 text-sm shadow-sm focus-visible:border-primary"
            placeholder="e.g Bangladesh"
          />
        </div>
        <div className="flex items-end gap-2">
          <Button color="primary" className="flex-1" onClick={handleFilter}>
            <FaFilter />
            Filter
          </Button>

          <Button
            variant="bordered"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobSearchFilter;
