import Link from "next/link";
import { Button } from "@heroui/react";
import { FaLock } from "react-icons/fa";
import { BiHome, BiLogIn } from "react-icons/bi";

const UnauthorizedPage = () => {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="max-w-lg rounded-3xl border bg-content1 p-8 text-center shadow-sm">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-danger/10">
          <FaLock className="text-3xl text-danger" />
        </div>

        <h1 className="text-4xl font-bold">403</h1>

        <h2 className="mt-2 text-2xl font-semibold">Access Denied</h2>

        <p className="mt-4 text-default-500">
          Sorry, you don&apos;t have permission to access this page. Please
          contact the administrator or switch to an account with the required
          permissions.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/signin">
            <Button><BiLogIn/> Signin</Button>
          </Link>
          <Link href="/">
            <Button variant="outline"><BiHome/> Go Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
