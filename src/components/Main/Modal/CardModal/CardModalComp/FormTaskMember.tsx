import React, { useContext, useEffect, useState } from 'react';
import { CardContext } from '../CardModal';
import { SubnavContext } from '../../../DetailProject/DetailProject';
import { TaskMembers } from './TaskMembers';
import { useDispatch } from 'react-redux';
import { searchByEmail } from '../../../../../redux/reducers/userSlice';

const FormTaskMember = () => {
  const selectCard = useContext(CardContext);
  const subnavContext = useContext(SubnavContext);
  const dispatch = useDispatch();
  const members = subnavContext ? subnavContext.members : [];
  const memberCards = subnavContext ? subnavContext.memberCards : [];

  const memberCardsFilter = selectCard
    ? memberCards.filter((mem) => mem.cardId === selectCard.id)
    : [];

  const filterMembers = () => {
    if (!selectCard) return [];
    let memArr = [];
    for (let i = 0; i < memberCardsFilter.length; i++) {
      let mem = members.find((mem) => mem.id === memberCards[i].memberId);
      if (!mem) return [];
      memArr.push(mem);
    }
    return memArr;
  };

  const [inputValue, setInputValue] = useState('');

  const membersElement = filterMembers().map((member) => {
    return (
      <TaskMembers inputValue={inputValue} key={member.id} member={member} />
    );
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    dispatch(searchByEmail(inputValue));
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
          Thành viên của thẻ <span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col">
          {/* select item */}
          {membersElement}
          {/* select item */}
        </div>
      </div>
    </form>
  );
};

export default FormTaskMember;
