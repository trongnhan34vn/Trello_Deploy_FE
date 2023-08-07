import { Popover, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import FilterDropDown from './FilterDrop/FilterDropDown';

const FilterComp = () => {
  const [activeBtn, setActiveBtn] = useState<boolean>(false);
  return (
    <Popover className="relative">
      <div className="border-r-[1px] border-r-[hsla(0,0%,100%,0.16)] w-[2px] h-4 absolute right-[15%] top-1/2 translate-y-[-50%]"></div>
      <Popover.Button
        onClick={() => setActiveBtn(true)}
        className={`${
          activeBtn
            ? 'bg-[#fff] text-[#000]'
            : 'text-[#fff] hover:bg-[#A6C5E229]'
        } rounded-[3px] transition-all ease-in duration-150 mr-5 py-[6px] px-3 text-[15px] flex items-center outline-none`}
      >
        <i className="fa-solid text-[14px] fa-filter mr-1"></i>
        <span>Lọc</span>
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        {/* Mark this component as `static` */}
        <Popover.Panel className="z-[999]">
          {({ close, open }) => (
            <FilterDropDown
              setActiveBtn={setActiveBtn}
              open={open}
              close={close}
            />
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default React.memo(FilterComp) ;
