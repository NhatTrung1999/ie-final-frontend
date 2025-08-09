import ReactPlayer from 'react-player';
import { Div } from '../../../ui';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  setCurrentTime,
  setDuration,
} from '../../../../features/ctrlpanel/ctrlpanelSlice';
import { usePlayer } from '../../../../hooks/usePlayer';

const Player = ({ playerHeight }: { playerHeight: number }) => {
  const { videoPath } = useAppSelector((state) => state.stagelist);
  const { isPlaying } = useAppSelector((state) => state.ctrlpanel);
  const { playerRef } = usePlayer();

  const dispatch = useAppDispatch();

  return (
    <Div className="bg-black" style={{ height: playerHeight }}>
      <ReactPlayer
        ref={playerRef}
        url={videoPath}
        playing={isPlaying}
        style={{ objectFit: 'contain' }}
        width={'100%'}
        height={playerHeight}
        // controls
        muted
        onDuration={(duration: number) => dispatch(setDuration(duration))}
        onProgress={(state: { playedSeconds: number }) => {
          // console.log('progress: ', Number(state.playedSeconds.toFixed(2)));
          dispatch(setCurrentTime(Number(state.playedSeconds.toFixed(2))));
        }}
        progressInterval={100}
        onPause={() => {
          if(playerRef.current) {
            // console.log('pause', Number(playerRef.current.getCurrentTime().toFixed(2)));
            setCurrentTime(Number(playerRef.current.getCurrentTime().toFixed(2)))
          }
        }}
      />
    </Div>
  );
};

export default Player;
