import type { IGroupTablect, ITablectResponse } from "../types";

export const groupTablect = (data: ITablectResponse[]): IGroupTablect[] => {
    const groupTablect = data.reduce<Record<string, IGroupTablect>>((acc, curr) => {
      const key = `${curr.id_video}_${curr.no}_${curr.progress_stage_part_name}_${curr.confirm}_${curr.created_at}`;

      if (!acc[key]) {
        acc[key] = {
          id: curr.id_video,
          no: curr.no,
          progress_stage_part_name: curr.progress_stage_part_name,
          confirm: curr.confirm,
          created_at: curr.created_at,
          nva: null,
          va: null,
        };
      }

      const entry = {
        average: curr.average,
        cts: curr.cts,
      };

      if (curr.type === 'nva') {
        acc[key].nva = entry;
      } else if (curr.type === 'va') {
        acc[key].va = entry;
      }

      return acc;
    }, {});

    return Object.values(groupTablect);
}