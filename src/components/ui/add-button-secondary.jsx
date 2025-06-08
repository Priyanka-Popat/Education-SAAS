const AddButtonSecondary = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="font-urbanistMedium border-purple border w-fit px-3 bg-[#703ce92b] py-2 rounded-full text-sm"
    >
      {label}
    </button>
  );
};

export default AddButtonSecondary;
