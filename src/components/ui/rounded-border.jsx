const RoundedBorderButton = ({className}) => {
  return (
    <div className={`rounded-full border border-secondary absolute flex justify-center items-center btn-slide cursor-pointer ${className}`}>
      <img src="/assets/icons/pencil.svg" alt="" className="4xl:w-10 3xl:w-7" />
    </div>
  );
};

export default RoundedBorderButton;