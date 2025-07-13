import React from "react";
import SelectField from "@/components/ui/select-field";
import StudentList from "./student-list";
import MdBg from "@/components/ui/md-bg";
import Loader from "@/components/ui/loader";
import { useEffect, useState } from "react";

const BatchSelection = ({
  selectedCourse,
  selectedBatchId,
  setSelectedBatchId,
}) => {
  const selectedBatch = selectedCourse?.batches?.find(
    (b) => b.id === selectedBatchId
  );

  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    if (selectedBatch?.students && selectedBatch.students.length > 0) {
      setIsloading(false);
    } else {
      setIsloading(true);
    }
  }, [selectedBatch]);

  return (
    <>
      <div className="relative col-start-9 row-start-2 row-span-1 3xl:row-span-1 col-span-5 px-4 pt-4 2xl:pt-0  hd:pt-0 lg:pt-0">
        <div className="w-full lg:mb-6">
          <SelectField
            className="h-full flex justify-start 4xl:justify-start 3xl:justify-start 2xl:justify-start hd:justify-start flex-col"
            label="Batch"
            value={selectedBatchId || ""}
            onChange={(e) => setSelectedBatchId(Number(e.target.value))}
            options={
              selectedCourse?.batches?.map((batch) => ({
                value: batch.id,
                label: batch.batchName,
              })) || []
            }
            disabled={!selectedCourse?.batches?.length}
          />
        </div>
      </div>

      <div className="h-[65%] lg:h-full lg:mt-0 rounded-2xl relative md:p-0 lg:ps-3 lg:pt-4 3xl:ps-5 4xl:ps-10 4xl:pt-7 4xl:pe-2 col-start-9 row-start-3 col-span-3 row-span-7 w-full">
        <MdBg />
        <div className="w-full h-full relative">
          <div className="flex flex-col justify-between h-full gap-y-8 items-center p-5">
            {isLoading ? (
              <div className="flex justify-center items-center h-24 w-full">
                <Loader />
              </div>
            ) : (
              <StudentList students={selectedBatch?.students || []} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BatchSelection;
