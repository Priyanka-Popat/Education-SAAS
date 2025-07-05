const AddButton = ({
  label,
  icon,
  className,
  onClick,
}) => {
  return (
    <div
      className={`flex items-center gap-x-2 border border-[#713CE9] rounded-[6px] 4xl:rounded-[10px] bg-[#713CE9] py-2 px-4 4xl:py-3 2xl:py-1.5 lg:py-1.5 cursor-pointer btn-ripple ${className}`}
      onClick={onClick}
    >
      {icon && (
        <img src="/assets/icons/add-circle.svg" alt="" className="w-5 4xl:w-7 2xl:w-5  lg:w-3" />
      )}
      <p className="text-xs 4xl:text-2xl 3xl:text-base 2xl:text-sm lg:text-xs font-urbanistSemiBold">
        {label}
      </p>
    </div>
  );
};

export default AddButton;
