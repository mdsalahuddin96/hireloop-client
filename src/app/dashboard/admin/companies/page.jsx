import CompaniesTable from "@/components/dashboard/CompaniesTable";
import { getCompanies } from "@/lib/api/companies";

const CompaniesPage = async () => {
  const companies = await getCompanies();

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Registered Companies
        </h1>

        <p className="text-default-500">
          Manage all recruiter companies
        </p>
      </div>

      <CompaniesTable
        companies={companies}
      />
    </section>
  );
};

export default CompaniesPage;