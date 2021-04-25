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
    <div className="flex flex-col w-full input">
      <label id={`inputLabel-${label}`} htmlFor={`input-${label}`} className="font-semibold">{label}</label>
      <input type={inputType} name={`input-${label}`} id={`input-${label}`} value={value} placeholder={placeholder} onChange={onChange} className="w-full border-2 px-s py-xs border-skin-neutral text-skin-neutral" />
    </div>
  );
}

export default Input;
