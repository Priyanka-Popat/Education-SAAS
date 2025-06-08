const AddButton = ({ label, icon = "/assets/icons/add-circle.svg", onClick }) => {
  return (
    <div
      className="flex items-center gap-x-2 border border-[#713CE9] rounded-[6px] bg-[#713CE9] py-2 px-4 cursor-pointer"
      onClick={onClick}
    >
      <img src={icon} alt="" />
      <p className="text-xs font-urbanistSemiBold">{label}</p>
    </div>
  );
};

export default AddButton;
