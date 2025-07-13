const AddButtonSecondary = ({ label, icon = null, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`font-urbanistMedium text-white flex items-center justify-between gap-3 border-purple border w-fit lg:py-2 lg:px-3 4xs:px-3 bg-[#703ce92b] 4xs:py-2 rounded-full text-sm 4xl:text-2xl lg:text-xs 2xl:text-sm 3xl:text-base 4xl:py-3 4xl:px-6 btn-slide relative ${className}`}
    >
      {icon &&
        (typeof icon === "string" ? (
          <img src={icon} alt="icon" className="w-4 4xl:w-7 2xl:w-5 lg:w-3" />
        ) : (
          <span className="">{icon}</span>
        ))}
      <p className="text-xs 4xl:text-2xl 3xl:text-base 2xl:text-sm lg:text-xs font-urbanistSemiBold">
        {label}
      </p>
    </button>
  );
};

export default AddButtonSecondary;
