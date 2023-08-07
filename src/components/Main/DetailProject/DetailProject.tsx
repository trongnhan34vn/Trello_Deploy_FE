import React, {
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { findAllBGs } from '../../../redux/reducers/backgroundSlice';
import * as projectSlice from '../../../redux/reducers/projectSlice';
import * as tableSlice from '../../../redux/reducers/tableSlice';
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
} from '../../../redux/selectors';

import TaskControll from './TaskControll/Board';
import { Table } from '../../../types/Table.type';
import * as memberSlice from '../../../redux/reducers/memberSlice';
import { Member } from '../../../types/Member.type';
import * as userSlice from '../../../redux/reducers/userSlice';
import { User } from '../../../types/User.type';
import SubNav from '../Subnav/SubNav';
import * as cardSlice from '../../../redux/reducers/cardSlice';
import { CardDB } from '../../../types/Card.type';
import * as memberCardSlice from '../../../redux/reducers/memberCardSlice';
import { MemberCard } from '../../../types/MemberCard.type';
import { ViewItems, viewItems } from '../Subnav/ViewTypeComp';
import TableComp from './Table/Table';
import * as listSlice from '../../../redux/reducers/listSlice';
import { List } from '../../../types/List.type';
import { Background } from '../../../types/Background.type';
import * as labelSlice from '../../../redux/reducers/labelSlice';
import { Label } from '../../../types/Label.type';
import * as cardLabelSlice from '../../../redux/reducers/cardLabelSlice';
import { CardLabel } from '../../../types/CardLabel.type';

export interface SubNavState {
  tableId: number;
  selectTable: Table | null;
  members: Member[];
  users: User[];
  cards: CardDB[];
  memberCards: MemberCard[];
  viewType: ViewItems | null;
  setViewType: React.Dispatch<SetStateAction<ViewItems | null>>;
  lists: List[];
  backgrounds: Background[];
  labels: Label[];
  cardLabels: CardLabel[];
  noMemberFilter: boolean;
  setFilterNoMember: React.Dispatch<SetStateAction<boolean>>;
  currentUserMember: boolean;
  setCurrentUserMember: React.Dispatch<SetStateAction<boolean>>;
  selectMemberFilters: Member[];
  setSelectMemberFilters: React.Dispatch<SetStateAction<Member[]>>;
}

export const SubnavContext = createContext<SubNavState | null>(null);

export default function DetailProject() {
  const dispatch = useDispatch();
  const { tableId } = useParams();

  useEffect(() => {
    if (!tableId) return;
    dispatch(tableSlice.findById(+tableId));
    dispatch(findAllBGs());
    dispatch(userSlice.findAll());
    dispatch(cardSlice.findAllCards());
    dispatch(memberCardSlice.findAll());
    dispatch(listSlice.findAllList());
    dispatch(labelSlice.findAll());
    dispatch(cardLabelSlice.findAll());
  }, [tableId]);

  const cardLabels = useSelector(cardLabelSelector).cardLabels;
  const memberCards = useSelector(memberCardSelector).memberCards;
  const selectTable = useSelector(tableSelector).selectTable;
  const backgrounds = useSelector(backgroundSelector).listBGs;
  const users = useSelector(userSelector).users;
  const lists = useSelector(listSelector).lists;
  const labels = useSelector(labelSelector).labels;

  useEffect(() => {
    if (!selectTable) return;
    dispatch(projectSlice.findById(selectTable.projectId));
    dispatch(memberSlice.findByTableId(selectTable.id));
  }, [selectTable]);

  const members = useSelector(memberSelector).members;
  const cards = useSelector(cardSelector).listCards;

  const getBackgroundURL = () => {
    if (!selectTable) return;
    let bgId = selectTable.bgId;
    let bg = backgrounds.find((bg) => bg.id === bgId);
    if (!bg) return;
    return bg.bgUrl;
  };

  const [viewType, setViewType] = useState<ViewItems | null>(viewItems[0]);

  // const [isActive, setActive] = useState<boolean>(false);

  const [noMemberFilter, setFilterNoMember] = useState<boolean>(false);
  const [currentUserMember, setCurrentUserMember] = useState<boolean>(false);
  const [selectMemberFilters, setSelectMemberFilters] = useState<Member[]>([]);

  return (
    <div
      style={{ backgroundImage: `url("${getBackgroundURL()}")` }}
      className="flex bg-no-repeat bg-cover bg-center flex-col flex-1 pl-[260px] h-[calc(100vh_-_64px)] overflow-y-auto"
    >
      <div className="grow outline-none overflow-y-auto relative">
        <div className="bottom-0 left-0 overflow-hidden absolute right-0 top-0">
          <div className="flex flex-col h-full relative">
            {/* Sub Nav */}
            <SubnavContext.Provider
              value={{
                tableId: tableId ? +tableId : 0,
                selectTable: selectTable,
                members: members,
                users: users,
                cards: cards,
                memberCards: memberCards,
                viewType: viewType,
                setViewType: setViewType,
                lists: lists,
                backgrounds: backgrounds,
                labels: labels,
                cardLabels: cardLabels,
                noMemberFilter: noMemberFilter,
                setFilterNoMember: setFilterNoMember,
                currentUserMember: currentUserMember,
                setCurrentUserMember: setCurrentUserMember,
                selectMemberFilters: selectMemberFilters,
                setSelectMemberFilters: setSelectMemberFilters,
              }}
            >
              <SubNav />
              {/* Sub Nav */}
              {/* Task */}

              {viewType?.type === 'card' ? <TaskControll /> : <TableComp />}

              {/* Task */}
            </SubnavContext.Provider>
          </div>
        </div>
      </div>
    </div>
  );
}
