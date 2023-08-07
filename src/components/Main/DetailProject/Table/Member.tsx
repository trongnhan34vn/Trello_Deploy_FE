import React from 'react';
import { CardDB } from '../../../../types/Card.type';
import { Member } from '../../../../types/Member.type';
import { MemberCard } from '../../../../types/MemberCard.type';
import { User } from '../../../../types/User.type';

interface MemberProps {
  memberCards: MemberCard[];
  card: CardDB;
  members: Member[];
  users: User[];
}

const MemberComp = ({ memberCards, card, members, users }: MemberProps) => {
  const getUserImg = (member: Member) => {
    let selectUser = users.find((user) => user.id === member.userId);
    if (!selectUser) return;
    return selectUser.imageUrl;
  };

  const filterMemberByCardId = (card: CardDB) => {
    const memberCardsFilter = memberCards.filter(
      (member) => member.cardId === card.id
    );
    let memberFilters = [];
    for (let i = 0; i < memberCardsFilter.length; i++) {
      let member = members.find((m) => m.id === memberCardsFilter[i].memberId);
      if (!member) return [];
      memberFilters.push(member);
    }
    return memberFilters;
  };

  let membersFiltered = filterMemberByCardId(card);
  const memberElement = membersFiltered.map((member) => {
    return (
      <span key={member.id}>
        <img
          className="rounded-[50%] w-[28px] h-[28px]"
          src={getUserImg(member)}
          alt=""
        />
      </span>
    );
  });
  return <div className='flex gap-1'>{memberElement}</div>;
};

export default MemberComp;
