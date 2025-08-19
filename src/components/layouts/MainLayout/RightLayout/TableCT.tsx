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
  confirmTableCt,
  // createTableCt,
  deleteTablect,
  getTablect,
  saveTablect,
  setActiveColId,
  // setUpdateTablect,
  setUpdateTablectWithoutFormula,
} from '../../../../features/tablect/tablectSlice';
import {
  setActiveItemId,
  setVideoPath,
} from '../../../../features/stagelist/stagelistSlice';
import { toast } from 'react-toastify';
import {
  saveHistoryPlayback,
  getHistoryPlayback,
} from '../../../../features/historyplayback/historyPlaybackSlice';
import {
  setCurrentTime,
  setDuration,
  setIsPlaying,
  // setLastElapsedTime,
  setResetTypes,
  setStartTime,
} from '../../../../features/ctrlpanel/ctrlpanelSlice';
import type { AxiosResponse } from 'axios';
import axiosConfig from '../../../../services/axiosConfig';
import Select from 'react-select';

const header: ITablectHeader[] = [
  {
    no: 'No',
    progressStagePartName: 'Progress Stage Part Name',
    type: 'Type',
    cts: 10,
    average: 'Average',
    machine_type: 'Machine Type',
    confirm: 'Confirm',
    action: 'Action',
  },
];

const options = [
  { value: 'chocolate', label: 'Attaching eyestay  擦胶贴眼片(Dán đệm đế)' },
  { value: 'strawberry', label: 'Marking 画线(Định vị)' },
  { value: 'vanilla', label: 'Pressing for heel後踵定型机 ' },
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
      await dispatch(getTablect({ ...search, account: user?.account }));
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
      const isValidNVA = itemTablect?.nva.cts.some((value) => value > 0);
      const isValidVA = itemTablect?.va.cts.some((value) => value > 0);
      const colRowId = colId.split('-')[0];
      if (activeItemId === Number(colRowId)) {
        if (colId === activeColId || (isValidNVA && isValidVA)) {
          dispatch(setActiveColId(null));
        } else {
          dispatch(setActiveColId(colId));
        }
        dispatch(setIsPlaying(false));
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
    // dispatch(setLastElapsedTime(0));
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

    // dispatch(
    //   setUpdateTablect({
    // id_video: item.id_video,
    // col_index: 0,
    // nva_time: item.nva.cts[0],
    // va_time: item.va.cts[0],
    // is_update_all_cts: true,
    //   })
    // );

    dispatch(
      setUpdateTablectWithoutFormula({
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

  const handleDeleteClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
    item: ITablectData
  ) => {
    e.stopPropagation();
    await dispatch(deleteTablect(item.id_video));
    await dispatch(setActiveItemId(null));
    await dispatch(setActiveColId(null));
    await dispatch(getTablect({ ...search, account: user?.account }));
    await dispatch(getHistoryPlayback({ ...search, account: user?.account }));
    await dispatch(setVideoPath(''));
  };

  const handleConfirm = async () => {
    if (tablect.length === 0) {
      toast.warning('No data available to confirm!');
      return;
    }

    const isCheckSave = tablect.some((item) => item.is_save === false);

    if (isCheckSave) {
      toast.warning('Please save all data before confirming!');
      return;
    }

    const confirmTablectData: ITablectPayload[] = tablect
      .filter((item) => item.confirm === '')
      .map((item) => ({
        ...item,
        nva: JSON.stringify(item.nva),
        va: JSON.stringify(item.va),
        confirm: user?.account || '',
      }));
    // console.log(confirmTablectData);
    await dispatch(confirmTableCt(confirmTablectData));
    await dispatch(getTablect({ ...search, account: user?.account }));
    await dispatch(getHistoryPlayback({ ...search, account: user?.account }));
  };

  const handleSaveClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
    item: ITablectData
  ) => {
    e.stopPropagation();
    const saveTablectData: ITablectPayload = {
      ...item,
      nva: JSON.stringify(item.nva),
      va: JSON.stringify(item.va),
      is_save: true,
      created_by: user?.account || '',
    };
    // console.log(tablect);
    await dispatch(saveTablect(saveTablectData));
    await dispatch(saveHistoryPlayback(history_playback));
    await dispatch(getTablect({ ...search, account: user?.account }));
    await dispatch(getHistoryPlayback({ ...search, account: user?.account }));
  };

  const hasAllCTValues = (item: ITablectData) => {
    // return (
    //   item.nva.cts.every((item) => item > 0) &&
    //   item.va.cts.every((item) => item > 0)
    // );
    return item.nva.average > 0 && item.va.average > 0;
  };

  const handleExportExcelTimeStudy = async () => {
    const itemTablect = tablect.every((item) => item.confirm !== '');
    if (itemTablect) {
      try {
        const response: AxiosResponse<Blob> = await axiosConfig.get(
          '/export-excel/export-excel-time-study',
          {
            responseType: 'blob',
            params: { ...search, account: user?.account },
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
            params: { ...search, account: user?.account },
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
    await dispatch(getTablect({ ...search, account: user?.account }));
    await dispatch(getHistoryPlayback({ ...search, account: user?.account }));
    await dispatch(setActiveItemId(null));
    await dispatch(setActiveColId(null));
    // await dispatch(setLastElapsedTime(0));
    await dispatch(setCurrentTime(0));
    await dispatch(setStartTime(0));
    await dispatch(setResetTypes({ NVA: 0, VA: 0, SKIP: 0 }));
    await dispatch(setVideoPath(''));
    await dispatch(setDuration(0));
    await dispatch(setIsPlaying(false));
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
                    {item.machine_type}
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
                      className="border border-gray-500 text-center p-1"
                      rowSpan={2}
                    >
                      <Select options={options} />
                    </td>
                    <td
                      className="border border-gray-500 text-center"
                      rowSpan={2}
                    >
                      {item.confirm}
                    </td>
                    <td
                      className="border border-gray-500 text-center border-r-0 p-1"
                      rowSpan={2}
                    >
                      {hasAllCTValues(item) ? (
                        item.is_save ? (
                          <Button
                            className="bg-red-500 px-2 py-0.5 rounded-md text-white cursor-pointer font-medium"
                            handleClick={(e) => handleDeleteClick(e, item)}
                          >
                            Delete
                          </Button>
                        ) : (
                          <Button
                            className="bg-blue-500 px-2 py-0.5 rounded-md text-white cursor-pointer font-medium"
                            // handleClick={(e) => handleDeleteClick(e, item)}
                            handleClick={(e) => handleSaveClick(e, item)}
                          >
                            Save
                          </Button>
                        )
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
