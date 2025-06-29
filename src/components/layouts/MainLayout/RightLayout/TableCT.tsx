import React, { Fragment } from 'react';
import type { ITablectHeader } from '../../../../types';
import { CardHeader } from '../../../common';
import { Button, Div } from '../../../ui';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setActiveColId } from '../../../../features/tablect/tablectSlice';
import { setActiveItemId } from '../../../../features/stagelist/stagelistSlice';

const header: ITablectHeader[] = [
  {
    no: 'No',
    progressStagePartName: 'Progress Stage Part Name',
    type: 'Type',
    cts: 10,
    average: 'Average',
    confirm: 'Confirm',
    action: 'Action',
  },
];

const TableCT = ({
  tableCtHeight,
  tableCtWidth,
}: {
  tableCtHeight: number;
  tableCtWidth: number;
}) => {
  const { tablect, activeColId } = useAppSelector((state) => state.tablect);
  const { activeItemId } = useAppSelector((state) => state.stagelist);
  const dispatch = useAppDispatch();

  const handleColumnClick = (
    e: React.MouseEvent<HTMLTableCellElement>,
    colId: string | null
  ) => {
    e.stopPropagation();
    // console.log(colId);
    dispatch(setActiveColId(colId));
  };

  return (
    <Div
      className="bg-white rounded-md flex flex-col overflow-x-auto"
      style={{ height: tableCtHeight }}
    >
      <CardHeader title="Table CT" isShowButton={true} />
      <Div
        className=" flex-1 overflow-x-auto"
        style={{ maxWidth: tableCtWidth - 24 }}
      >
        <table className="table-auto w-full min-w-max">
          <thead className="sticky top-0 bg-white z-10 shadow-[0_2px_4px_-1px_rgba(0,0,0,0.1)]">
            <tr>
              {header.map((item, index) => (
                <React.Fragment key={index}>
                  <th className="border border-t-0 border-l-0 px-2 py-1">
                    {item.no}
                  </th>
                  <th className="border border-t-0 px-2 py-1">
                    {item.progressStagePartName}
                  </th>
                  <th className="border border-t-0 px-2 py-1">{item.type}</th>
                  {Array.from({ length: item.cts }).map((_, i) => (
                    <th key={i} className="border border-t-0 px-2 py-1">
                      CT{i + 1}
                    </th>
                  ))}
                  <th className="border border-t-0 px-2 py-1">
                    {item.average}
                  </th>
                  <th className="border border-t-0 px-2 py-1">
                    {item.confirm}
                  </th>
                  <th className="border border-t-0 border-r-0 px-2 py-1">
                    {item.action}
                  </th>
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {tablect.map((item) => (
              <Fragment key={item.id_video}>
                <tr
                  className={`${
                    activeItemId === item.id_video ? 'bg-gray-400' : ''
                  } cursor-pointer`}
                  onClick={() =>
                    dispatch(
                      setActiveItemId(
                        item.id_video === activeItemId ? null : item.id_video
                      )
                    )
                  }
                >
                  <td className="border text-center border-l-0" rowSpan={2}>
                    {item.no}
                  </td>
                  <td className="border text-center" rowSpan={2}>
                    {item.progress_stage_part_name}
                  </td>
                  <td className="border text-center">{item.nva?.type}</td>
                  {item.nva?.cts.map((ct, index) => (
                    <td
                      key={index}
                      onClick={(e) =>
                        handleColumnClick(
                          e,
                          `${item.id_video}-${index}` === activeColId
                            ? null
                            : `${item.id_video}-${index}`
                        )
                      }
                      className={`border text-center ${
                        activeColId === `${item.id_video}-${index}`
                          ? 'bg-yellow-200'
                          : ''
                      }`}
                    >
                      {ct}
                    </td>
                  ))}
                  <td className="border text-center">{item.nva?.average}</td>
                  <td className="border text-center" rowSpan={2}>
                    {item.confirm}
                  </td>
                  <td className="border text-center border-r-0" rowSpan={2}>
                    <Button className="bg-green-500 px-2 py-0.5 rounded-md text-white cursor-pointer font-medium">
                      Save
                    </Button>
                  </td>
                </tr>
                <tr
                  className={`${
                    activeItemId === item.id_video ? 'bg-gray-400' : ''
                  } cursor-pointer`}
                  onClick={() =>
                    dispatch(
                      setActiveItemId(
                        item.id_video === activeItemId ? null : item.id_video
                      )
                    )
                  }
                >
                  <td className="border text-center">{item.va?.type}</td>
                  {item.va?.cts.map((ct, index) => (
                    <td
                      key={index}
                      onClick={(e) =>
                        handleColumnClick(
                          e,
                          `${item.id_video}-${index}` === activeColId
                            ? null
                            : `${item.id_video}-${index}`
                        )
                      }
                      className={`border text-center ${
                        activeColId === `${item.id_video}-${index}`
                          ? 'bg-yellow-200'
                          : ''
                      }`}
                    >
                      {ct}
                    </td>
                  ))}
                  <td className="border text-center">{item.va?.average}</td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </Div>
    </Div>
  );
};

export default TableCT;
