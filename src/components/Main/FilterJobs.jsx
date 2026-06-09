"use client";
import { Button, Label, ListBox, SearchField, Select } from "@heroui/react";
import { FaFilter } from "react-icons/fa";
const JobSearchFilter = () => {
  return (
    <div className="mt-8 container mx-auto rounded-2xl border border-default-200 p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
        <SearchField name="search" className="w-full">
          <Label>Search Job</Label>
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input className="w-full" placeholder="Search..." />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>
        <Select className="w-full" placeholder="Select one">
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
        <Select className="w-full" placeholder="Select one">
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
        <div className="flex items-end gap-2">
          <Button
            color="primary"
            className="flex-1"
            onPress={handleFilter}
          >
            <FaFilter />
            Filter
          </Button>

          <Button
            variant="bordered"
            onPress={clearFilters}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobSearchFilter;
