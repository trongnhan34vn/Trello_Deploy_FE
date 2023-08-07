import { Listbox, Popover, Transition } from '@headlessui/react';
import React, { Fragment, SetStateAction, useContext, useState } from 'react';
import { Member } from '../../../../types/Member.type';
import { User } from '../../../../types/User.type';
import { SubnavContext } from '../../DetailProject/DetailProject';

interface MemberFilterProps {
  membersFilterTable: Member[];
  users: User[];
}

const MemberFilter = ({
  membersFilterTable,
  users,
}: MemberFilterProps) => {
  const getNameMember = (member: Member) => {
    let user = users.find((user) => user.id === member.userId);
    if (!user) return;
    return { fullName: user.fullName, email: user.email, image: user.imageUrl };
  };

  const subNavContext = useContext(SubnavContext);

  const handleFilterNoMember = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!subNavContext) return;
    subNavContext.setFilterNoMember(e.target.checked);
  }

  const checkExist = (member: Member) => {
    if(!subNavContext) return;
    return subNavContext.selectMemberFilters.find((mem) => mem.id === member.id);
  };

  const handleChange = (
    mem: Member,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if(!subNavContext) return;
    let arr = [... subNavContext.selectMemberFilters]
    if(!checkExist(mem)){
      arr.push(mem)
    } else {
      let index = arr.indexOf(mem)
      if(index > -1) {
        arr.splice(index, 1)
      }
    }
    subNavContext.setSelectMemberFilters(arr)
  };

  const handleFilterCurrentUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!subNavContext) return;
    subNavContext.setCurrentUserMember(e.target.checked);
  }

  const checkChecked = (member: Member) => {
    if(!subNavContext) return;
    return subNavContext.selectMemberFilters.find(mem => mem.id === member.id);
  }

  return (
    <div className="member">
      <label className="text-[12px] font-bold text-[#9FADBC] block mt-4 mb-2">
        Thành viên
      </label>
      <div>
        {/* Thẻ không có thành viên tham gia */}
        <div className="text-[14px] text-[#B6C2CF] p-2 leading-5 flex items-center">
          <input
            checked={subNavContext?.noMemberFilter}
            onChange={handleFilterNoMember}
            type="checkbox"
            className="mr-2"
          />
          <span>Không có thành viên</span>
        </div>
        {/* Thẻ có thành viên tham gia là currentUser */}
        <div className="text-[14px] text-[#B6C2CF] p-2 leading-5 flex items-center">
          <input
            checked={subNavContext?.currentUserMember}
            onChange={handleFilterCurrentUser}
            type="checkbox"
            className="mr-2"
          />
          <span>Các thẻ chỉ định tôi</span>
        </div>
        {/* Thẻ có thành viên được chọn tham gia */}
        <div className="text-[14px] text-[#B6C2CF] p-2 leading-5 flex items-center">
          <input type="checkbox" className="mr-2" />
          <Popover className="w-full outline-none ">
            <div className="w-full relative">
              <Popover.Button className="outline-none  relative w-full mr-2  cursor-pointer h-[37px] text-left focus:outline-none focus-visible:ring-offset-2">
                <div className="flex rounded-[3px] w-full px-[10px] py-1 bg-[#A1BDD914] h-[37px] text-[#B6C2CF] items-center">
                  <span className="text-[14px] text-left flex-1 leading-[32px] mr-1">
                    Chọn thành viên
                  </span>
                  <i className="fa-solid text-[12px]  fa-angle-down"></i>
                </div>
              </Popover.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Popover.Panel className="absolute z-[100] w-full text-[#B6C2CF] right-0 top-[calc(100%_+_4px)] max-h-60 overflow-auto rounded-[3px] bg-[#282E33] py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {membersFilterTable.map((member) => {
                    return (
                      <div
                        key={member.id}
                        className={`relative hover:bg-[#A6C5E229] transition-all ease-in duration-200 select-none py-2 pl-4 pr-4 `}
                      >
                        <>
                          <div className="flex items-center ">
                            <input
                              checked={checkChecked(member) ? true : false}
                              onChange={(e) => handleChange(member, e)}
                              type="checkbox"
                              className="mr-2"
                            />
                            <div className=" mr-3 rounded-[50%] w-8 h-8 flex justify-center items-center">
                              <img
                                className="rounded-[50%]"
                                src={getNameMember(member)?.image}
                                alt=""
                              />
                            </div>
                            <div className="flex flex-col justify-between text-[14px] text-[#B6C2CF]">
                              <span className="font-bold">
                                {getNameMember(member)?.fullName}{' '}
                              </span>
                              <span className="">
                                {getNameMember(member)?.email}
                              </span>
                            </div>
                          </div>
                        </>
                      </div>
                    );
                  })}
                </Popover.Panel>
              </Transition>
            </div>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MemberFilter);
