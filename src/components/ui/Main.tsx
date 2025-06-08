import type { ICommonProps } from "../../types";

const Main = ({ style, className, children }: ICommonProps) => {
  return (
    <main style={style} className={className}>
      {children}
    </main>
  );
};

export default Main;
