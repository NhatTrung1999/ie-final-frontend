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
    >
      {children}
    </div>
  );
};

export default Div;
