import { useState, useEffect } from "react";
import { X } from "lucide-react";
import nestedData from "@/data/NestedData.json";
import DashboardLayout from "@/components/global/dashboard-layout";
import GreetingHeader from "@/components/global/greeting-header";
import DepartmentFilter from "@/components/ui/department-filter";
import CourseFilter from "@/components/ui/course-filter";
import Heading from "@/components/ui/heading";
import AddButton from "@/components/ui/add-button";
import AttendanceBg from "@/components/ui/attendance-bg";
import AddBatch from "@/features/batches/components/add-batch-dialog.jsx";
import BatchList from "@/features/batches/components/batch-list";
import BatchSelection from "@/features/batches/components/batch-selection";
import BatchesSm from "@/features/batches/components/batches-sm";
import RectSearchBar from "@/components/ui/rect-search-bar";

const Batches = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedBatchId, setSelectedBatchId] = useState(null);
  const [isDesktopModalOpen, setIsDesktopModalOpen] = useState(false);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  const [batchToEdit, setBatchToEdit] = useState(null);

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

  const handleClose = () => {
    setIsModalOpen(false);
    setBatchToEdit(null);
  };

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
        <div className="lg:col-start-1 lg:row-start-3 xl:row-start-2 lg:col-span-12 lg:row-span-9 col-start-1 row-start-3 col-span-6 row-span-10 relative px-4 hdplus:px-[21px] 2xl:px-5 2xl:pb-5 pb-4 c9 lg:pt-0 xl:pt-[1.5rem] 4xl:pt-[2.5rem] 3xl:pt-[2rem] 2xl:pt-[2rem] text-white hidden lg:block">
          <div className="w-full relative h-full">
            <AttendanceBg />
            <div className="grid grid-cols-11 grid-rows-9 3xl:grid-rows-8 w-full h-full relative">
              <Heading heading="Batches" />

              <div className="relative col-start-4 row-start-1 col-span-8 flex px-5 py-5 4xl:p-0 2xl:p-0 lg:p-0 items-end 2xl:items-start lg:items-start justify-end h-full gap-x-3">
                <RectSearchBar />
                {/* className="bg-[#FFFFFF0F] border border-white/30 rounded-md px-4 py-1.5 placeholder:text-sm" */}
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
                  label="Add Batch"
                  onClick={() => {
                    setBatchToEdit(null);
                    setIsDesktopModalOpen(true);
                  }}
                />
              </div>

              <BatchSelection
                selectedCourse={selectedCourse}
                selectedBatchId={selectedBatchId}
                setSelectedBatchId={setSelectedBatchId}
              />

              <div className="col-start-1 row-start-2 col-span-8 row-span-7 px-5 pt-3 4xl:pt-3 pb-5 c13">
                <BatchList
                  batches={selectedCourse?.batches || []}
                  selectedBatchId={selectedBatchId}
                  onSelect={setSelectedBatchId}
                  onEdit={(batch) => {
                    setBatchToEdit(batch);
                    setIsDesktopModalOpen(true);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>

      {isDesktopModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-stretch justify-stretch">
          <div className="relative w-full h-full overflow-auto">
            <button
              onClick={() => {
                setIsDesktopModalOpen(false);
                setBatchToEdit(null);
              }}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X size={24} />
            </button>
            <AddBatch
              key={batchToEdit?.id || "new"}
              onClose={() => {
                setIsDesktopModalOpen(false);
                setBatchToEdit(null);
              }}
              mode={batchToEdit ? "edit" : "add"}
              batchToEdit={batchToEdit}
            />
          </div>
        </div>
      )}

      <BatchesSm
        selectedDepartment={selectedDepartment}
        setSelectedDepartment={setSelectedDepartment}
        selectedCourse={selectedCourse}
        setSelectedCourse={setSelectedCourse}
        selectedBatchId={selectedBatchId}
        setSelectedBatchId={setSelectedBatchId}
        isModalOpen={isMobileModalOpen}
        setIsModalOpen={setIsMobileModalOpen}
        nestedData={nestedData}
        onEdit={(batch) => {
          setBatchToEdit(batch);
          setIsDesktopModalOpen(true);
        }}
      />
    </>
  );
};

export default Batches;
