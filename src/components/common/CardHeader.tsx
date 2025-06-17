import { Div } from '../ui';
import Button from '../ui/Button';

const CardHeader = ({
  title,
  isShowIcon = false,
  isShowButton = false,
  setIsOpen,
}: {
  title: string;
  isShowIcon?: boolean;
  isShowButton?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}) => {
  return (
    <Div className="bg-amber-400 flex justify-between items-center p-3 rounded-t-md">
      <Div className="text-lg font-semibold text-white">{title}</Div>
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
          <Button className="bg-blue-500 font-semibold px-3 py-1 rounded-md text-white cursor-pointer">
            Confirm
          </Button>
          <Button className="bg-green-500 font-semibold px-3 py-1 rounded-md text-white cursor-pointer">
            Excel LSA
          </Button>
          <Button className="bg-green-500 font-semibold px-3 py-1 rounded-md text-white cursor-pointer">
            Excel TimeStudy
          </Button>
        </Div>
      )}
    </Div>
  );
};

export default CardHeader;
