import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as userSlice from '../../../../../redux/reducers/userSlice';
import { userSelector } from '../../../../../redux/selectors';
import { SubnavContext } from '../../../DetailProject/DetailProject';
import MemberComp from './MemberComp';

export default function FormAddMember() {
  const subNavContext = useContext(SubnavContext);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const members = subNavContext ? subNavContext.members : [];
  const searchUsers = useSelector(userSelector).search;

  const memberElement = members.map((member) => {
    return <MemberComp inputValue={inputValue} search={searchUsers} key={member.id} member={member} />;
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    dispatch(userSlice.searchByEmail(inputValue));
  }, [inputValue]);

  return (
    <form className="">
      <div className="">
        <input
          onChange={handleChange}
          name="name"
          value={inputValue}
          className="mt-[2px] border-[2px] border-[#A6C5E229] bg-[#22272B] text-[#B6C2CF] outline-[#EF5C48] text-sm leading-5 w-full py-1 px-2 rounded-[3px]"
          type="text"
          placeholder="Tìm kiếm Thành viên"
        />
      </div>
      <div className="">
        <label className="block mb-3 mt-3 font-bold text-[12px] text-[#B6C2CF]">
          Thành viên của bảng <span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col">
          {/* select item */}
          {memberElement}
          {/* select item */}
        </div>
      </div>
    </form>
  );
}
