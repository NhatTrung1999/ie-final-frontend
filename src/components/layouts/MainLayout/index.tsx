import { useRef } from 'react';
import { Main } from '../../ui';
import LeftLayout from './LeftLayout';
import RightLayout from './RightLayout';
import type ReactPlayer from 'react-player';
import { PlayerContext } from '../../../hooks/usePlayer';

const MainLayout = ({
  mainHeight,
  mainWidth,
}: {
  mainHeight: number;
  mainWidth: number;
}) => {
  const leftWidth = mainWidth / 4;
  const rightWidth = mainWidth - leftWidth;

  const playerRef = useRef<ReactPlayer | null>(null);

  return (
    <PlayerContext.Provider value={{ playerRef }}>
      <Main
        style={{ height: mainHeight, width: mainWidth }}
        className="flex gap-2 px-2 pb-2"
      >
        <LeftLayout leftWidth={leftWidth} leftHeight={mainHeight} />
        <RightLayout rightWidth={rightWidth} rightHeight={mainHeight} />
      </Main>
    </PlayerContext.Provider>
  );
};

export default MainLayout;
