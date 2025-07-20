import React from 'react';

interface InputProps {
  style?: React.CSSProperties;
  className?: string;
  placeholder?: string;
  type?: string;
  value?: any;
  id?: string;
  autoComplete?: string;
  ariaInvalid?: boolean | 'true' | 'false' | 'grammar' | 'spelling' | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  style,
  className,
  placeholder,
  type,
  value,
  id,
  autoComplete,
  ariaInvalid,
  onChange,
  ...rest
}: InputProps) => {
  return (
    <input
      type={type}
      className={`outline-none px-3 py-1.5 border border-[#D1D5DB] rounded-lg text-gray-900 placeholder-gray-300 bg-white ${className}`}
      style={style}
      value={value}
      id={id}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete={autoComplete}
      aria-invalid={ariaInvalid}
      {...rest}
    />
  );
};

export default Input;
