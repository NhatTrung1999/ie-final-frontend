import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setDiffTypes } from '../../../../features/ctrlpanel/ctrlpanelSlice';
import { deleteHistoryPlayback } from '../../../../features/historyplayback/historyPlaybackSlice';
import { usePlayer } from '../../../../hooks/usePlayer';
import type { IHistoryPlayback } from '../../../../types';
import { formatTime } from '../../../../utils/formatTime';
import { CardHeader } from '../../../common';
import { Div } from '../../../ui';
import { FaTrash } from 'react-icons/fa';

const HistoryPlayback = ({
  historyPlaybackHeight,
}: {
  historyPlaybackHeight: number;
}) => {
  const { playerRef } = usePlayer();
  const { history_playback } = useAppSelector((state) => state.historyPlayback);
  // const { types } = useAppSelector((state) => state.ctrlpanel);
  const dispatch = useAppDispatch();

  const handleSeekTo = (item: IHistoryPlayback) => {
    if (playerRef.current) {
      playerRef.current.seekTo(item.start_time, 'seconds');
    }
  };

  const handleDeleteHistoryPlayback = (
    e: React.MouseEvent<HTMLDivElement | null>,
    item: IHistoryPlayback
  ) => {
    e.stopPropagation();
    const time = item.end_time - item.start_time;
    // console.log(item);
    dispatch(setDiffTypes({ type: item.type, time: Math.floor(time) }));
    dispatch(deleteHistoryPlayback(item.id_historyplayback));
  };
  // console.log(history_playback);

  return (
    <Div
      className="bg-white shadow-2xs rounded-md flex flex-col"
      style={{ height: historyPlaybackHeight }}
    >
      <CardHeader title="History Playback" />
      <Div className=" flex-1 flex flex-col p-1 overflow-y-auto gap-1">
        {history_playback.map((item, index) => (
          <Div
            key={index}
            className="flex items-center p-1 bg-amber-400 gap-1 rounded-md text-white cursor-pointer"
            onClick={() => handleSeekTo(item)}
          >
            <Div className="flex-1 bg-gray-500 text-center px-2 py-1 rounded-md text-lg font-semibold">
              {formatTime(item.start_time)}
            </Div>
            <Div className="flex-1 bg-gray-500 text-center px-2 py-1 rounded-md text-lg font-semibold">
              {formatTime(item.end_time)}
            </Div>
            <Div className="flex-1 bg-gray-500 text-center px-2 py-1 rounded-md text-lg font-semibold">
              {item.type}
            </Div>
            <Div
              className="p-2 bg-gray-500 rounded-md"
              onClick={(e) => handleDeleteHistoryPlayback(e, item)}
            >
              <FaTrash size={20} />
            </Div>
          </Div>
        ))}
      </Div>
    </Div>
  );
};

export default HistoryPlayback;
