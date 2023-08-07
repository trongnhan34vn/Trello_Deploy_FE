import { Listbox, Popover, Transition } from '@headlessui/react';
import React, { Fragment, useContext, useState } from 'react';
import ViewType from './ViewType/ViewType';
import { SubnavContext } from '../DetailProject/DetailProject';

export interface ViewItems {
  name: string;
  icon: string;
  type: string;
}

export const viewItems: ViewItems[] = [
  {
    name: 'Bảng',
    icon: 'fa-solid fa-chart-bar',
    type: 'card'
  },
  {
    name: 'Bảng',
    icon: 'fa-solid fa-table-list',
    type: 'table',
  },
];

const ViewTypeComp = () => {
  const [activeBtn, setActiveBtn] = useState<boolean>(false);
  const subNavContext = useContext(SubnavContext);
  const typeView = subNavContext ? subNavContext.viewType : null;
  return (
    <Listbox value={typeView} onChange={subNavContext?.setViewType}>
      {({ open }) => (
        <>
          <Listbox.Button
            onClick={() => setActiveBtn((pre) => !pre)}
            className={`${
              activeBtn
                ? 'bg-[#fff] text-[#000]'
                : 'text-[#fff] hover:bg-[#A6C5E229]'
            } h-[34.5px]  rounded-[3px] transition-all ease-in duration-150 py-[6px] px-3 text-[15px]  flex items-center`}
          >
            <i className={`mr-1 ${typeView?.icon}`}></i>
            <span className="mr-2">{typeView?.name}</span>
            <i className="fa-solid fa-caret-down"></i>
          </Listbox.Button>
          <ViewType viewItems={viewItems} open={open} setActiveBtn={setActiveBtn} />
        </>
      )}
    </Listbox>
  );
};

export default ViewTypeComp;
