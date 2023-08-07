import React from 'react';
import { Member } from '../../../../../types/Member.type';
import CardMemberImg from './CardMemberImg';
import { MemberCard } from '../../../../../types/MemberCard.type';

interface CardMembersProps {
  members: Member[]
  memberCardsFilterCardId: MemberCard[]
}

const CardMembers = ({members, memberCardsFilterCardId}: CardMembersProps) => {
  
  const memberElement = members.map(member => {
    return (
      <CardMemberImg key={member.id} member={member} />
    )
  })

  return (
    <div className='mr-3'>
      <div className="text-[#9FADBC] text-left text-[12px] font-bold mb-2">
        Thành viên
      </div>
      <div className="flex">
        {memberElement}
      </div>
    </div>
  );
};

export default CardMembers;
