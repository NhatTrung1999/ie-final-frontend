import { CardHeader } from '../../../common';
import { Button, Div } from '../../../ui';

const TableCT = ({
  tableCtHeight,
  tableCtWidth,
}: {
  tableCtHeight: number;
  tableCtWidth: number;
}) => {
  return (
    <Div
      className="bg-white rounded-md flex flex-col overflow-x-auto"
      style={{ height: tableCtHeight }}
    >
      <CardHeader title="Table CT" isShowButton={true} />
      <Div
        className=" flex-1 overflow-x-auto"
        style={{ maxWidth: tableCtWidth - 24 }}
      >
        <table className="table-auto w-full min-w-max">
          <thead className="sticky top-0 bg-white z-10 shadow-[0_2px_4px_-1px_rgba(0,0,0,0.1)]">
            <tr>
              <th className="border border-t-0 border-l-0 px-2 py-1">No</th>
              <th className="border border-t-0 px-2 py-1">
                Progress Stage Part Name
              </th>
              <th className="border border-t-0 px-2 py-1">Type</th>
              {Array.from({ length: 10 }).map((_, i) => (
                <th className="border border-t-0 px-2 py-1">CT{i + 1}</th>
              ))}
              <th className="border border-t-0 px-2 py-1">Average</th>
              <th className="border border-t-0 px-2 py-1">Confirm</th>
              <th className="border border-t-0 border-r-0 px-2 py-1">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border text-center border-l-0" rowSpan={2}>
                C1
              </td>
              <td className="border text-center" rowSpan={2}>
                Mantra
              </td>
              <td className="border text-center">NVA</td>
              <td className="border text-center">0</td>
              <td className="border text-center">0</td>
              <td className="border text-center">0</td>
              <td className="border text-center">0</td>
              <td className="border text-center">0</td>
              <td className="border text-center">0</td>
              <td className="border text-center">0</td>
              <td className="border text-center">0</td>
              <td className="border text-center">0</td>
              <td className="border text-center">0</td>
              <td className="border text-center">0</td>
              <td className="border text-center" rowSpan={2}>
                26324
              </td>
              <td className="border text-center border-r-0" rowSpan={2}>
                <Button className="bg-green-500 px-2 py-0.5 rounded-md text-white cursor-pointer font-medium">
                  Save
                </Button>
              </td>
            </tr>
            <tr>
              <td className="border text-center">VA</td>
              <td className="border text-center">0</td>
              <td className="border text-center">0</td>
              <td className="border text-center">0</td>
              <td className="border text-center">0</td>
              <td className="border text-center">0</td>
              <td className="border text-center">0</td>
              <td className="border text-center">0</td>
              <td className="border text-center">0</td>
              <td className="border text-center">0</td>
              <td className="border text-center">0</td>
              <td className="border text-center">0</td>
            </tr>

            <tr>
              <td className="border text-center border-l-0" rowSpan={2}>
                C1
              </td>
              <td className="border text-center" rowSpan={2}>
                Mantra
              </td>
              <td className="border text-center">NVA</td>
              <td className="border text-center">0</td>
              <td className="border text-center">0</td>
              <td className="border text-center">0</td>
              <td className="border text-center">0</td>
              <td className="border text-center">0</td>
              <td className="border text-center">0</td>
              <td className="border text-center">0</td>
              <td className="border text-center">0</td>
              <td className="border text-center">0</td>
              <td className="border text-center">0</td>
              <td className="border text-center">0</td>
              <td className="border text-center" rowSpan={2}>
                26324
              </td>
              <td className="border text-center border-r-0" rowSpan={2}>
                <Button className="bg-green-500 px-2 py-0.5 rounded-md text-white cursor-pointer font-medium">
                  Save
                </Button>
              </td>
            </tr>
            <tr>
              <td className="border text-center">VA</td>
              <td className="border text-center">0</td>
              <td className="border text-center">0</td>
              <td className="border text-center">0</td>
              <td className="border text-center">0</td>
              <td className="border text-center">0</td>
              <td className="border text-center">0</td>
              <td className="border text-center">0</td>
              <td className="border text-center">0</td>
              <td className="border text-center">0</td>
              <td className="border text-center">0</td>
              <td className="border text-center">0</td>
            </tr>
          </tbody>
        </table>
      </Div>
    </Div>
  );
};

export default TableCT;
