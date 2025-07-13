import { useState } from "react";
import GradeSectionFilter from "@/components/ui/grade-section-filter";
import SectionFilter from "@/components/ui/section-filter";
import DateFilter from "@/components/ui/date-filter";

const FilterDropdown = ({ onApply }) => {
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    grade: "",
    section: "",
  });


  return (
    <div className="grid grid-cols-2 gap-x-2 px-4 w-full">
      <DateFilter filters={filters} setFilters={setFilters} />
      <GradeSectionFilter selected={filters.grade} setFilters={setFilters} />

  
    </div>
  );
};

export default FilterDropdown;
