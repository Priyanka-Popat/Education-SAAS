import React from "react";

const SubjectList = ({ subjects = [] }) => {
  return (
    <div className="space-y-3 w-full">
      {subjects.length > 0 ? (
        subjects.map((subj) => (
          <div
            key={subj.id}
            className="flex justify-between items-center bg-white/5 hover:bg-white/10 transition-colors px-4 py-2 rounded-lg cursor-pointer text-white"
          >
            <p className="font-urbanistMedium text-xs">{subj.code}</p>
            <p className="font-urbanistMedium text-xs">{subj.name}</p>
          </div>
        ))
      ) : (
        <p>No subjects found</p>
      )}
    </div>
  );
};

export default SubjectList;
