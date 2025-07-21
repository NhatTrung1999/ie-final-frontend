import useWindowSize from '../../hooks/useWindowSize';
import { Div } from '../ui';
import HeaderLayout from './HeaderLayout';
import MainLayout from './MainLayout';

const AppLayout = () => {
  const { width, height } = useWindowSize();

  const headerHeight = height / 13;
  const mainHeight = height - headerHeight;

  return (
    <Div style={{ height }} className="bg-[#efefef] flex flex-col gap-2">
      <HeaderLayout headerHeight={headerHeight} />
      <MainLayout mainHeight={mainHeight} mainWidth={width} />
    </Div>
  );
};

export default AppLayout;
