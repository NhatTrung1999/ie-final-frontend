import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  setCurrentTime,
  setIsPlaying,
  setLastElapsedTime,
  setResetTypes,
  setStartTime,
  setStopTime,
  setTypes,
} from '../../../../features/ctrlpanel/ctrlpanelSlice';
import { setHistoryPlayback } from '../../../../features/historyplayback/historyPlaybackSlice';
import { setUpdateTablect } from '../../../../features/tablect/tablectSlice';
import { usePlayer } from '../../../../hooks/usePlayer';
import type { IHistoryPlayback } from '../../../../types';
import { formatTime } from '../../../../utils/formatTime';
import { CardHeader } from '../../../common';
import { Button, Div, Input } from '../../../ui';
import { FaPlay, FaCheck, FaPause } from 'react-icons/fa';
import { debounce } from '../../../../utils/debounce';

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
  const { activeColId } = useAppSelector((state) => state.tablect);
  const { activeItemId } = useAppSelector((state) => state.stagelist);
  const { history_playback } = useAppSelector((state) => state.historyPlayback);
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const handleStartStop = () => {
    if (!isPlaying) {
      dispatch(setStartTime(currentTime));
      dispatch(setIsPlaying(true));
      if (playerRef.current) {
        playerRef.current.seekTo(currentTime, 'seconds');
        playerRef.current.getInternalPlayer().play();
      }
      // console.log('startTime: ', startTime);
    } else {
      // console.log('endTime', currentTime);
      dispatch(setStopTime(currentTime));
      const elapsedTime = currentTime - startTime;
      dispatch(setLastElapsedTime(elapsedTime));
      dispatch(setIsPlaying(false));
    }
  };

  const debounceToast = debounce(() => {
    toast.warn("You can't rewind while the video is playing!");
  }, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isPlaying) {
      debounceToast();
      return;
    }
    const newTime = Number(e.target.value);
    dispatch(setCurrentTime(newTime));
    if (playerRef.current) {
      playerRef.current.seekTo(newTime, 'seconds');
      // dispatch(setLastElapsedTime(0))
    }
  };

  const handleClickTypes = (type: 'NVA' | 'VA' | 'SKIP') => {
    // console.log(activeItemId);
    if (isPlaying) {
      toast.warn('Cannot select status while the video is playing!');
      return;
    }

    const newHistoryPlayback: IHistoryPlayback = {
      id_historyplayback: `${activeItemId}${history_playback.length}`,
      id_tablect: activeItemId,
      start_time: startTime,
      end_time: currentTime,
      type,
      created_by: user?.account || 'unknown',
      created_at: new Date().toISOString(),
    };

    dispatch(setTypes({ type, time: lastElapsedTime }));
    dispatch(setHistoryPlayback(newHistoryPlayback));
  };

  const handleClickDone = () => {
    if (activeColId && activeItemId) {
      if (isPlaying) {
        toast.warn('Cannot done while the video is playing!');
        return;
      }
      const [id_video, col_index] = activeColId.split('-').map(Number);
      dispatch(
        setUpdateTablect({
          id_video,
          col_index,
          nva_time: types.NVA,
          va_time: types.VA,
        })
      );
    }
    dispatch(setResetTypes({ NVA: 0, VA: 0, SKIP: 0 }));
  };

  return (
    <Div
      className="bg-white shadow-2xs rounded-md flex flex-col"
      style={{ height: controlPanelHeight }}
    >
      <CardHeader title="Control Panel" />
      <Div
        className={`flex-1 flex flex-col justify-between p-1 gap-1 ${
          !activeColId ? 'opacity-50' : ''
        }`}
      >
        <Div className="flex-1 flex items-center gap-1">
          <Div className="bg-gray-400 text-center flex-1 p-1 rounded-md text-lg font-semibold text-white">
            {formatTime(currentTime)}
          </Div>
          <Button
            disabled={!activeColId}
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
          <Button
            handleClick={handleClickDone}
            disabled={!activeColId}
            className="bg-green-500 cursor-pointer flex-1 p-1 rounded-md text-lg font-semibold text-white flex items-center justify-center gap-2"
          >
            <FaCheck />
            Done
          </Button>
        </Div>
        <Div className="flex-1 flex items-center gap-1">
          <Button
            disabled={!activeColId}
            handleClick={() => handleClickTypes('NVA')}
            className="bg-gray-500 cursor-pointer flex-1 p-1 rounded-md text-lg font-semibold text-white flex gap-1 items-center"
          >
            <Div className="flex-1">NVA</Div>
            <Div className="bg-white flex-1 rounded-md text-black">
              {types.NVA}
            </Div>
          </Button>
          <Button
            disabled={!activeColId}
            handleClick={() => handleClickTypes('VA')}
            className="bg-gray-500 cursor-pointer flex-1 p-1 rounded-md text-lg font-semibold text-white flex gap-1 items-center"
          >
            <Div className="flex-1">VA</Div>
            <Div className="bg-white flex-1 rounded-md text-black">
              {types.VA}
            </Div>
          </Button>
          <Button
            disabled={!activeColId}
            handleClick={() => handleClickTypes('SKIP')}
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
            {...{ max: duration, step: 0.01, disabled: !activeColId }}
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
