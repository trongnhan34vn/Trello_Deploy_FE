import { Listbox, Transition } from '@headlessui/react';
import React, { Fragment, SetStateAction, useEffect } from 'react';
import { Table } from '../../../../types/Table.type';

interface SelectTableProps {
  open: boolean;
  tables: Table[];
  setActiveBtn: React.Dispatch<SetStateAction<boolean>>;
}

const SelectTable = ({ setActiveBtn, open, tables }: SelectTableProps) => {
  useEffect(() => {
    setActiveBtn(open);
  }, [open]);

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
      <Listbox.Options className="absolute z-[100] w-[200px] text-[#B6C2CF] left-4 top-[calc(100%_+_4px)] max-h-60 overflow-auto rounded-[3px] bg-[#282E33] py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
        <header className="text-center font-bold py-2 border-b-[0.5px] border-b-[#3C474F]">
          <h1>Lựa chọn bảng</h1>
        </header>
        {/* <Listbox.Option
          className="cursor-default hover:bg-[#A6C5E229] relative  transition-all ease-in duration-200 select-none py-2 pl-4 pr-4"
          value={null}
        >
          Chọn bảng
        </Listbox.Option> */}
        {tables.map((table) => {
          return (
            <Listbox.Option
              className="cursor-default hover:bg-[#A6C5E229] relative  transition-all ease-in duration-200 select-none py-2 pl-4 pr-4"
              key={table.id}
              value={table}
            >
              {table.name}
            </Listbox.Option>
          );
        })}
      </Listbox.Options>
    </Transition>
  );
};

export default SelectTable;
