import Qrcode from "@/components/ui/qr-code";

const Qr = () => {
  return (
    // <div className="col-start-9 row-start-4 col-span-3 row-span-5 2xl:row-span-6 w-full h-full">
    <div className="h-[65%] lg:h-full lg:mt-0 rounded-2xl relative md:p-0 lg:ps-3 lg:pt-4 3xl:ps-5 4xl:ps-10 4xl:pt-7 4xl:pe-2 col-start-9 row-start-3 col-span-3 row-span-7 w-full">
      <Qrcode />
    </div>
  );
};

export default Qr;