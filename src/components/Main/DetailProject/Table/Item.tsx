import React, { useContext } from 'react';
import { List } from '../../../../types/List.type';
import { SubnavContext } from '../DetailProject';
import { CardDB } from '../../../../types/Card.type';
import { Member } from '../../../../types/Member.type';
import Label from './Label';
import LabelComp from './Label';
import MemberComp from './Member';
import { User } from '../../../../types/User.type';
import { filterCardNoMembers } from '../../../../utils/filterCardsNoMember';
import { filterCardsCurrentUser } from '../../../../utils/filterCardsCurrentUser';
import { filterCardsSelectMember } from '../../../../utils/filterCardsSelectMember';


interface ItemProps {
  list: List;
}

const Item = ({ list }: ItemProps) => {
  const snContext = useContext(SubnavContext);
  const cards = snContext ? snContext.cards : [];
  const memberCards = snContext ? snContext.memberCards : [];
  const bgs = snContext ? snContext.backgrounds : [];
  const selectTable = snContext ? snContext.selectTable : null;
  const members = snContext ? snContext.members : [];
  const users = snContext ? snContext.users : [];
  const cardLabels = snContext ? snContext.cardLabels : [];
  const labels = snContext ? snContext.labels : [];

  const userLocal = localStorage.getItem('userLogin');
  const currentUser: User = userLocal ? JSON.parse(userLocal) : null;

  const getCardFilter = () => {
    if (!snContext) return [];
    if (snContext.noMemberFilter) {
      return filterCardNoMembers(snContext.memberCards, cards);
    }
    if (snContext.currentUserMember) {
      return filterCardsCurrentUser(
        snContext.memberCards,
        snContext.members,
        currentUser,
        cards
      );
    }
    if (snContext.selectMemberFilters.length > 0) {
      return filterCardsSelectMember(
        snContext.selectMemberFilters,
        snContext.memberCards,
        cards
      );
    }
    return cards;
  };

  const getBackgroundURL = () => {
    if (!selectTable) return;
    let bgId = selectTable.bgId;
    let bg = bgs.find((bg) => bg.id === bgId);
    if (!bg) return;
    return bg.bgUrl;
  };

  const cardsFiltered = getCardFilter().filter((card) => card.listId === list.id);

  const showDate = (time: number) => {
    let date = new Date(time);
    return date.getDate() + ' tháng ' + (+date.getMonth() + 1);
  };

  const cardElement = cardsFiltered.map((card) => {
    return (
      <div
        key={card.id}
        className="title h-[41px] mr-[15px] ml-[15px] flex border-b-[0.5px] border-b-[#333B43]"
      >
        <div className="w-[calc(32%_-_20px)] text-[14px] text-[#9FADBC] p-2 font-medium inline-flex items-center">
          <div className="flex">
            <img
              className="w-8 mr-2 rounded-[3px] h-5"
              src={getBackgroundURL()}
              alt="mất ảnh"
            />
            <span>{card.name}</span>
          </div>
        </div>
        <div className="w-[17%] text-[#9FADBC] p-2 font-medium inline-flex items-center text-[14px]">
          <span>{card.listId === list.id ? list.name : ''}</span>
        </div>
        <div className="w-[17%] text-[#9FADBC] py-2 font-medium inline-flex items-center text-[14px]">
          <div className="py-2 flex items-center w-4/5 gap-1">
            <LabelComp cardId={card.id} labels={labels} cardLabels={cardLabels} />
          </div>
        </div>
        <div className="w-[17%] text-[#9FADBC] p-2 font-medium inline-flex items-center text-[14px]">
          <MemberComp card={card} memberCards={memberCards} members={members} users={users} />
        </div>
        <div className="w-[17%] text-[#9FADBC] p-2 font-medium inline-flex items-center text-[14px]">
          {card.endAt ? (
            <span className="inline-block bg-[#143C2B] rounded-[3px] px-1 text-[#7EE2B8]">
              <i className="fa-regular mr-1 fa-clock"></i>
              <span>{showDate(card.endAt)}</span>
            </span>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  });

  return <>{cardElement}</>;
};

export default Item;
