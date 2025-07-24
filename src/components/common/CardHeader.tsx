import { Div } from '../ui';
import Button from '../ui/Button';

const CardHeader = ({
  title,
  isShowIcon = false,
  isShowButton = false,
  isShowIconRefresh = false,
  setIsOpen,
  handleConfirm,
  handleExportExcelTimeStudy,
  handleExportExcelLSA,
  handleRefresh,
}: {
  title: string;
  isShowIcon?: boolean;
  isShowButton?: boolean;
  isShowIconRefresh?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
  handleConfirm?: () => void;
  handleExportExcelTimeStudy?: () => void;
  handleExportExcelLSA?: () => void;
  handleRefresh?: () => void;
}) => {
  return (
    <Div className="bg-[#2C3E50] flex justify-between items-center p-3 rounded-t-md">
      <Div className="text-lg font-semibold text-white">{title}</Div>
      <Div className="flex items-center gap-2">
        {isShowIconRefresh && (
          <Button
            className="cursor-pointer"
            type="button"
            handleClick={handleRefresh}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#fff"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </Button>
        )}
        {isShowIcon && (
          <Button
            type="button"
            className="cursor-pointer"
            handleClick={() => setIsOpen?.(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="#ffffff"
              className="size-6 cursor-pointer"
            >
              <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
            </svg>
          </Button>
        )}
        {isShowButton && (
          <Div className="flex items-center gap-2">
            <Button
              handleClick={handleConfirm}
              className="bg-blue-500 font-semibold px-3 py-1 rounded-md text-white cursor-pointer"
            >
              Confirm
            </Button>
            <Button
              handleClick={handleExportExcelLSA}
              className="bg-green-500 font-semibold px-3 py-1 rounded-md text-white cursor-pointer"
            >
              Excel LSA
            </Button>
            <Button
              handleClick={handleExportExcelTimeStudy}
              className="bg-green-500 font-semibold px-3 py-1 rounded-md text-white cursor-pointer"
            >
              Excel TimeStudy
            </Button>
          </Div>
        )}
      </Div>
    </Div>
  );
};

export default CardHeader;
