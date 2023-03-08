import { Check } from "react-feather";


interface CheckboxProps {
  id: number;
  isChecked: boolean;
  onChange?: (isChecked: boolean) => void;
}

function Checkbox({ isChecked, id, onChange }: CheckboxProps) {

    const handleCheckboxChange = () => {
      onChange && onChange(!isChecked);
    };

    return (
      <div className="relative">
        <input
          type="checkbox"
          name={`${id}`}
          id={`${id}`}
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="opacity-0 absolute cursor-pointer w-0 h-0"
        />
        <label
          htmlFor={`${id}`}
          className={`w-5 h-5 flex items-center transition justify-center rounded-full border border-slate-400 cursor-pointer ${
            isChecked ? "bg-gray-500" : ""
          }`}
        >
          {isChecked && <Check className="text-white w-4" />}
        </label>
      </div>
    );
}

export default Checkbox;
