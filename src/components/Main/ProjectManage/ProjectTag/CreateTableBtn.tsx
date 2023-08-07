import { Popover, Transition } from '@headlessui/react';
import React, {
  createContext,
  Fragment,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findAllBGs } from '../../../../redux/reducers/backgroundSlice';
import { backgroundSelector } from '../../../../redux/selectors';
import { Background } from '../../../../types/Background.type';
import FormTable from './FormTable';

export const BGContext = createContext<Background[]>([]);

export default function CreateTableBtn() {

  // lấy ra danh sách phông nền (backgrounds)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findAllBGs());
  }, []);

  const listBGs = useSelector(backgroundSelector).listBGs;

  return (
    <li className="mb-[2%] mr-[2%] relative cursor-pointer list-none">
      <Popover>
        <Popover.Button>
          <div className="hover:bg-[#A6C5E229] transition-all ease-in-out duration-150 rounded-[3px] font-normal bg-[#A1BDD914] h-[96px] text-center align-middle p-2 bg-cover table-cell w-[200px]">
            <p className="text-[#B6C2CF] font-semibold text-[14px]">
              Tạo bảng mới
            </p>
          </div>
        </Popover.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Popover.Panel className="absolute z-50 -top-3/4 -right-1">
            {({ close }) => (
              <BGContext.Provider value={listBGs}>
                <FormTable closeFn={close} />
              </BGContext.Provider>
            )}
          </Popover.Panel>
        </Transition>
      </Popover>
    </li>
  );
}
