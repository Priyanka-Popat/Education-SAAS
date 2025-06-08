import React from "react";
import SelectField from "@/components/ui/select-field";
import StudentList from "./student-list";

const BatchSelection = ({
  selectedCourse,
  selectedBatchId,
  setSelectedBatchId,
}) => {
  const selectedBatch = selectedCourse?.batches?.find(
    (b) => b.id === selectedBatchId
  );

  return (
    <>
      <div className="col-start-9 row-start-2 col-span-5 px-4">
        <SelectField
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

      <div className="ps-4 pt-4 col-start-9 row-start-3 col-span-3 row-span-5 w-full">
        <div className="w-full h-full qr-code">
          <div className="flex flex-col justify-between h-full gap-y-8 items-center p-5">
            <StudentList students={selectedBatch?.students || []} />
          </div>
        </div>
      </div>
    </>
  );
};

export default BatchSelection;
