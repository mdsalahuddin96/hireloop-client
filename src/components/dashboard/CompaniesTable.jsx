"use client";

import React, { useState } from "react";
import { Table, Button, Chip } from "@heroui/react";
import Image from "next/image";
import { updateCompany } from "@/lib/actions/company";


export default function CompaniesTable({ companies }) {
  // যদি আপনার টেবিলে সিলেকশন ফিচার লাগে, তাহলে এই স্টেটটি ব্যবহার করতে পারেন
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));

  // স্ট্যাটাস অনুযায়ী কালার ম্যাচিং
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "success";
      case "pending":
        return "warning";
      case "rejected":
        return "danger";
      default:
        return "default";
    }
  };
  const handleApprove = async (id) => {
    const result = await updateCompany(id, "Approved");
  };
  const handleReject = async (id) => {
    const result = await updateCompany(id, "Rejected");
  };
  return (
    <div className="w-full bg-[#121212] p-6 rounded-xl border border-neutral-800">
      <Table aria-label="Companies management master table">
        <Table.ScrollContainer>
          <Table.Content
            aria-label="Table with selection"
            className="min-w-[800px]" // কলাম বেশি থাকায় মিনিমাম উইডথ ৮০০পিএক্স করা হয়েছে
            selectedKeys={selectedKeys}
            selectionMode="multiple"
            onSelectionChange={setSelectedKeys}
          >
            <Table.Header>
              {/* সিলেকশনের জন্য প্রথম কলামটি HeroUI নিজে থেকেই হ্যান্ডেল করবে যদি selectionMode থাকে, 
                  তাই এখানে আপনার স্ট্রাকচার অনুযায়ী কলামগুলো সাজানো হলো */}
              <Table.Column
                isRowHeader
                className="bg-transparent text-neutral-400 font-medium text-sm border-b border-neutral-800/50 pb-4"
              >
                Company Name
              </Table.Column>
              <Table.Column className="bg-transparent text-neutral-400 font-medium text-sm border-b border-neutral-800/50 pb-4">
                Jobs Count
              </Table.Column>
              <Table.Column className="bg-transparent text-neutral-400 font-medium text-sm border-b border-neutral-800/50 pb-4">
                Industry
              </Table.Column>
              <Table.Column className="bg-transparent text-neutral-400 font-medium text-sm border-b border-neutral-800/50 pb-4">
                Status
              </Table.Column>
              <Table.Column className="bg-transparent text-neutral-400 font-medium text-sm border-b border-neutral-800/50 pb-4">
                Date Submitted
              </Table.Column>
              <Table.Column
                className="bg-transparent text-neutral-400 font-medium text-sm border-b border-neutral-800/50 pb-4"
                align="end"
              >
                Actions
              </Table.Column>
            </Table.Header>

            <Table.Body>
              {companies?.map((company) => (
                <Table.Row
                  key={company._id}
                  id={company._id}
                  className="border-b border-neutral-800/30 last:border-none hover:bg-neutral-900/40 transition-colors"
                >
                  {/* Company Name & Logo */}
                  <Table.Cell className="py-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={company.logo}
                        alt={company.name}
                        width={200}
                        height={200}
                        className="w-10 h-10 rounded-2xl"
                      />
                      <span className="text-neutral-200 font-medium text-sm">
                        {company.name}
                      </span>
                    </div>
                  </Table.Cell>
                  {/* Industry */}
                  <Table.Cell className="py-4">
                    <Chip
                      size="sm"
                      variant="flat"
                      className="bg-neutral-800/60 text-neutral-400 border border-neutral-700/30 capitalize px-2"
                    >
                      {company.industry}
                    </Chip>
                  </Table.Cell>
                  {/* Jobs count*/}
                  <Table.Cell className="py-4 text-neutral-400 text-sm">
                    {company?.jobCount}
                  </Table.Cell>

                  {/* Status */}
                  <Table.Cell className="py-4">
                    <Chip
                      size="sm"
                      variant="dot"
                      color={getStatusColor(company.status)}
                      className="bg-transparent border-none text-sm font-medium capitalize pl-0"
                    >
                      {company.status}
                    </Chip>
                  </Table.Cell>

                  {/* Date Submitted */}
                  <Table.Cell className="py-4 text-neutral-400 text-sm">
                    {company.createdAt
                      ? new Date(company.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          },
                        )
                      : "N/A"}
                  </Table.Cell>

                  {/* Actions */}
                  <Table.Cell className="py-4">
                    <div className="flex justify-end gap-2">
                      {company.status?.toLowerCase() !== "approved" && (
                        <Button
                          size="sm"
                          variant="bordered"
                          className="border-emerald-950 text-emerald-500 hover:bg-emerald-500/10 min-w-[75px] h-8 font-medium"
                          onClick={() => handleApprove(company?._id)}
                        >
                          Approve
                        </Button>
                      )}

                      <Button
                        size="sm"
                        variant="bordered"
                        className="border-rose-950 text-rose-500 hover:bg-rose-500/10 min-w-[75px] h-8 font-medium"
                        onClick={() => {
                          handleReject(company?._id);
                        }}
                      >
                        Reject
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
}
