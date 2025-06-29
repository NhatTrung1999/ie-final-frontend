import { useEffect } from 'react';
import { Div, Header } from '../ui';
import { useAppDispatch } from '../../app/hooks';
import { fetchVideo } from '../../features/stagelist/stagelistSlice';

const HeaderLayout = ({ headerHeight }: { headerHeight: number }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchVideo());
  }, []);
  return (
    <Header style={{ height: headerHeight }} className="px-2 pt-2">
      <Div className="bg-teal-400 h-full rounded-md flex items-center justify-between px-2">
        <Div className="text-2xl font-semibold text-white text-shadow-2xs">
          IE Video CT System
        </Div>
        <Div className="flex items-center gap-2 bg-gray-400 rounded-full pl-3">
          <Div className="text-lg font-semibold text-white">Administrator</Div>
          <Div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-9"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z"
                clipRule="evenodd"
              />
            </svg>
          </Div>
        </Div>
      </Div>
    </Header>
  );
};

export default HeaderLayout;
