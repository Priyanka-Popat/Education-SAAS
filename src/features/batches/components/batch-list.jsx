import { PencilLine, ArrowRight, ArrowUpRight } from "lucide-react";

const BatchList = ({ batches = [], selectedBatchId, onSelect, onEdit }) => {

  return (
    <div className="relative max-h-[430px] 4xl:max-h-[775px] 3xl:max-h-[540px] hdplus:max-h-[485px] hd:max-h-[380px] 2xl:max-h-[540px] lg:max-h-[380px] overflow-y-auto scrollbar-thin">
    <ul className="space-y-2">
      {batches.map((batch) => (
        <div className="flex items-center gap-x-2" key={batch.id}>
          <button
              onClick={() => onEdit(batch)}
              className="relative btn-slide p-2.5 4xl:p-4 3xl:p-3 2xl:p-3 rounded-full border border-secondary transition-colors duration-300 text-white group"
            >
              <span className="relative z-10 flex items-center justify-center">
                <PencilLine className="w-5 h-5 4xl:w-6 4xl:h-6 ..." />
              </span>
            </button>
          <li
            onClick={() => onSelect(batch.id)}
            className={`flex items-center w-full justify-between gap-2 px-4 py-3 4xl:py-4 4xl:px-6 2xl:py-3 2xl:px-4 hd:py-2 hd:px-4 lg:py-2 text-sm 4xl:text-2xl 3xl:text-xl hd:text-sm 2xl:text-base rounded-lg cursor-pointer transition-colors ${
              selectedBatchId === batch.id
                ? "bg-secondary"
                : "bg-white/5 hover:bg-white/10"
            } text-white`}
          >
            {batch.batchName}
            {selectedBatchId === batch.id ? (
              <ArrowRight className="w-5 h-5 4xl:w-6 4xl:h-6 3xl:w-5 3xl:h-5 2xl:w-4 2xl:h-4 lg:w-4 lg:h-4" />
            ) : (
              <ArrowUpRight className="w-5 h-5 4xl:w-6 4xl:h-6 3xl:w-5 3xl:h-5 2xl:w-4 2xl:h-4 lg:w-4 lg:h-4" />
            )}
          </li>
        </div>
      ))}
    </ul>
    </div>
  );
};

export default BatchList;
