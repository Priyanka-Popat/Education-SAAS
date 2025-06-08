import { useState, useEffect } from "react";
import DashboardLayout from "@/components/global/dashboard-layout";
import GreetingHeader from "@/components/global/greeting-header";
import AddBatch from "@/features/batches/components/add-batch-dialog.jsx";
import nestedData from "@/data/NestedData.json";
import {
  ChevronDown,
  ArrowRight,
  ArrowUpRight,
  PencilLine,
  X,
} from "lucide-react";
import DepartmentFilter from "@/components/ui/department-filter";
import CourseFilter from "@/components/ui/course-filter";
import Heading from "@/components/ui/heading";
import AddButton from "@/components/ui/add-button";
import BatchList from "../components/batch-list";
import BatchSelection from "../components/batch-selection";

const Batches = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedBatchId, setSelectedBatchId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (nestedData.length) {
      const firstDept = nestedData[0];
      setSelectedDepartment(firstDept);
      if (firstDept.courses && firstDept.courses.length) {
        setSelectedCourse(firstDept.courses[0]);
      }
    }
  }, []);

  useEffect(() => {
    if (selectedCourse?.batches?.length) {
      setSelectedBatchId(selectedCourse.batches[0].id);
    } else {
      setSelectedBatchId(null);
    }
  }, [selectedCourse]);

  const selectedBatch = selectedCourse?.batches?.find(
    (b) => b.id === selectedBatchId
  );

  const handleClose = () => setIsModalOpen(false);

  return (
    <>
      <DashboardLayout
        className="bg-[#131313]"
        headerComponent={<GreetingHeader heading="Hey, Adam!👋" />}
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Batches", href: "/batches" },
        ]}
      >
        <div className="col-start-1 row-start-2 col-span-12 row-span-9 relative px-4 pb-4 c9 text-white">
          <div className="attendance-info grid grid-cols-11 grid-rows-7 w-full h-full">
            <Heading heading="Batches" />

            <div className="col-start-6 row-start-1 col-span-6 flex px-5 py-5 items-end justify-end h-full gap-6">
              <DepartmentFilter
                selectedDepartment={selectedDepartment}
                setSelectedDepartment={(dept) => {
                  setSelectedDepartment(dept);
                  setSelectedCourse(dept?.courses?.[0] || null);
                }}
                setSelectedDeptId={() => {}}
              />

              <CourseFilter
                selectedCourse={selectedCourse}
                setSelectedCourse={(course) => {
                  setSelectedCourse(course);
                  setSelectedBatchId(course?.batches?.[0]?.id || null);
                }}
                courses={selectedDepartment?.courses || []}
              />

              <AddButton
                label="Add new Batch"
                onClick={() => setIsModalOpen(true)}
              />
            </div>

            <BatchSelection
              selectedCourse={selectedCourse}
              selectedBatchId={selectedBatchId}
              setSelectedBatchId={setSelectedBatchId}
            />

            <div className="col-start-1 row-start-2 col-span-8 row-span-5 px-5 pt-8 pb-5 overflow-y-auto max-h-[480px]">
              <BatchList
                batches={selectedCourse?.batches || []}
                selectedBatchId={selectedBatchId}
                onSelect={setSelectedBatchId}
              />
            </div>
          </div>
        </div>
      </DashboardLayout>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-stretch justify-stretch">
          <div className="relative w-full h-full overflow-auto">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X size={24} />
            </button>
            <AddBatch onClose={handleClose} />
          </div>
        </div>
      )}
    </>
  );
};

export default Batches;
