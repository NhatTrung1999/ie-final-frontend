import { CardHeader } from '../../../common';
import { Div } from '../../../ui';
import { FaTrash } from 'react-icons/fa';

const HistoryPlayback = ({
  historyPlaybackHeight,
}: {
  historyPlaybackHeight: number;
}) => {
  return (
    <Div
      className="bg-white shadow-2xs rounded-md flex flex-col"
      style={{ height: historyPlaybackHeight }}
    >
      <CardHeader title="History Playback" />
      <Div className=" flex-1 flex flex-col p-1 overflow-y-auto gap-1">
        {Array(5)
          .fill(undefined)
          .map((_, index) => (
            <Div
              key={index}
              className="flex items-center p-1 bg-amber-400 gap-1 rounded-md text-white cursor-pointer"
            >
              <Div className="flex-1 bg-gray-500 text-center px-2 py-1 rounded-md text-lg font-semibold">
                00:00
              </Div>
              <Div className="flex-1 bg-gray-500 text-center px-2 py-1 rounded-md text-lg font-semibold">
                00:10
              </Div>
              <Div className="flex-1 bg-gray-500 text-center px-2 py-1 rounded-md text-lg font-semibold">
                NVA - 2s
              </Div>
              <Div className="p-2 bg-gray-500 rounded-md">
                <FaTrash size={20} />
              </Div>
            </Div>
          ))}
      </Div>
    </Div>
  );
};

export default HistoryPlayback;
