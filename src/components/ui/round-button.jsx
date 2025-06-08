const RoundButton = ({className, onClick }) => {
  return (
    <div onClick={onClick} className={`rounded-full bg-secondary absolute h-[65px] w-[65px] flex justify-center cursor-pointer items-center ${className}`}>
      <img src="/assets/icons/arrow.svg" alt="" className="" />
    </div>
  );
};

export default RoundButton;