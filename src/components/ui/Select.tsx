import React from 'react';

interface ISelectProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  name?: string;
  id?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select = ({
  className,
  style,
  children,
  id,
  name,
  onChange,
  ...rest
}: ISelectProps) => {
  return (
    <select
      name={name}
      id={id}
      style={style}
      className={`w-full outline-none px-2 py-1 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 bg-white ${className}`}
      onChange={onChange}
      {...rest}
    >
      {children}
    </select>
  );
};

export default Select;
