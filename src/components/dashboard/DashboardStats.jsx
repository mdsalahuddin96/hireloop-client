import { FaBriefcase, FaBuilding, FaDollarSign, FaUsers } from "react-icons/fa";
import StataCard from "./StataCard";
const stats=[
    {
      title: "Total Users",
      value: "12.5K",
      icon: <FaUsers />,
    },
    {
      title: "Recruiters",
      value: "1.2K",
      icon: <FaBuilding />,
    },
    {
      title: "Jobs",
      value: "5.4K",
      icon: <FaBriefcase />,
    },
    {
      title: "Revenue",
      value: "$8.2K",
      icon: <FaDollarSign />,
    },
  ]
export default function DashboardStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StataCard
          key={index}
          stat={stat}
        />
      ))}
    </div>
  );
}

