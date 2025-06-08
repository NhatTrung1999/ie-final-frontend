import type { ICommonProps } from '../../types';

const Header = ({ style, className, children }: ICommonProps) => {
  return (
    <header style={style} className={className}>
      {children}
    </header>
  );
};

export default Header;
