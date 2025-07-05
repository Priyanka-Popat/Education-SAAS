import AddButtonSecondary from "./add-button-secondary";

const Qrcode = () => {
const handleClick = () => {
  console.log("hello clicked")
}
  return (
    <div className="relative w-full h-full text-white">
      <div className="lg:pb-2 pt-5 pb-2 4xs:pt-2 2xs:pt-5 ps-5 pe-5 lg:px-8 4xl:px-11 4xl:pt-10 4xl:pb-7 3xl:pt-7 3xl:ps-10 lg:!pt-8 flex flex-col 2xl:gap-y-8 items-center md:justify-between justify-start 4xs:gap-y-2 2xs:gap-y-3 h-full">
        <div className="flex flex-col gap-y-3 4xl:gap-y-8 items-center justify-center">
          <p className="font-urbanistSemiBold 2xs:text-xl text-lg 4xl:text-4xl 3xl:text-2xl 2xl:text-xl lg:text-[15px]">Scan to Mark</p>
          <img src="/assets/icons/qr.svg" alt="" className="w-64 2xs:w-64 3xs:w-64 4xs:w-48 4xl:w-[400px] 3xl:w-[300px] 2xl:w-[250px] hd:w-[210px] hdplus:w-[270px] lg:w-[200px]" />
          <p className="font-urbanistSemiBold text-sm 4xl:text-2xl 3xl:text-xl 2xl:text-base">Expires in: 2:59 min</p>
        </div>
        
        <AddButtonSecondary label="Refresh QR" onClick={handleClick} />
      </div>
    </div>
  );
};

export default Qrcode;
