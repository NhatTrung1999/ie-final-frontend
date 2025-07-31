import React, { useRef, useState } from 'react';
import { CardHeader, Modal, ModalConfirm } from '../../../common';
import { Button, Div } from '../../../ui';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';

import type { ITablectData } from '../../../../types';
import {
  setActiveColId,
  setTablectData,
} from '../../../../features/tablect/tablectSlice';
import {
  getVideo,
  setActiveItemId,
  setActiveTabId,
  setVideoPath,
  type IStageListData,
} from '../../../../features/stagelist/stagelistSlice';
import { toast } from 'react-toastify';
import stagelistApi from '../../../../services/api/stagelistApi';
import {
  setCurrentTime,
  setDuration,
  setIsPlaying,
  setLastElapsedTime,
  setResetTypes,
} from '../../../../features/ctrlpanel/ctrlpanelSlice';

const StageList = ({ stageListHeight }: { stageListHeight: number }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const scrollLeftStart = useRef<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenDel, setIsOpenDel] = useState<boolean>(false);
  const [idDel, setIdDel] = useState<number | null>(null);

  const { stagelist, activeItemId, activeTabId, search } = useAppSelector(
    (state) => state.stagelist
  );
  const { tablect } = useAppSelector((state) => state.tablect);

  const stagelistItem = stagelist.filter(
    (st) => st.name.toLowerCase() === activeTabId.toLowerCase()
  );

  const dispatch = useAppDispatch();

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement | null>) => {
    isDragging.current = true;
    startX.current = e.pageX;
    if (scrollRef.current) {
      scrollLeftStart.current = scrollRef.current.scrollLeft;
      scrollRef.current.style.cursor = 'grabbing';
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement | null>) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX;
    const walk = (x - startX.current) * 1.5;
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeftStart.current - walk;
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab';
    }
  };

  const handleSelectedItem = (item: IStageListData) => {
    // const newTablect: ITableBody
    const isDuplicate = tablect.some((row) => row.id_video === item.id);
    if (isDuplicate) {
      dispatch(setVideoPath(item.video_path));
      return;
    }

    const newTablectData: ITablectData = {
      id_video: item.id,
      no: item.video_name.split('. ')[0] || 'Unknown',
      progress_stage_part_name: item.video_name.split('. ')[1] || 'Unknown',
      area: item.area,
      nva: {
        type: 'NVA',
        cts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        average: 0,
      },
      va: {
        type: 'VA',
        cts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        average: 0,
      },
      is_save: false,
      confirm: '',
      video_path: item.video_path || 'Unknown-video-path',
    };

    dispatch(setTablectData(newTablectData));
    dispatch(setVideoPath(item.video_path));
  };

  const handleConfirm = async (id: number) => {
    try {
      const item = tablect.filter((tc) => tc.id_video === id);
      if (item.length > 0) {
        toast.warn('Please delete row under the TableCT!', { delay: 100 });
        return;
      }
      await stagelistApi.deleteVideo(id);
      await dispatch(getVideo(search || {}));
      toast.success('Delete successful!');
      setIsOpenDel(false);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const handleDeleteVideo = (
    e: React.MouseEvent<HTMLButtonElement | undefined>,
    id: number
  ) => {
    e.stopPropagation();
    setIsOpenDel(true);
    setIdDel(id);
    // setIdDel(id);
    // toast(
    //   ({ closeToast }) => (
    //     <Div className="flex flex-col gap-2 justify-center flex-1 items-center">
    //       <Div className="text-lg text-center">
    //         Do you want to delete this data?
    //       </Div>
    //       <Div className="flex items-center justify-center gap-2">
    //         <Button
    //           handleClick={() => {
    //             handleConfirm(id);
    //             toast.dismiss();
    //           }}
    //           className="bg-blue-500 px-2 py-1 text-white rounded-md cursor-pointer font-semibold"
    //         >
    //           Confirm
    //         </Button>
    //         <Button
    //           handleClick={closeToast}
    //           className="bg-red-500 px-2 py-1 text-white rounded-md cursor-pointer font-semibold"
    //         >
    //           Close
    //         </Button>
    //       </Div>
    //     </Div>
    //   ),
    //   { autoClose: false, closeButton: false, position: 'top-center' }
    // );
  };

  const handleRefresh = async () => {
    await dispatch(getVideo(search || {}));
  };

  return (
    <>
      <Div
        className="bg-white shadow-2xs rounded-md flex flex-col"
        style={{ height: stageListHeight }}
      >
        <CardHeader
          title="StageList"
          isShowIcon={true}
          isShowIconRefresh={true}
          setIsOpen={setIsOpen}
          handleRefresh={handleRefresh}
        />
        <Div
          ref={scrollRef}
          className="overflow-x-hidden px-3 flex flex-nowrap gap-3 py-1 cursor-grab bg-[#aaa] select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
        >
          {stagelist.map((item) => (
            <Div
              key={item.name}
              className={`${
                item.name === activeTabId ? 'bg-white' : ''
              } px-2 py-1 rounded-md font-semibold`}
              onClick={() => {
                dispatch(setActiveItemId(null));
                dispatch(setActiveTabId(item.name));
              }}
            >
              {item.name}
            </Div>
          ))}
        </Div>
        <Div className=" flex-1 overflow-y-auto bg-[#F5F7FA] flex flex-col gap-1 rounded-b-md p-1">
          {stagelistItem[0].data.map((item, index) => (
            <Div
              key={index}
              className={`${
                item.id === activeItemId ? 'bg-white' : ''
              } hover:bg-gray-200 px-3 py-1 flex flex-row justify-between items-center cursor-pointer`}
              onClick={() => {
                if (item.id === activeItemId) {
                  dispatch(setActiveItemId(null));
                  dispatch(setVideoPath(''));
                  dispatch(setCurrentTime(0));
                  dispatch(setDuration(0));
                } else {
                  dispatch(setActiveItemId(item.id));
                }
                handleSelectedItem(item);
                dispatch(setActiveColId(null));
                dispatch(setResetTypes({ NVA: 0, VA: 0, SKIP: 0 }));
                dispatch(setLastElapsedTime(0));
                dispatch(setIsPlaying(false));
              }}
            >
              <Div className="text-lg font-medium">{item.video_name}</Div>
              <Button
                type="button"
                className="cursor-pointer opacity-0 hover:opacity-100"
                handleClick={(e) => handleDeleteVideo(e, item.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </Div>
          ))}
        </Div>
      </Div>

      {isOpen && <Modal setIsOpen={setIsOpen} />}
      {isOpenDel && (
        <ModalConfirm
          idDel={idDel as number}
          setIsOpenDel={setIsOpenDel}
          handleConfirm={handleConfirm}
        />
      )}
    </>
  );
};

export default StageList;
