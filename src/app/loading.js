import { Spinner } from "@heroui/react";
import React from "react";

const loading = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <Spinner size="lg" />
      <span className="text-xs text-muted">Large</span>
    </div>
  );
};

export default loading;
