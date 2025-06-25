import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  setCurrentTime,
  setIsPlaying,
  setLastElapsedTime,
  setStartTime,
  setStopTime,
  setTypes,
} from '../../../../features/ctrlpanel/ctrlpanelSlice';
import { usePlayer } from '../../../../hooks/usePlayer';
import { formatTime } from '../../../../utils/formatTime';
import { CardHeader } from '../../../common';
import { Button, Div, Input } from '../../../ui';
import { FaPlay, FaCheck, FaPause } from 'react-icons/fa';

const ControlPanel = ({
  controlPanelHeight,
}: {
  controlPanelHeight: number;
}) => {
  const { playerRef } = usePlayer();
  const {
    duration,
    isPlaying,
    currentTime,
    startTime,
    types,
    lastElapsedTime,
  } = useAppSelector((state) => state.ctrlpanel);
  const dispatch = useAppDispatch();

  const handleStartStop = () => {
    if (!isPlaying) {
      dispatch(setStartTime(currentTime));
      console.log('Start time:', currentTime);
      dispatch(setIsPlaying(true));
    } else {
      dispatch(setStopTime(currentTime));
      const elapsedTime = currentTime - startTime;
      dispatch(setLastElapsedTime(elapsedTime));
      console.log('Stop time: ', currentTime);
      dispatch(setIsPlaying(false));
    }
    // dispatch(setIsPlaying(!isPlaying));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    dispatch(setCurrentTime(newTime));
    if (playerRef.current) {
      playerRef.current.seekTo(newTime, 'seconds');
    }
  };

  const handleTypesClick = (type: 'NVA' | 'VA' | 'SKIP') => {
    console.log(type);
    dispatch(setTypes({ type, time: lastElapsedTime }));
  };

  return (
    <Div
      className="bg-white shadow-2xs rounded-md flex flex-col"
      style={{ height: controlPanelHeight }}
    >
      <CardHeader title="Control Panel" />
      <Div className=" flex-1 flex flex-col justify-between p-1 gap-1">
        <Div className="flex-1 flex items-center gap-1">
          <Div className="bg-gray-400 text-center flex-1 p-1 rounded-md text-lg font-semibold text-white">
            {formatTime(currentTime)}
          </Div>
          <Button
            type="button"
            handleClick={handleStartStop}
            className={`${
              isPlaying ? 'bg-red-500' : 'bg-blue-500'
            } cursor-pointer flex-1 p-1 rounded-md text-lg font-semibold text-white flex items-center justify-center gap-2`}
          >
            {isPlaying ? (
              <>
                <FaPause />
                Stop
              </>
            ) : (
              <>
                <FaPlay />
                Start
              </>
            )}
          </Button>
          <Button className="bg-green-500 cursor-pointer flex-1 p-1 rounded-md text-lg font-semibold text-white flex items-center justify-center gap-2">
            <FaCheck />
            Done
          </Button>
        </Div>
        <Div className="flex-1 flex items-center gap-1">
          <Button
            handleClick={() => handleTypesClick('NVA')}
            className="bg-gray-500 cursor-pointer flex-1 p-1 rounded-md text-lg font-semibold text-white flex gap-1 items-center"
          >
            <Div className="flex-1">NVA</Div>
            <Div className="bg-white flex-1 rounded-md text-black">
              {types.NVA}
            </Div>
          </Button>
          <Button
            handleClick={() => handleTypesClick('VA')}
            className="bg-gray-500 cursor-pointer flex-1 p-1 rounded-md text-lg font-semibold text-white flex gap-1 items-center"
          >
            <Div className="flex-1">VA</Div>
            <Div className="bg-white flex-1 rounded-md text-black">
              {types.VA}
            </Div>
          </Button>
          <Button
            handleClick={() => handleTypesClick('SKIP')}
            className="bg-gray-500 cursor-pointer flex-1 p-1 rounded-md text-lg font-semibold text-white flex gap-1 items-center"
          >
            <Div className="flex-1">SKIP</Div>
            <Div className="bg-white flex-1 rounded-md text-black">
              {types.SKIP}
            </Div>
          </Button>
        </Div>
        <Div className=" flex-1 flex items-center bg-gray-400 gap-3 px-3 rounded-md">
          <Div className="text-lg font-semibold text-white">
            {formatTime(currentTime)}
          </Div>
          <Input
            type="range"
            className="flex-1 accent-amber-50 bg-white"
            style={{ padding: 0 }}
            value={currentTime}
            {...{ max: duration, step: 0.01 }}
            onChange={handleChange}
          />
          <Div className="text-lg font-semibold text-white">
            {formatTime(duration)}
          </Div>
        </Div>
      </Div>
    </Div>
  );
};

export default ControlPanel;
