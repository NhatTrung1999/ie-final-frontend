import React from 'react';

interface InputProps {
  style?: React.CSSProperties;
  className?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  id?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  style,
  className,
  placeholder,
  type,
  value,
  id,
  onChange,
  ...rest
}: InputProps) => {
  return (
    <input
      type={type}
      className={`outline-none p-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 bg-white ${className}`}
      style={style}
      value={value}
      id={id}
      onChange={onChange}
      placeholder={placeholder}
      {...rest}
    />
  );
};

export default Input;
