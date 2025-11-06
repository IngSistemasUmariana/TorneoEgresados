// src/modules/register/components/InputField.tsx
import { ReactNode } from "react";

interface Props {
  icon?: ReactNode;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const InputField: React.FC<Props> = ({
  icon,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
}) => (
  <div>
    <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>
    <div className="relative">
      {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</span>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full ${icon ? "pl-10" : "pl-4"} pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 outline-none text-sm`}
        placeholder={placeholder}
      />
    </div>
  </div>
);
