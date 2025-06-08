import React from "react";
import SelectField from "@/components/ui/select-field";
import SubjectList from "@/features/semesters/components/subject-list"; 
import AddButtonSecondary from "@/components/ui/add-button-secondary";

const TrackSelection = ({
  tracks = [],
  selectedTrackName,
  setSelectedTrackName,
  subjects = [],
  onAddSubject,
}) => {
  const trackOptions = tracks.map((track) => ({
    label: track.name,
    value: track.name,
  }));

  return (
    <>
      <div className="col-start-9 row-start-2 col-span-5 px-4">
        <div className="w-full mb-6">
          <SelectField
            label="Subject Track"
            value={selectedTrackName}
            onChange={(e) => setSelectedTrackName(e.target.value)}
            options={trackOptions}
          />
        </div>
      </div>

      <div className="ps-4 pt-4 col-start-9 row-start-3 col-span-3 row-span-5 w-full">
        <div className="w-full h-full qr-code">
          <div className="flex flex-col justify-between h-full gap-y-8 items-center p-5">
            <div className="w-full">
              <p className="font-urbanistSemiBold pb-5 text-sm">Subjects</p>
              <SubjectList subjects={subjects} />
            </div>

            <AddButtonSecondary label="Add Subject" onClick={onAddSubject} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackSelection;
