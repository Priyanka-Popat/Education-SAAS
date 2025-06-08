const Qrcode = () => {

  return (
    <div className="w-full h-full qr-code">
      <div className="p-5 flex flex-col gap-y-8 items-center justify-between h-full">
        <div className="flex flex-col gap-y-3 items-center justify-center">
          <p className="font-urbanistSemiBold text-sm">Scan to Mark</p>
          <img src="/assets/icons/qr.svg" alt="" className="w-60" />
          <p className="font-urbanistSemiBold text-sm">Expires in: 2:59 min</p>
        </div>
        <button className="font-urbanistMedium border-purple border w-fit px-3 bg-[#703ce92b] py-2 rounded-full text-sm">Refresh QR</button>
      </div>
    </div>
  );
};

export default Qrcode;
