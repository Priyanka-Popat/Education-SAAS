const SubjectList = ({ selectedSemester }) => {
  return (
    <div className="space-y-3 w-full">
      {selectedSemester ? (
        selectedSemester.tracks.map((track) => (
          <div key={track.id} className="space-y-4">
            <h3 className="text-white text-xs font-unurbanistSemiBold">
              {track.name}
            </h3>
            <ul className="space-y-2">
              {track.subjects.map((subject) => (
                <li
                  key={subject.id}
                  className="flex justify-between items-center bg-white/5 hover:bg-white/10 transition-colors px-4 py-2 rounded-lg cursor-pointer text-xs text-white"
                >
                  <span>
                    <strong>{subject.code}</strong> - {subject.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p className="text-white/50">
          No subjects available for this semester
        </p>
      )}
    </div>
  );
};

export default SubjectList;
