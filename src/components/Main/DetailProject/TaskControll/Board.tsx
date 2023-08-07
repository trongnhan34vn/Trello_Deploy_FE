import React, { SetStateAction, useContext, useEffect, useState } from 'react';
import '../../../../assets/css/react-trello.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Board from 'react-trello-ts';
import { FormState } from 'react-trello-ts/dist/components/NewCardForm';
import { BoardData, Lane, Card } from 'react-trello-ts/dist/types/Board';
import * as cardSlice from '../../../../redux/reducers/cardSlice';
import * as listSlice from '../../../../redux/reducers/listSlice';
import { cardSelector, listSelector } from '../../../../redux/selectors';
import { CardDB, CardForm, CardPatchTest } from '../../../../types/Card.type';
import { DragList, ListForm } from '../../../../types/List.type';
import CardFormComp from './CardFormComp';
import AddLinkCard from './AddLinkCard';
import NewLaneSection from './NewLaneSection';
import NewLaneForm from './NewLaneForm';
import CardModal from '../../Modal/CardModal/CardModal';
import { SubnavContext } from '../DetailProject';
import { filterCardNoMembers } from '../../../../utils/filterCardsNoMember';
import { filterCardsCurrentUser } from '../../../../utils/filterCardsCurrentUser';
import { User } from '../../../../types/User.type';
import { filterCardsSelectMember } from '../../../../utils/filterCardsSelectMember';

