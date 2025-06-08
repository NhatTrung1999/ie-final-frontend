import type { ICommonProps } from '../../types';

const Label = ({ className, style, children, htmlFor }: ICommonProps) => {
  return (
    <label htmlFor={htmlFor} className={className} style={style}>
      {children}
    </label>
  );
};

export default Label;
