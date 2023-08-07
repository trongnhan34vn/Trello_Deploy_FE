import React, { Fragment } from 'react';
import { Combobox, Listbox, Menu, Transition } from '@headlessui/react';
import { Roles } from '../../../../enum/Roles';
import { useDispatch } from 'react-redux';

interface SelectRolesProps {
  selectRoles: Roles;
  setSelectRoles: React.Dispatch<React.SetStateAction<Roles>>;
  roles: Roles[];
  handleChange?: (value: Roles) => void;
}

const SelectRoles = ({
  selectRoles,
  setSelectRoles,
  roles,
  handleChange
}: SelectRolesProps) => {
  const isAdmin = (selectRoles === Roles.ADMIN) ? true : false; 
  
  return (
    <Listbox value={selectRoles} onChange={handleChange}>
      <div className="relative">
        <Listbox.Button className="relative w-[125px] mr-2  cursor-default h-[37px] text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <button className="flex rounded-[3px] w-[125px] px-[10px] py-1 bg-[#A1BDD914] h-[37px] text-[#B6C2CF] items-center">
            <span className="text-[14px] text-left flex-1 leading-[32px] mr-1">
              {selectRoles}
            </span>
            <i className="fa-solid text-[12px]  fa-angle-down"></i>
          </button>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-[100] w-[150px] text-[#B6C2CF] right-2 top-[calc(100%_+_4px)] max-h-60 overflow-auto rounded-[3px] bg-[#282E33] py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {roles.map((role) => {
              return (
                <Listbox.Option
                  disabled={isAdmin}
                  key={role}
                  className={({ active }) =>
                    `${isAdmin ? 'cursor-not-allowed' : 'cursor-default hover:bg-[#A6C5E229]'} relative  transition-all ease-in duration-200 select-none py-2 pl-4 pr-4 `
                  }
                  value={role}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {role}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              );
            })}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default SelectRoles;
