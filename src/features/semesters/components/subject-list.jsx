import React from "react";

const SubjectList = ({ subjects = [] }) => {
  return (
    <div className="space-y-3 w-full">
      {subjects.length > 0 ? (
        subjects.map((subj) => (
          <div
            key={subj.id}
            className="flex justify-between items-center bg-white/5 hover:bg-white/10 transition-colors px-4 py-2 4xl:py-4 rounded-lg cursor-pointer text-white font-urbanistMedium text-xs 4xl:text-2xl 2xl:text-sm 3xl:text-base"
          >
            <p className="font-urbanistMedium">{subj.code}</p>
            <p className="font-urbanistMedium text-right">{subj.name}</p>
          </div>
        ))
      ) : (
        <p className="text-white/50">
          No subjects Found
        </p>
      )}
    </div>
  );
};

export default SubjectList;
