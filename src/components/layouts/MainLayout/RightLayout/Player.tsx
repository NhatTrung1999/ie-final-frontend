import ReactPlayer from 'react-player';
import { Div } from '../../../ui';
import url from '../../../../assets/video/C1. Mantra.mp4';

const Player = ({ playerHeight }: { playerHeight: number }) => {
  return (
    <Div className="bg-black" style={{ height: playerHeight }}>
      <ReactPlayer
        url={url}
        style={{ objectFit: 'contain' }}
        width={'100%'}
        height={playerHeight}
        controls
      />
    </Div>
  );
};

export default Player;
