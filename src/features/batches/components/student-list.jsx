import React from "react";

const StudentList = ({ students = [] }) => (
  <div className="w-full">
    <p className="font-urbanistSemiBold pb-5 2xl:pb-4 text-sm 4xl:text-3xl 3xl:text-xl 2xl:text-lg">Students</p>

    {students.length ? (
      <ul className="text-xs space-y-3">
        {students.map((s) => (
          <li
            key={s.id}
            className="flex justify-between items-center bg-white/5 hover:bg-white/10 transition-colors px-4 py-2 4xl:py-4 rounded-lg cursor-pointer text-white font-urbanistMedium text-xs 4xl:text-2xl 2xl:text-sm 3xl:text-base"
          >
            {s.rollNo} – {s.name}
          </li>
        ))}
      </ul>
    ) : (
      <p>No students found.</p>
    )}
  </div>
);

export default StudentList;
