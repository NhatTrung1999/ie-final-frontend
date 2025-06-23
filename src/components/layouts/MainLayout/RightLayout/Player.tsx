import ReactPlayer from 'react-player';
import { Div } from '../../../ui';
import { useAppSelector } from '../../../../app/hooks';

const Player = ({ playerHeight }: { playerHeight: number }) => {
  const { videoPath } = useAppSelector((state) => state.area);

  return (
    <Div className="bg-black" style={{ height: playerHeight }}>
      <ReactPlayer
        url={videoPath}
        style={{ objectFit: 'contain' }}
        width={'100%'}
        height={playerHeight}
        controls
        muted
      />
    </Div>
  );
};

export default Player;
