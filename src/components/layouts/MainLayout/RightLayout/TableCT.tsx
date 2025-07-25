import React, { Fragment, useEffect } from 'react';
import type {
  ITablectData,
  ITablectHeader,
  ITablectPayload,
} from '../../../../types';
import { CardHeader } from '../../../common';
import { Button, Div } from '../../../ui';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  createTableCt,
  deleteTablect,
  getTablect,
  setActiveColId,
  setUpdateTablect,
} from '../../../../features/tablect/tablectSlice';
import {
  setActiveItemId,
  setVideoPath,
} from '../../../../features/stagelist/stagelistSlice';
import { toast } from 'react-toastify';
import {
  createHistoryPlayback,
  getHistoryPlayback,
} from '../../../../features/historyplayback/historyPlaybackSlice';
import {
  setCurrentTime,
  setDuration,
  setIsPlaying,
  setLastElapsedTime,
  setResetTypes,
} from '../../../../features/ctrlpanel/ctrlpanelSlice';
import type { AxiosResponse } from 'axios';
import axiosConfig from '../../../../services/axiosConfig';

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
  const { activeItemId, activeTabId, search } = useAppSelector(
    (state) => state.stagelist
  );

  const { history_playback } = useAppSelector((state) => state.historyPlayback);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getTablects = async () => {
      await dispatch(getTablect(search || {}));
    };

    getTablects();
  }, [dispatch, search]);

  const handleColumnClick = (
    e: React.MouseEvent<HTMLTableCellElement>,
    colId: string | null
  ) => {
    e.stopPropagation();

    if (activeItemId && colId) {
      const itemTablect = tablect.find(
        (item) => item.id_video === activeItemId
      );
      const isValidNVA = itemTablect?.nva.cts.every((value) => value > 0);
      const isValidVA = itemTablect?.va.cts.every((value) => value > 0);
      const colRowId = colId.split('-')[0];
      if (activeItemId === Number(colRowId)) {
        if (colId === activeColId || (isValidNVA && isValidVA)) {
          dispatch(setActiveColId(null));
        } else {
          dispatch(setActiveColId(colId));
        }
        dispatch(setIsPlaying(false))
      }
    }
  };

  const handleRowClick = (item: ITablectData) => {
    if (activeItemId === item.id_video) {
      dispatch(setVideoPath(''));
      dispatch(setActiveItemId(null));
      dispatch(setCurrentTime(0));
      dispatch(setDuration(0));
    } else {
      dispatch(setVideoPath(item.video_path as string));
      dispatch(setActiveItemId(item.id_video));
    }
    dispatch(setActiveColId(null));
    dispatch(setResetTypes({ NVA: 0, VA: 0, SKIP: 0 }));
    dispatch(setLastElapsedTime(0));
    dispatch(setIsPlaying(false));
  };

  const handleDoneClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    item: ITablectData
  ) => {
    e.stopPropagation();

    if (!item) return;

    const isCheckValueCT1 = item.nva.cts[0] === 0 && item.va.cts[0] === 0;
    if (isCheckValueCT1) {
      toast.warn('Please enter your value CT1');
      return;
    }

    dispatch(
      setUpdateTablect({
        id_video: item.id_video,
        col_index: 0,
        nva_time: item.nva.cts[0],
        va_time: item.va.cts[0],
        is_update_all_cts: true,
      })
    );

    dispatch(setActiveItemId(null));
    dispatch(setActiveColId(null));
    dispatch(setVideoPath(''));
    dispatch(setCurrentTime(0));
    dispatch(setDuration(0));
  };

  // const handleDeleteClick = async (
  //   e: React.MouseEvent<HTMLButtonElement>,
  //   item: ITablectData
  // ) => {
  //   e.stopPropagation();
  //   console.log(item);

  //   if (item.confirm === '') {
  //     toast.warn('Please confirm before delete!');
  //     return;
  //   }
  //   await dispatch(deleteTablect(item.id_video));
  //   await dispatch(setActiveItemId(null));
  //   await dispatch(setActiveColId(null));
  //   await dispatch(getTablect(search || {}));
  //   await dispatch(getHistoryPlayback(search || {}));
  //   await dispatch(setVideoPath(''));
  // };

  const handleConfirm = async () => {
    const confirmTablect: ITablectPayload[] = tablect.map((item) => ({
      ...item,
      nva: JSON.stringify(item.nva),
      va: JSON.stringify(item.va),
      confirm: user?.account || '',
      video_path: item.video_path,
    }));

    await dispatch(createTableCt(confirmTablect));
    await dispatch(createHistoryPlayback(history_playback));
    await dispatch(getTablect(search || {}));
    await dispatch(getHistoryPlayback(search || {}));
  };

  const handleSaveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    console.log('save');
  }

  const hasAllCTValues = (item: ITablectData) => {
    return (
      item.nva.cts.every((item) => item > 0) &&
      item.va.cts.every((item) => item > 0)
    );
  };

  const handleExportExcelTimeStudy = async () => {
    const itemTablect = tablect.every((item) => item.confirm !== '');
    if (itemTablect) {
      try {
        const response: AxiosResponse<Blob> = await axiosConfig.get(
          '/export-excel/export-excel-time-study',
          {
            responseType: 'blob',
            params: { ...search },
          }
        );

        const url = URL.createObjectURL(new Blob([response.data]));

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Excel TimeStudy.xlsx');
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.warning('Please enter your id confirm!');
    }
  };

  const handleExportExcelLSA = async () => {
    const itemTablect = tablect.every((item) => item.confirm !== '');
    if (itemTablect) {
      try {
        const response: AxiosResponse<Blob> = await axiosConfig.get(
          '/export-excel/export-excel-lsa',
          {
            responseType: 'blob',
            params: search,
          }
        );

        const url = URL.createObjectURL(new Blob([response.data]));

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Excel LSA.xlsx');
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.warning('Please enter your id confirm!');
    }
  };

  const handleRefresh = async () => {
    await dispatch(getTablect(search || {}));
  };

  return (
    <Div
      className="bg-white rounded-md flex flex-col overflow-x-auto"
      style={{ height: tableCtHeight }}
    >
      <CardHeader
        title="Table CT"
        isShowButton={true}
        isShowIconRefresh={true}
        handleConfirm={handleConfirm}
        handleExportExcelTimeStudy={handleExportExcelTimeStudy}
        handleExportExcelLSA={handleExportExcelLSA}
        handleRefresh={handleRefresh}
      />
      <Div
        className=" flex-1 overflow-x-auto"
        style={{ maxWidth: tableCtWidth - 24 }}
      >
        <table className="table-auto w-full min-w-max">
          <thead className="sticky top-0 bg-gray-300 z-10 shadow-[0_2px_4px_-1px_rgba(0,0,0,0.1)]">
            <tr>
              {header.map((item, index) => (
                <React.Fragment key={index}>
                  <th className="border border-gray-500 border-t-0 border-l-0 px-2 py-1">
                    {item.no}
                  </th>
                  <th className="border border-gray-500 border-t-0 px-2 py-1">
                    {item.progressStagePartName}
                  </th>
                  <th className="border border-gray-500 border-t-0 px-2 py-1">
                    {item.type}
                  </th>
                  {Array.from({ length: item.cts }).map((_, i) => (
                    <th
                      key={i}
                      className="border border-gray-500 border-t-0 px-2 py-1"
                    >
                      CT{i + 1}
                    </th>
                  ))}
                  <th className="border border-gray-500 border-t-0 px-2 py-1">
                    {item.average}
                  </th>
                  <th className="border border-gray-500 border-t-0 px-2 py-1">
                    {item.confirm}
                  </th>
                  <th className="border border-gray-500 border-t-0 border-r-0 px-2 py-1">
                    {item.action}
                  </th>
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {tablect
              .filter((t) => t.area.toLowerCase() === activeTabId.toLowerCase())
              .map((item) => (
                <Fragment key={item.id_video}>
                  <tr
                    className={`${
                      activeItemId === item.id_video ? 'bg-gray-400' : ''
                    } cursor-pointer`}
                    onClick={() => handleRowClick(item)}
                  >
                    <td
                      className="border border-gray-500 text-center border-l-0"
                      rowSpan={2}
                    >
                      {item.no}
                    </td>
                    <td
                      className="border border-gray-500 text-center"
                      rowSpan={2}
                    >
                      {item.progress_stage_part_name}
                    </td>
                    <td className="border border-gray-500 text-center">
                      {item.nva?.type}
                    </td>
                    {item.nva?.cts.map((ct, index) => (
                      <td
                        key={index}
                        onClick={(e) =>
                          handleColumnClick(e, `${item.id_video}-${index}`)
                        }
                        className={`border border-gray-500 text-center ${
                          activeColId === `${item.id_video}-${index}`
                            ? 'bg-yellow-200'
                            : ''
                        }`}
                      >
                        {ct}
                      </td>
                    ))}
                    <td className="border border-gray-500 text-center">
                      {item.nva?.average}
                    </td>
                    <td
                      className="border border-gray-500 text-center"
                      rowSpan={2}
                    >
                      {item.confirm}
                    </td>
                    <td
                      className="border border-gray-500 text-center border-r-0"
                      rowSpan={2}
                    >
                      {hasAllCTValues(item) ? (
                        <Button
                          className="bg-blue-500 px-2 py-0.5 rounded-md text-white cursor-pointer font-medium"
                          // handleClick={(e) => handleDeleteClick(e, item)}
                          handleClick={(e) => handleSaveClick(e)}
                        >
                          Save
                        </Button>
                      ) : (
                        <Button
                          className="bg-green-500 px-2 py-0.5 rounded-md text-white cursor-pointer font-medium"
                          handleClick={(e) => handleDoneClick(e, item)}
                        >
                          Done
                        </Button>
                      )}
                    </td>
                  </tr>
                  <tr
                    className={`${
                      activeItemId === item.id_video ? 'bg-gray-400' : ''
                    } cursor-pointer`}
                    onClick={() => handleRowClick(item)}
                  >
                    <td className="border border-gray-500 text-center">
                      {item.va?.type}
                    </td>
                    {item.va?.cts.map((ct, index) => (
                      <td
                        key={index}
                        onClick={(e) =>
                          handleColumnClick(e, `${item.id_video}-${index}`)
                        }
                        className={`border border-gray-500 text-center ${
                          activeColId === `${item.id_video}-${index}`
                            ? 'bg-yellow-200'
                            : ''
                        }`}
                      >
                        {ct}
                      </td>
                    ))}
                    <td className="border border-gray-500 text-center">
                      {item.va?.average}
                    </td>
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
