import { useEffect, useState } from 'react';
import { Button, Div, Header, Input, Option, Select } from '../ui';
import { useAppDispatch } from '../../app/hooks';
import { fetchVideo } from '../../features/stagelist/stagelistSlice';
import { logout } from '../../features/auth/authSlice';

const HeaderLayout = ({ headerHeight }: { headerHeight: number }) => {
  const dispatch = useAppDispatch();
  const [isLogout, setIsLogout] = useState(false);

  useEffect(() => {
    dispatch(fetchVideo());
  }, []);

  const handleIsLogout = () => {
    setIsLogout(!isLogout);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Header style={{ height: headerHeight }} className="px-2 pt-2">
      <Div className="bg-teal-400 h-full rounded-md flex items-center justify-between px-2">
        <Div className="text-2xl font-semibold text-white text-shadow-2xs">
          IE Video CT System
        </Div>
        <Div className="flex gap-2 items-center flex-nowrap overflow-x-auto">
          <Input type="date" />
          <Input type="date" />
          <Input placeholder="Search season..." />
          <Select>
            <Option value="" name="---Choose Option---" />
            <Option value="Pullover" name="Pullover" />
            <Option value="CR0" name="CR0" />
            <Option value="CR1" name="CR1" />
            <Option value="CR2" name="CR2" />
            <Option value="SMS" name="SMS" />
            <Option value="CS1" name="CS1" />
            <Option value="CS2" name="CS2" />
            <Option value="Customer" name="Customer" />
          </Select>
          <Select>
            <Option value="" name="---Choose Option---" />
            <Option value="CUTTING" name="CUTTING" />
            <Option value="STITCHING" name="STITCHING" />
            <Option value="ASSEMBLY" name="ASSEMBLY" />
            <Option value="STOCKFITTING" name="STOCKFITTING" />
            <Option value="NOSEW" name="NOSEW" />
          </Select>
          <Input placeholder="Search article..." />
          <Button className="px-2 py-1 bg-blue-500 rounded-md text-white font-semibold cursor-pointer">
            Search
          </Button>
        </Div>
        <Div className="relative">
          <Div
            className="flex items-center gap-2 bg-gray-400 rounded-full pl-3 cursor-pointer"
            onClick={handleIsLogout}
          >
            <Div className="text-lg font-semibold text-white select-none">
              Administrator
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
