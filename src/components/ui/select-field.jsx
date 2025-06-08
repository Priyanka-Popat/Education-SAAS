import { ChevronDown } from "lucide-react";

const SelectField = ({
  label,
  value,
  onChange,
  options,
  className = "",
  labelClass = "",
  selectClass = "",
  id,
  name,
  disabled = false,
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={id || name}
          className={`block text-white font-medium mb-2 ${labelClass}`}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={id || name}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full appearance-none p-2 pr-10 rounded bg-white/10 border border-white/20 text-white font-urbanistRegular text-sm ${selectClass}`}
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
        <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
          <ChevronDown size={18} className="text-white/70" />
        </div>
      </div>
    </div>
  );
};

export default SelectField;
