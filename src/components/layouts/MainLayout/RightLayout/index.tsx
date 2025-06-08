import { Div } from '../../../ui';
import Player from './Player';
import TableCT from './TableCT';

const RightLayout = ({
  rightWidth,
  rightHeight,
}: {
  rightWidth: number;
  rightHeight: number;
}) => {
  const tableCtHeight = rightHeight / 3;
  const playerHeight = rightHeight - tableCtHeight;
  return (
    <Div style={{ width: rightWidth }} className="flex flex-col gap-2">
      <Player playerHeight={playerHeight} />
      <TableCT tableCtHeight={tableCtHeight} tableCtWidth={rightWidth} />
    </Div>
  );
};

export default RightLayout;
