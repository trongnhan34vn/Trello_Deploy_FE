import React, { Fragment, useEffect, useState } from 'react';
import { Combobox, Listbox, Menu, Transition } from '@headlessui/react';
import { User } from '../../../../types/User.type';
import { getAcronym } from '../../../../utils/getAcronym';
import { Member, MemberForm } from '../../../../types/Member.type';

interface InputSearchProps {
  selectUser: User | null;
  setSelectUser: React.Dispatch<React.SetStateAction<User | null>>;
  users: User[];
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  currentUser: User;
  members: MemberForm[];
  setMembers: React.Dispatch<React.SetStateAction<MemberForm[]>>;
  setSelectUsers: React.Dispatch<React.SetStateAction<User[]>>;
  selectUsers: User[];
  loading: boolean;
}

const InputSearch = ({
  selectUser,
  setSelectUser,
  users,
  query,
  setQuery,
  currentUser,
  members,
  setMembers,
  setSelectUsers,
  selectUsers,
  loading,
}: InputSearchProps) => {
  const removeChip = (index: number) => {
    let arr = [...members];
    arr.splice(index, 1);
    setMembers(arr);
    let sarr = [...selectUsers];
    sarr.splice(index, 1);
    setSelectUsers(sarr);
  };

  const removeAllChips = () => {
    setMembers([]);
    setSelectUsers([]);
  };

  const selectUsersElement = selectUsers.map((user, index) => {
    return (
      <div
        key={user.id}
        className={`mt-1 ml-1 justify-between text-[14px] text-[#B6C2CF] flex px-1 rounded-[3px] bg-[#A1BDD914]`}
      >
        <span className="mr-1">{user.email}</span>
        <button onClick={() => removeChip(index)}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    );
  });

  useEffect(() => {
    if (!loading) removeAllChips();
  }, [loading]);

  return (
    <Combobox value={selectUser} onChange={setSelectUser}>
      <div className="relative">
        <div className="relative flex flex-wrap items-center border-[#A6C5E229] w-full cursor-default border-[2px] overflow-hidden rounded-[3px] bg-[#22272B] text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
          {selectUsersElement}
          <Combobox.Input
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Địa chỉ email hoặc tên"
            type="text"
            className="bg-[#22272B] w-full text-[14px] overflow-hidden  rounded-[3px] min-h-[32px] outline-none  py-[6px] pr-1 pl-3 max-w-[341px] text-[#B6C2CF]"
          />
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery('')}
        >
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-[#22272B] text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <div>
              <p className="mt-3 mr-3 ml-3 text-[12px] font-semibold text-[#B6C2CF] mb-2">
                Gợi ý chia sẻ
              </p>
            </div>
            {users.length === 0 && query !== '' ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                Nothing found.
              </div>
            ) : (
              users.map((person) => (
                <Combobox.Option
                  key={person.id}
                  className={({ active }) =>
                    `relative cursor-default transition-all ease-in duration-200 select-none py-2 pl-4 pr-4 hover:bg-[#A6C5E229]`
                  }
                  value={person}
                >
                  {({ selected, active }) => (
                    <div className="flex items-center ">
                      <div className="mr-3 rounded-[50%] w-8 h-8 flex justify-center items-center">
                        <img src={person.imageUrl} className='rounded-[50%]' alt="" />
                      </div>
                      <div className="flex flex-col justify-between text-[14px] text-[#B6C2CF]">
                        <span className="font-bold">
                          {person ? person.fullName : ''}{' '}
                          {currentUser.id === person.id ? '(bạn)' : ''}
                        </span>
                        <span className="">{person ? person.email : ''}</span>
                      </div>
                    </div>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};

export default InputSearch;
