import Filters from "@/components/ui/filter";
import { Filter } from "lucide-react";

import { useState } from "react";

const AttendanceFilters = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState(null);

  const handleApplyFilters = (filters) => {
    setAppliedFilters(filters);
    setIsFilterOpen(false);
    console.log("Applied Filters: ", filters);
  };

  return (
    <div className="col-start-9 row-start-2 col-span-5 relative">
    <Filters />
    </div>
  );
};

export default AttendanceFilters;
