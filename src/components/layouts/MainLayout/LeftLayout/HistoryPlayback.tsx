import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setDiffTypes } from '../../../../features/ctrlpanel/ctrlpanelSlice';
import {
  deleteHistoryPlayback,
  getHistoryPlayback,
} from '../../../../features/historyplayback/historyPlaybackSlice';
import { usePlayer } from '../../../../hooks/usePlayer';
import type { IHistoryPlayback } from '../../../../types';
import { formatTime } from '../../../../utils/formatTime';
import { CardHeader } from '../../../common';
import { Button, Div } from '../../../ui';
import { FaTrash } from 'react-icons/fa';

const HistoryPlayback = ({
  historyPlaybackHeight,
}: {
  historyPlaybackHeight: number;
}) => {
  const { playerRef } = usePlayer();
  const { history_playback } = useAppSelector((state) => state.historyPlayback);
  const { activeItemId, search } = useAppSelector((state) => state.stagelist);
  const { tablect } = useAppSelector((state) => state.tablect);
  const { user } = useAppSelector((state) => state.auth);
  // const { types } = useAppSelector((state) => state.ctrlpanel);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getHistoryPlaybacks = async () => {
      await dispatch(getHistoryPlayback({ ...search, account: user?.account }));
    };
    getHistoryPlaybacks();
  }, [dispatch]);

  const handleSeekTo = (item: IHistoryPlayback) => {
    if (playerRef.current) {
      playerRef.current.seekTo(item.start_time, 'seconds');
    }
  };

  const handleDeleteHistoryPlayback = (
    e: React.MouseEvent<HTMLButtonElement | null>,
    item: IHistoryPlayback
  ) => {
    e.stopPropagation();
    console.log(item);
    const time = item.end_time - item.start_time;
    console.log(item.end_time, item.start_time);
    // dispatch(setDiffTypes({ type: item.type, time: Math.floor(time) }));
    // dispatch(deleteHistoryPlayback(item.id_historyplayback));
  };

  const hasAllCTValues = () => {
    const item = tablect.find((tc) => tc.id_video === activeItemId);
    if (item) {
      return (
        item.nva.cts.every((ct) => ct > 0) && item.va.cts.every((ct) => ct > 0)
      );
    }
  };

  return (
    <Div
      className="bg-white shadow-2xs rounded-md flex flex-col"
      style={{ height: historyPlaybackHeight }}
    >
      <CardHeader title="History Playback" />
      <Div className=" flex-1 flex flex-col p-1 overflow-y-auto gap-1">
        {history_playback
          .filter((hp) => hp.id_tablect === activeItemId)
          .map((item, index) => (
            <Div
              key={index}
              className="flex items-center p-1 bg-slate-300 gap-1 rounded-md text-white cursor-pointer"
              onClick={() => handleSeekTo(item)}
            >
              <Div className="flex-1 bg-gray-600 text-center px-2 py-1 rounded-md text-lg font-semibold">
                {formatTime(item.start_time)}
              </Div>
              <Div className="flex-1 bg-gray-600 text-center px-2 py-1 rounded-md text-lg font-semibold">
                {formatTime(item.end_time)}
              </Div>
              <Div className="flex-1 bg-gray-600 text-center px-2 py-1 rounded-md text-lg font-semibold">
                {item.type}
              </Div>
              <Button
                disabled={hasAllCTValues()}
                className="p-2 bg-gray-600 rounded-md"
                handleClick={(e) => handleDeleteHistoryPlayback(e, item)}
              >
                <FaTrash size={20} />
              </Button>
            </Div>
          ))}
      </Div>
    </Div>
  );
};

export default HistoryPlayback;
