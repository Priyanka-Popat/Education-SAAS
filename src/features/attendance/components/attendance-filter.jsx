import Filters from "@/components/ui/filters";
export default AttendanceFilters = () => (
  <div className="col-start-9 row-start-2 col-span-5">
    <Filters
      visibleFilters={["date", "grade", "filter"]}
      className="justify-between"
    />
  </div>
);