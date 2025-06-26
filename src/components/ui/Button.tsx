import type { ICommonProps } from '../../types';

interface IButtonProps extends ICommonProps {
  type?: 'submit' | 'reset' | 'button' | undefined;
  handleClick?: () => void;
  disabled?: boolean;
}

const Button = ({
  style,
  className,
  children,
  type,
  handleClick,
  disabled,
}: IButtonProps) => {
  return (
    <button
      type={type}
      style={style}
      className={className}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
