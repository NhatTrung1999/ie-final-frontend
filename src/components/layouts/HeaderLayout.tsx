import { useEffect, useState } from 'react';
import { Button, Div, Form, Header, Input, Option, Select } from '../ui';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  getVideo,
  setActiveItemId,
  setSearch,
  setVideoPath,
} from '../../features/stagelist/stagelistSlice';
import { logout } from '../../features/auth/authSlice';
import { useForm, type SubmitHandler } from 'react-hook-form';
import type { ISearch } from '../../types';
import {
  getTablect,
  setActiveColId,
} from '../../features/tablect/tablectSlice';
import { getHistoryPlayback } from '../../features/historyplayback/historyPlaybackSlice';
import {
  setCurrentTime,
  setDuration,
  setIsPlaying,
  setResetTypes,
} from '../../features/ctrlpanel/ctrlpanelSlice';

const HeaderLayout = ({ headerHeight }: { headerHeight: number }) => {
  const { register, handleSubmit, setValue } = useForm<ISearch>();
  const { search } = useAppSelector((state) => state.stagelist);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [isLogout, setIsLogout] = useState(false);

  useEffect(() => {
    if (search) {
      dispatch(getVideo({ ...search, account: user?.account }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (search) {
      setValue('date_from', search.date_from);
      setValue('date_to', search.date_to);
      setValue('season', search.season);
      setValue('stage', search.stage);
      setValue('area', search.area);
      setValue('article', search.article);
    }
  }, [search, setValue]);

  const handleIsLogout = () => {
    setIsLogout(!isLogout);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const onSubmit: SubmitHandler<ISearch> = async (data) => {
    await dispatch(getVideo({ ...data, account: user?.account }));
    await dispatch(getTablect({ ...data, account: user?.account }));
    await dispatch(getHistoryPlayback({ ...data, account: user?.account }));
    await dispatch(setSearch({ ...data, account: user?.account }));
    await dispatch(setVideoPath(''));
    await dispatch(setActiveItemId(null));
    await dispatch(setCurrentTime(0));
    await dispatch(setDuration(0));
    await dispatch(setActiveColId(null));
    await dispatch(setResetTypes({ NVA: 0, VA: 0, SKIP: 0 }));
    await dispatch(setIsPlaying(false));
  };

  return (
    <Header style={{ height: headerHeight }} className="px-2 pt-2">
      <Div className="bg-[#2C3E50] h-full rounded-md flex items-center justify-between px-2">
        <Div className="text-2xl font-semibold text-white text-shadow-2xs">
          IE Video CT System
        </Div>
        <Form
          className="flex gap-2 items-center flex-nowrap overflow-x-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input type="date" {...register('date_from')} />
          <Input type="date" {...register('date_to')} />
          <Input placeholder="Search season..." {...register('season')} />
          <Select {...register('stage')}>
            <Option value="" name="---Choose Option---" />
            <Option value="Pullover" name="Pullover" />
            <Option value="CR0" name="CR0" />
            <Option value="CR1" name="CR1" />
            <Option value="CR2" name="CR2" />
            <Option value="SMS" name="SMS" />
            <Option value="CS1" name="CS1" />
            <Option value="CS2" name="CS2" />
            <Option value="CS3" name="CS3" />
            <Option value="MASSPRODUCTION" name="MASS PRODUCTION" />
            <Option value="Customer" name="Customer" />
          </Select>
          <Select {...register('area')}>
            <Option value="" name="---Choose Option---" />
            <Option value="CUTTING" name="CUTTING" />
            <Option value="STITCHING" name="STITCHING" />
            <Option value="ASSEMBLY" name="ASSEMBLY" />
            <Option value="STOCKFITTING" name="STOCKFITTING" />
            <Option value="NOSEW" name="NOSEW" />
          </Select>
          <Input placeholder="Search article..." {...register('article')} />
          <Button
            className="px-3 py-1.5 bg-[#A3C9A8] rounded-md text-white font-semibold cursor-pointer"
            type="submit"
          >
            Search
          </Button>
        </Form>
        <Div className="relative">
          <Div
            className="flex items-center gap-2 bg-gray-400 rounded-full pl-3 cursor-pointer"
            onClick={handleIsLogout}
          >
            <Div className="text-lg font-semibold text-white select-none">
              {user?.name}
            </Div>
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
          {isLogout && (
            <Div className="min-h-7 bg-white absolute right-0 w-full top-10 rounded-md p-2 z-30">
              <Div
                className="font-medium cursor-pointer select-none hover:bg-gray-300"
                onClick={handleLogout}
              >
                Logout
              </Div>
            </Div>
          )}
        </Div>
      </Div>
    </Header>
  );
};

export default HeaderLayout;
