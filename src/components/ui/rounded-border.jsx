const RoundedBorderButton = ({className}) => {
  return (
    <div className={`rounded-full border border-secondary absolute flex justify-center items-center ${className}`}>
      <img src="/assets/icons/pencil.svg" alt="" className="" />
    </div>
  );
};

export default RoundedBorderButton;