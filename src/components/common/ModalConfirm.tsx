import { Button, Div } from '../ui';

const ModalConfirm = ({
  idDel,
  handleConfirm,
  setIsOpenDel,
}: {
  idDel: number
  handleConfirm: (id: number) => void
  setIsOpenDel: (isOpenDel: boolean) => void;
}) => {
  return (
    <Div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <Div className="relative p-4 w-full max-w-md max-h-full">
        <Div className="relative bg-white rounded-lg shadow-sm">
          <Div className="flex flex-col items-center justify-between gap-3 p-4 md:p-5 rounded-t border-gray-200">
            <Div className="text-lg text-center">
              Do you want to delete this data?
            </Div>
            <Div className="flex items-center justify-center gap-2">
              <Button handleClick={() => handleConfirm(idDel)} className="bg-blue-500 px-2 py-1 text-white rounded-md cursor-pointer font-semibold">
                Confirm
              </Button>
              <Button
                handleClick={() => setIsOpenDel(false)}
                className="bg-red-500 px-2 py-1 text-white rounded-md cursor-pointer font-semibold"
              >
                Close
              </Button>
            </Div>
          </Div>
        </Div>
      </Div>
    </Div>
  );
};

export default ModalConfirm;
