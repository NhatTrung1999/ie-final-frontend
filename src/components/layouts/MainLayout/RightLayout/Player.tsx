import ReactPlayer from 'react-player';
import { Div } from '../../../ui';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  setCurrentTime,
  setDuration,
} from '../../../../features/ctrlpanel/ctrlpanelSlice';

const Player = ({ playerHeight }: { playerHeight: number }) => {
  const { videoPath } = useAppSelector((state) => state.area);
  const { isPlaying } = useAppSelector((state) => state.ctrlpanel);

  const dispatch = useAppDispatch();

  return (
    <Div className="bg-black" style={{ height: playerHeight }}>
      <ReactPlayer
        url={videoPath}
        playing={isPlaying}
        style={{ objectFit: 'contain' }}
        width={'100%'}
        height={playerHeight}
        controls
        muted
        onDuration={(duration: number) => dispatch(setDuration(duration))}
        onProgress={(state: { playedSeconds: number }) =>
          dispatch(setCurrentTime(state.playedSeconds))
        }
        progressInterval={100}
      />
    </Div>
  );
};

export default Player;
