import React, { createContext, useContext, useEffect } from 'react';
import HeadTable from './HeadTable';
import BodyTable from './BodyTable';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as tableSlice from '../../../../redux/reducers/tableSlice';
import {
  backgroundSelector,
  cardLabelSelector,
  cardSelector,
  labelSelector,
  listSelector,
  memberCardSelector,
  memberSelector,
  tableSelector,
  userSelector,
} from '../../../../redux/selectors';
import { Table } from '../../../../types/Table.type';
import * as cardSlice from '../../../../redux/reducers/cardSlice';
import { CardDB } from '../../../../types/Card.type';
import * as listSlice from '../../../../redux/reducers/listSlice';
import { List } from '../../../../types/List.type';
import { Background } from '../../../../types/Background.type';
import * as backgroundSlice from '../../../../redux/reducers/backgroundSlice';
import * as memberSlice from '../../../../redux/reducers/memberSlice';
import { Member } from '../../../../types/Member.type';
import * as userSlice from '../../../../redux/reducers/userSlice';
import { User } from '../../../../types/User.type';
import * as memberCardSlice from '../../../../redux/reducers/memberCardSlice';
import { MemberCard } from '../../../../types/MemberCard.type';
import * as labelSlice from '../../../../redux/reducers/labelSlice';
import * as cardLabelSlice from '../../../../redux/reducers/cardLabelSlice';
import { Label } from '../../../../types/Label.type';
import { CardLabel } from '../../../../types/CardLabel.type';

export interface TableViewProps {
  tables: Table[];
  cards: CardDB[];
  lists: List[];
  backgrounds: Background[];
  members: Member[];
  users: User[];
  memberCards: MemberCard[];
  labels: Label[];
  cardLabels: CardLabel[];
}

export const TableViewContext = createContext<TableViewProps | null>(null);

export const TableView = () => {
  const dispatch = useDispatch();
  const { projectId } = useParams();

  useEffect(() => {
    if (!projectId) return;
    dispatch(tableSlice.findTableByProjectId(+projectId));
    dispatch(cardSlice.findAllCards());
    dispatch(listSlice.findAllList());
    dispatch(backgroundSlice.findAllBGs());
    dispatch(memberSlice.findAll());
    dispatch(userSlice.findAll());
    dispatch(memberCardSlice.findAll());
    dispatch(labelSlice.findAll());
    dispatch(cardLabelSlice.findAll());
  }, []);

  const tables = useSelector(tableSelector).tablesByProjectId;
  const cards = useSelector(cardSelector).listCards;
  const lists = useSelector(listSelector).lists;
  const backgrounds = useSelector(backgroundSelector).listBGs;
  const members = useSelector(memberSelector).members;
  const users = useSelector(userSelector).users;
  const memberCards = useSelector(memberCardSelector).memberCards;
  const cardLabels = useSelector(cardLabelSelector).cardLabels;
  const labels = useSelector(labelSelector).labels;

  return (
    <div className="flex bg-no-repeat bg-cover bg-center flex-col flex-1 pl-[260px] h-[calc(100vh_-_64px)] overflow-y-auto">
      <TableViewContext.Provider
        value={{
          tables: tables,
          cards: cards,
          lists: lists,
          backgrounds: backgrounds,
          members: members,
          users: users,
          memberCards: memberCards,
          cardLabels: cardLabels,
          labels: labels,
        }}
      >
        <HeadTable />
        <BodyTable />
      </TableViewContext.Provider>
    </div>
  );
};
