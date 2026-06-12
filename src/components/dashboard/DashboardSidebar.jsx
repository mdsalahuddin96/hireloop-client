import { getUserSession } from "@/lib/core/session";
import {
  LayoutSideContentLeft,
  Envelope,
  Gear,
  House,
  Person,
  Briefcase,
  Bookmark,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";
import { BsFileEarmarkPostFill } from "react-icons/bs";
import { FaFileAlt } from "react-icons/fa";
import { GoBriefcase } from "react-icons/go";

export async function DashboardSidebar() {
  const user=await getUserSession()
  const recruiterNavItems = [
    { icon: House, href:"/dashboard/recruiter", label: "Home" },
    { icon: Briefcase, href:"/dashboard/recruiter/jobs", label: "Jobs" },
    { icon: BsFileEarmarkPostFill , href:"/dashboard/recruiter/jobs/new", label: "Post a Job" },
    { icon: GoBriefcase, href:"/dashboard/recruiter/company", label: "Company" },
    { icon: Envelope, label: "Messages" },
    { icon: Person, label: "Profile" },
    { icon: Gear, label: "Settings" },
  ];
  const seekerNavItems = [
  { icon: House, href: "/dashboard/seeker", label: "Home" },
  { icon: Briefcase, href: "/dashboard/seeker/applications", label: "My Applications" },
  { icon: Bookmark, href: "/dashboard/seeker/saved-jobs", label: "Saved Jobs" },
  { icon: FaFileAlt, href: "/dashboard/seeker/resume", label: "Resume" },
  { icon: Envelope, href: "/dashboard/seeker/messages", label: "Messages" },
  { icon: Person, href: "/dashboard/seeker/profile", label: "Profile" },
  { icon: Gear, href: "/dashboard/seeker/settings", label: "Settings" },
];
const role={
  seeker:seekerNavItems,
  recruiter:recruiterNavItems
}
  const navItems=role[user?.role]
  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link
          key={item.label}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
          href={item?.href||"#"}
        >
          <item.icon className="size-5 text-muted" />
          {item.label}
        </Link>
      ))}
    </nav>
  );
  return (
    <>
    <aside className=" hidden w-64 border-r border-default p-4 lg:block">
        {navContent}
    </aside>
      <Drawer>
        <Button className="lg:hidden" variant="secondary">
          <LayoutSideContentLeft />
          Menu
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>{navContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}
