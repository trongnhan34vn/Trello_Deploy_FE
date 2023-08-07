import React, { useContext } from 'react';
import { Table } from '../../../../types/Table.type';
import { TableViewContext } from './TableView';
import { List } from '../../../../types/List.type';
import { Member } from '../../../../types/Member.type';
import { CardDB } from '../../../../types/Card.type';
import LabelComp from '../Table/Label';
import MemberComp from '../Table/Member';

interface ItemProps {
  table: Table;
  list: List;
}

const Item = ({ table, list }: ItemProps) => {
  const tableViewContext = useContext(TableViewContext);
  const cards = tableViewContext ? tableViewContext.cards : [];
  const backgrounds = tableViewContext ? tableViewContext.backgrounds : [];
  const background = backgrounds.find(
    (background) => background.id === table.bgId
  );
  const members = tableViewContext ? tableViewContext.members : [];
  const users = tableViewContext ? tableViewContext.users : [];
  const memberCards = tableViewContext ? tableViewContext.memberCards : [];
  const labels = tableViewContext ? tableViewContext.labels : [];
  const cardLabels = tableViewContext ? tableViewContext.cardLabels : [];

  const cardsFiltered = cards.filter((card) => card.listId === list.id);

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
              src={background ? background.bgUrl : ''}
              alt="mất ảnh"
            />
            <span>{card.name}</span>
          </div>
        </div>
        <div className="w-[17%] text-[#9FADBC] p-2 font-medium inline-flex items-center text-[14px]">
          <span>{list.name}</span>
        </div>
        <div className="w-[17%] text-[#9FADBC] p-2 font-medium inline-flex items-center text-[14px]">
          <div className="py-2 flex items-center w-4/5 gap-1">
            <LabelComp
              cardId={card.id}
              labels={labels}
              cardLabels={cardLabels}
            />
          </div>
        </div>
        <div className="w-[17%] text-[#9FADBC] p-2 font-medium inline-flex items-center text-[14px]">
          <MemberComp
            memberCards={memberCards}
            card={card}
            members={members}
            users={users}
          />
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
