import type { ICommonProps } from '../../types';

interface IButtonProps extends ICommonProps {
  type?: 'submit' | 'reset' | 'button' | undefined;
  handleClick?: () => void;
}

const Button = ({
  style,
  className,
  children,
  type,
  handleClick,
}: IButtonProps) => {
  return (
    <button
      type={type}
      style={style}
      className={className}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
