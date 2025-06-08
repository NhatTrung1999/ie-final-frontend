import React from 'react';

interface IOptionProps {
  className?: string;
  style?: React.CSSProperties;
  value?: string;
  name?: string;
}

const Option = ({ className, style, value, name }: IOptionProps) => {
  return (
    <option className={className} style={style} value={value}>
      {name}
    </option>
  );
};

export default Option;
