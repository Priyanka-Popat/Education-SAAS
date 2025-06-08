import React from "react";

const StudentList = ({ students = [] }) => (
  <div className="w-full">
    <p className="font-urbanistSemiBold pb-5 text-sm">Students</p>

    {students.length ? (
      <ul className="text-xs space-y-3">
        {students.map((s) => (
          <li
            key={s.id}
            className="bg-white/5 hover:bg-white/10 transition-colors px-4 py-2 rounded-lg cursor-pointer text-white"
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
