import React, { useRef, useState } from 'react';
import { CardHeader, Modal } from '../../../common';
import { Div } from '../../../ui';

const arrList: string[] = [
  'C1. React',
  'C2. HTML',
  'C3. JavaScript',
  'C4. Css',
  'C5. HTML',
  'C6. TypeScript',
];

const StageList = ({ stageListHeight }: { stageListHeight: number }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const scrollLeftStart = useRef<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

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

  return (
    <>
      <Div
        className="bg-white shadow-2xs rounded-md flex flex-col"
        style={{ height: stageListHeight }}
      >
        <CardHeader title="StageList" isShowIcon={true} setIsOpen={setIsOpen} />
        <Div
          ref={scrollRef}
          className="overflow-x-hidden px-3 flex flex-nowrap gap-3 py-1 cursor-grab bg-[#aaa]"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
        >
          <Div className="bg-amber-200 px-2 py-1 rounded-md uppercase font-semibold">
            Cutting
          </Div>
          <Div className="bg-amber-200 px-2 py-1 rounded-md uppercase font-semibold">
            Stitching
          </Div>
          <Div className="bg-amber-200 px-2 py-1 rounded-md uppercase font-semibold">
            Assembly
          </Div>
          <Div className="bg-amber-200 px-2 py-1 rounded-md uppercase font-semibold">
            Stockfitting
          </Div>
          <Div className="bg-amber-200 px-2 py-1 rounded-md uppercase font-semibold">
            Nosew
          </Div>
        </Div>
        <Div className=" flex-1 overflow-y-auto bg-yellow-200 flex flex-col gap-1 rounded-b-md">
          {arrList.map((item, index) => (
            <Div
              key={index}
              className="bg-white px-3 py-1 flex flex-row justify-between items-center cursor-pointer"
            >
              <Div className="text-lg font-medium">{item}</Div>
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
            </Div>
          ))}
        </Div>
      </Div>

      {isOpen && <Modal setIsOpen={setIsOpen} />}
    </>
  );
};

export default StageList;
