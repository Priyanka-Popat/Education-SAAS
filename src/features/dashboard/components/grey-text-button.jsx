const ViewAllButton = ({ onClick, className = "", children = "View all" }) => {
  return (
    <button
      onClick={onClick}
      className={`text-sm font-urbanistRegular text-grey ${className}`}
    >
      {children}
    </button>
  );
};

export default ViewAllButton;
