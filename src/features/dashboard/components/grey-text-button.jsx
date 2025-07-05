const ViewAllButton = ({ onClick, className = "", children = "View all" }) => {
  return (
    <button
      onClick={onClick}
      className={`text-sm 2xl:text-sm 4xl:text-2xl 3xl:text-lg hd:text-sm lg:text-sm font-urbanistRegular text-grey ${className}`}
    >
      {children}
    </button>
  );
};

export default ViewAllButton;
