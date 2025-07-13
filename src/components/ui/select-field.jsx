import { ChevronDown } from "lucide-react";

const SelectField = ({
  label,
  value,
  onChange,
  options,
  className = "",
  labelClass = "",
  selectClass = "",
  iconClass = "",
  id,
  name,
  disabled = false,
}) => {
  return (
    <div className={`w-full mt[-10px] ${className}`}>
      {label && (
        <label
          htmlFor={id || name}
          className={`block text-white font-urbanistMedium 2xl:text-sm mb-[2px] 3xl:mb-2 4xl:mb-3 2xl:mb-2 text-base 4xl:text-[26px] 3xl:text-[18px] hd:text-sm xl:text-sm lg:text-xs ${labelClass}`}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={id || name}
          name={name}
          value=""
          onChange={onChange}
          disabled={disabled}
          className={`w-full appearance-none p-2 pr-10 4xl:p-4 3xl:p-3 rounded bg-white/10 border border-white/20 text-white font-urbanistRegular text-sm 2xl:text-sm 4xl:text-xl ${selectClass}`}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            color: "white",
          }}
        >
          {options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              style={{ backgroundColor: "#131313", color: "white" }}
            >
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-1 flex items-center pointer-events-none">
          <ChevronDown className={`text-white/70 w-5 4xl:w-71 ${iconClass}`} />
        </div>
      </div>
    </div>
  );
};

export default SelectField;
