import type { ICommonProps } from '../../types';

const Div = ({
  style,
  className,
  children,
  ref,
  onMouseDown,
  onMouseMove,
  onMouseLeave,
  onMouseUp,
  onClick,
}: ICommonProps<HTMLDivElement | null>) => {
  return (
    <div
      ref={ref}
      style={style}
      className={className}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Div;
