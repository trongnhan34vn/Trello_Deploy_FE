import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as cardSlice from '../../../../redux/reducers/cardSlice';
import WordFilter from './WordFilter';
import MemberFilter from './MemberFilter';
import { SubnavContext } from '../../DetailProject/DetailProject';
import { User } from '../../../../types/User.type';
import { useParams } from 'react-router-dom';
import { Roles } from '../../../../enum/Roles';
import { Member } from '../../../../types/Member.type';
import { CardDB } from '../../../../types/Card.type';
import { MemberCard } from '../../../../types/MemberCard.type';
import { filterCardNoMembers } from '../../../../utils/filterCardsNoMember';
import { filterCardsCurrentUser } from '../../../../utils/filterCardsCurrentUser';
import { filterCardsSelectMember } from '../../../../utils/filterCardsSelectMember';

interface FilterDropProps {
  close: () => void;
  open: boolean;
  setActiveBtn: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterDropDown = ({ close, open, setActiveBtn }: FilterDropProps) => {
  useEffect(() => {
    setActiveBtn(open);
  }, [open]);

  const dispatch = useDispatch();
  const subNavContext = useContext(SubnavContext);
  const { tableId } = useParams();

  const users = subNavContext ? subNavContext.users : [];

  const members = subNavContext ? subNavContext.members : [];

  const membersFilterTable = tableId
    ? members.filter(
        (member) => member.tableId === +tableId && member.role !== Roles.ADMIN
      )
    : [];

  const [onWordFilter, setOnWordFilter] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim() !== '') {
      setOnWordFilter(true);
    } else {
      setOnWordFilter(false);
    }
    setTimeout(() => {
      dispatch(cardSlice.searchCardByName(e.target.value));
    }, 1000);
  };

  return (
    <div className="w-[384px] -left-48 absolute top-[20px] rounded-[8px] z-[999] bg-[#282E33]">
      <header className="py-1 px-2 text-[#B6C2CF] font-normal relative leading-5">
        <div className="text-[#9FADBC] font-bold text-[14px] leading-10 h-10 px-8 flex justify-center">
          <span>Lọc</span>
        </div>
        <button
          onClick={() => close()}
          className="absolute p-[6px] top-2 right-2 w-8 h-8 rounded-[3px] text-[#8C9BAB] hover:bg-[#A6C5E229] transition-all ease-in duration-200"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </header>
      <div className="px-3 pb-3">
        <WordFilter handleChange={handleChange} />
        {!onWordFilter ? (
          <MemberFilter
            users={users}
            membersFilterTable={membersFilterTable}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default React.memo(FilterDropDown);
