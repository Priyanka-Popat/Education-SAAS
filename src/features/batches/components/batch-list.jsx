import { PencilLine, ArrowRight, ArrowUpRight } from "lucide-react";

const BatchList = ({ batches = [], selectedBatchId, onSelect }) => {
  return (
    <ul className="space-y-2">
      {batches.map((batch) => (
        <div className="flex items-center gap-x-2" key={batch.id}>
          <div className="p-2 rounded-full border border-secondary">
            <PencilLine size={16} />
          </div>
          <li
            onClick={() => onSelect(batch.id)}
            className={`flex items-center w-full justify-between gap-2 px-4 py-2 rounded-lg cursor-pointer transition-colors ${
              selectedBatchId === batch.id
                ? "bg-secondary"
                : "bg-white/5 hover:bg-white/10"
            } text-white`}
          >
            {batch.batchName}
            {selectedBatchId === batch.id ? (
              <ArrowRight size={16} />
            ) : (
              <ArrowUpRight size={16} />
            )}
          </li>
        </div>
      ))}
    </ul>
  );
};

export default BatchList;
