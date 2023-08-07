import { Listbox, Transition } from '@headlessui/react';
import React, { Fragment, useEffect } from 'react';
import { ViewItems } from '../ViewTypeComp';

interface ViewTypeProps {
  open: boolean;
  setActiveBtn: React.Dispatch<React.SetStateAction<boolean>>;
  viewItems: ViewItems[]
}

const ViewType = ({ open, setActiveBtn, viewItems }: ViewTypeProps) => {
  useEffect(() => {
    setActiveBtn(open)
  },[open])

  return (
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
      <Listbox.Options className="absolute z-[100] w-[200px] text-[#B6C2CF] left-[6.8rem] top-[calc(100%)] max-h-60 overflow-auto rounded-[3px] bg-[#282E33] py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
        <header className="text-center font-bold py-2 border-b-[0.5px] border-b-[#3C474F]">
          <h1>Lựa chọn view</h1>
        </header>
        {viewItems.map(viewItem => {
          return (
            <Listbox.Option
          className="cursor-pointer hover:bg-[#A6C5E229] relative flex items-center  transition-all ease-in duration-200 select-none py-2 pl-4 pr-4"
          key={viewItem.type}
          value={viewItem}
        >
          <i className={viewItem.icon}></i>
          <span className='ml-2'>  {viewItem.name}</span>
        
        </Listbox.Option>
          )
        })}
        
      </Listbox.Options>
    </Transition>
  );
};

export default ViewType;
