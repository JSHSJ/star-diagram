import React from 'react';

type value = number | string;

interface InputProps {
  inputType: 'text' | 'number';
  label: string;
  placeholder?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: value;
}

const Input: React.FC<InputProps> = ({label, inputType, placeholder, onChange, value}) => {


  return (
    <div className="input flex flex-col w-full">
      <label id={`inputLabel-${label}`} htmlFor={`input-${label}`} className="text-lg font-bold">{label}</label>
      <input type={inputType} name={`input-${label}`} id={`input-${label}`} value={value} placeholder={placeholder} onChange={onChange} className="border-2 border-skin-neutral text-skin-neutral text-lg p-2 focus:bg-skin-mutedLight focus:outline-none focus:ring-1 focus:ring-skin-neutral w-full" />
    </div>
  );
}

export default Input;
