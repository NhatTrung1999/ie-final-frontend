import { Div } from '../../../ui';
import ControlPanel from './ControlPanel';
import HistoryPlayback from './HistoryPlayback';
import StageList from './StageList';

const LeftLayout = ({
  leftWidth,
  leftHeight,
}: {
  leftWidth: number;
  leftHeight: number;
}) => {
  // const itemHeight = leftHeight / 3;
  const stageListHeight = leftHeight / 2 - 40;
  const controlPanelHeight = (leftHeight - stageListHeight) / 2 - 35;
  const historyPlaybackHeight =
    leftHeight - stageListHeight - controlPanelHeight;

  return (
    <Div style={{ width: leftWidth }} className="flex flex-col gap-2">
      <StageList stageListHeight={stageListHeight} />
      <ControlPanel controlPanelHeight={controlPanelHeight} />
      <HistoryPlayback historyPlaybackHeight={historyPlaybackHeight} />
    </Div>
  );
};

export default LeftLayout;
