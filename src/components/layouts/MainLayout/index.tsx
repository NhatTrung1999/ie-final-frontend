import { Main } from '../../ui';
import LeftLayout from './LeftLayout';
import RightLayout from './RightLayout';

const MainLayout = ({
  mainHeight,
  mainWidth,
}: {
  mainHeight: number;
  mainWidth: number;
}) => {
  const leftWidth = mainWidth / 4;
  const rightWidth = mainWidth - leftWidth;
  return (
    <Main
      style={{ height: mainHeight, width: mainWidth }}
      className="flex gap-2 px-2 pb-2"
    >
      <LeftLayout leftWidth={leftWidth} leftHeight={mainHeight} />
      <RightLayout rightWidth={rightWidth} rightHeight={mainHeight} />
    </Main>
  );
};

export default MainLayout;
