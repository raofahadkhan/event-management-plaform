import React from "react";

interface InputCompPropType {
  name: string;
  type: string;
  placeholder: string;
}

const Input: React.FC<InputCompPropType> = ({ name, type, placeholder }) => {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      className="w-full text-[12px] p-[10px]"
    />
  );
};

export default Input;
