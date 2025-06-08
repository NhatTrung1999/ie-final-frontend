import React from 'react';

interface IFormProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onSubmit?: () => void;
}

const Form = ({ children, className, style, onSubmit }: IFormProps) => {
  return (
    <form className={className} style={style} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default Form;