export default React.memo(function BoardComp() {
  const dispatch = useDispatch();
  
  const userLocal = localStorage.getItem('userLogin');
  const currentUser: User = userLocal ? JSON.parse(userLocal) : null;

  const { tableId } = useParams();
  const [data, setData] = useState<BoardData>({
    lanes: [],
  });
  const subNavContext = useContext(SubnavContext);
  const [currentCard, setCurrentCard] = useState<string | null>(null);

  const lanes = subNavContext ? subNavContext.lists : [];
  const cards = subNavContext ? subNavContext.cards : [];

  const getCardFilter = () => {
    if (!subNavContext) return [];
    if (subNavContext.noMemberFilter) {
      return filterCardNoMembers(subNavContext.memberCards, cards);
    }
    if (subNavContext.currentUserMember) {
      return filterCardsCurrentUser(
        subNavContext.memberCards,
        subNavContext.members,
        currentUser,
        cards
      );
    }
    if (subNavContext.selectMemberFilters.length > 0) {
      return filterCardsSelectMember(
        subNavContext.selectMemberFilters,
        subNavContext.memberCards,
        cards
      );
    }
    return cards;
  };

  useEffect(() => {
    if (!tableId) return;

    let arr = [];
    for (let i = 0; i < lanes.length; i++) {
      if (+tableId === lanes[i].tableId) {
        let laneData: any = {
          id: lanes[i].id,
          title: lanes[i].name,
          cards: [],
          boardId: lanes[i].tableId,
          order: lanes[i].order,
        };
        let cards = getCardFilter();
        for (let j = 0; j < cards.length; j++) {
          if (lanes[i].id === cards[j].listId) {
            let cardData: any = {
              id: cards[j].id,
              title: cards[j].name,
              draggable: true,
              laneId: cards[j].listId,
              order: cards[j].order,
              describe: cards[j].description,
            };
            laneData.cards.push(cardData);
          }
        }
        laneData.cards.sort((a: any, b: any) => a.order - b.order);
        arr.push(laneData);
        arr.sort((a: any, b: any) => a.order - b.order);
      }
      setData({
        lanes: arr,
      });
    }
  }, [lanes, cards, subNavContext?.noMemberFilter, subNavContext?.currentUserMember, subNavContext?.selectMemberFilters]);

  // filter card by list id
  const filterCartByListId = (listId: number): CardDB[] => {
    return cards.filter((c) => c.listId === listId);
  };

  // exchange data
  const exchangeData = (listCard: CardDB[]): Card[] => {
    let arr: Card[] = [];
    for (let i = 0; i < listCard.length; i++) {
      let card: Card = {
        id: listCard[i].id.toString(),
        laneId: `${listCard[i].listId}`,
        title: listCard[i].name,
        label: '',
        description: listCard[i].description,
        draggable: true,
        order: listCard[i].order,
      };
      arr.push(card);
      arr.sort((a, b) => a.order - b.order);
    }
    return arr;
  };

  // Set data react trello
  // useEffect(() => {
  //   if(!tableId) return;
  //   let arr: Lane[] = [];
  //   let filterLanes = lanes.filter(lane => lane.tableId === Number(tableId))

  //   for (let i = 0; i < filterLanes.length; i++) {
  //     let filterCards = filterCartByListId(filterLanes[i].id);
  //     let lane: Lane = {
  //       id: filterLanes[i].id.toString(),
  //       title: filterLanes[i].name,
  //       label: '',
  //       cards: exchangeData(filterCards),
  //       order: filterLanes[i].order,
  //     };
  //     arr.push(lane);
  //     arr.sort((a, b) => a.order - b.order);
  //     console.log('lane ----->', arr);

  //     setData({
  //       lanes: arr,
  //     });
  //   }
  // }, [lanes, cards]);

  // add card

  const createCard = (card: Card) => {
    let laneId = card.laneId;
    if (!laneId) return;

    let cardArr = findCardsByLaneId(laneId);
    if (!cardArr) return;

    let newCard: CardForm = {
      name: card.title ? card.title : '',
      listId: Number(card.laneId),
      order: cardArr.length,
      description: '',
      status: false,
      endAt: 0,
    };
    dispatch(cardSlice.createCard(newCard));
  };

  // open modal
  const handleClickModal = (cardId: string, metadata: any, card: Card) => {
    setCurrentCard(cardId);
  };

  const findCardsByLaneId = (laneId: string): Card[] => {
    let lane = data.lanes.find((lane) => lane.id === laneId);
    if (!lane) return [];
    return lane.cards || [];
  };

  // drag and data
  const checkExist = (card: Card, arr: Card[]) => {
    return arr.find((c) => c.id === card.id);
  };

  function move(arr: Card[], old_index: number, new_index: number) {
    while (old_index < 0) {
      old_index += arr.length;
    }
    while (new_index < 0) {
      new_index += arr.length;
    }
    if (new_index >= arr.length) {
      var k = new_index - arr.length;
      while (k-- + 1) {
        // arr.push();
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
  }

  const onCardMoveAcrossLanes = (
    fromLaneId: string,
    toLaneId: string,
    cardId: string,
    index: string
  ) => {
    let toLaneCards: Card[] = findCardsByLaneId(toLaneId);
    if (!toLaneCards) return;
    let fromLaneCards: Card[] = findCardsByLaneId(fromLaneId);
    if (!fromLaneCards) return;
    let selectCard = fromLaneCards.find((card) => card.id === cardId);
    if (!selectCard) return;

    selectCard.laneId = toLaneId;
    if (checkExist(selectCard, toLaneCards)) {
      move(toLaneCards, toLaneCards.indexOf(selectCard), parseInt(index));
    } else {
      toLaneCards.splice(parseInt(index), 0, selectCard);
      fromLaneCards.splice(fromLaneCards.indexOf(selectCard), 1);
    }

    for (let i = 0; i < toLaneCards.length; i++) {
      let listTemp: number = Number(toLaneCards[i].laneId);
      let cardU: CardPatchTest = {
        id: +toLaneCards[i].id,
        name: toLaneCards && toLaneCards[i].name,
        order: i,
        listId: listTemp,
        description: toLaneCards[i].description,
      };
      dispatch(cardSlice.updateCardTest(cardU));
    }
  };

  // drag list
  const dragList = (removeIndex: number, addedIndex: number) => {
    let dragLane = data.lanes[removeIndex];
    let dragLaneId = dragLane.id;
    let newOrder = addedIndex;
    let dragList: DragList = {
      id: +dragLaneId,
      order: newOrder,
    };
    dispatch(listSlice.updateDragList(dragList));
    let beDraggedLane = data.lanes[addedIndex];
    let beDraggedLaneId = beDraggedLane.id;
    let newOrderBeDrag = removeIndex;
    let beDragList: DragList = {
      id: +beDraggedLaneId,
      order: newOrderBeDrag,
    };
    dispatch(listSlice.updateDragList(beDragList));
  };

  // create list
  const createListFn = (newList: FormState) => {
    let listF: ListForm = {
      name: newList.title,
      tableId: Number(tableId),
      order: lanes.length,
    };
    dispatch(listSlice.createList(listF));
  };

  return (
    <div>
      <Board
        style={{ backgroundColor: 'transparent' }}
        components={{
          NewCardForm: CardFormComp,
          AddCardLink: AddLinkCard,
          NewLaneSection: NewLaneSection,
          NewLaneForm: NewLaneForm,
        }}
        handleLaneDragEnd={(removedIndex, addedIndex, payload) => {
          dragList(+removedIndex, +addedIndex);
        }}
        onLaneAdd={(params) => createListFn(params)}
        handleDragEnd={() => {}}
        onCardMoveAcrossLanes={onCardMoveAcrossLanes}
        onCardClick={handleClickModal}
        onCardAdd={(card) => createCard(card)}
        onDataChange={(data) => {
          console.log(data);

          setData(data);
        }}
        laneDraggable
        cardDraggable
        editable
        canAddLanes
        draggable
        data={data}
      />
      <CardModal cardId={currentCard} onClose={() => setCurrentCard(null)} />
    </div>
  );
});
