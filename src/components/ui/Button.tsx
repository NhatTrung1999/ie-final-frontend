import type { ICommonProps } from '../../types';

const Button = ({ style, className, children, type }: ICommonProps) => {
  return (
    <button type={type} style={style} className={className}>
      {children}
    </button>
  );
};

export default Button;
