import React, { createContext, useContext, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DescriptionModal from './CardModalComp/DescriptionModal';
import ModalFeature from './CardModalComp/ModalFeature';
import HeadModal from './CardModalComp/HeadModal';
import * as cardSlice from '../../../../redux/reducers/cardSlice';
import {
  cardSelector,
  memberCardSelector,
  workSelector,
} from '../../../../redux/selectors';
import Works from './CardModalComp/Works';
import { findWorksByCardId } from '../../../../redux/reducers/workSlice';
import { CardDB } from '../../../../types/Card.type';
import CardInfo from './CardModalComp/CardInfo';
import { SubnavContext } from '../../DetailProject/DetailProject';
import { Member } from '../../../../types/Member.type';
import CardMembers from './CardModalComp/CardMembers';
import CardLabel from './CardModalComp/CardLabel';

export interface CardModalProps {
  cardId: string | null;
  onClose: () => void;
}

export const CardContext = createContext<CardDB | null>(null);

const CardModal = ({ cardId, onClose }: CardModalProps) => {
  const dispatch = useDispatch();

  const selectCard = useSelector(cardSelector).selectCard;

  const works = useSelector(workSelector).listWorks;

  const subnavContext = useContext(SubnavContext);
  const members: Member[] = subnavContext ? subnavContext.members : [];

  const memberCards = subnavContext ? subnavContext.memberCards : [];

  const memberCardsFilterCardId = cardId
    ? memberCards.filter((memberCard) => memberCard.cardId === +cardId)
    : [];

  const getMembersFilterByCardId = () => {
    let membersFilter: Member[] = [];
    for (let i = 0; i < memberCardsFilterCardId.length; i++) {
      let member = members.find(
        (mem) => mem.id === memberCardsFilterCardId[i].memberId
      );
      if (!member) return [];
      membersFilter.push(member);
    }
    return membersFilter;
  };

  const membersFilter = getMembersFilterByCardId();

  useEffect(() => {
    if (!cardId) return;
    dispatch(findWorksByCardId(+cardId));
    dispatch(cardSlice.findCardById(+cardId));
  }, [cardId]);

  const worksElement = works.map((work) => {
    return <Works key={work.id} work={work} />;
  });

  const labelCards = subnavContext ? subnavContext.cardLabels : [];
  const labelCardsFilter = selectCard ? labelCards.filter(lc => lc.cardId === selectCard.id) : null; 

  const checkLabel = () => {
    if(!labelCardsFilter) return
    if (labelCardsFilter.length === 0) return false;
    return true;
  };

  const checkCardHasEndDate = () => {
    if (!selectCard) return;
    if (selectCard.endAt !== 0) return true;
    return false;
  };

  const checkListMembers = () => {
    if (membersFilter.length === 0) return false;
    return true;
  };

  return (
    <Transition appear show={cardId ? true : false} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-70" />
        </Transition.Child>

        <div className="fixed inset-16">
          <div className="flex min-h-[500px] items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full pr-[185px] relative z-10 min-h-[500px] max-w-[775px] transform rounded-2xl bg-[#323940] p-6 text-left align-middle shadow-xl transition-all">
                <HeadModal
                  cardId={cardId}
                  selectCard={selectCard}
                  onClose={onClose}
                />

                <CardContext.Provider value={selectCard}>
                  <div className="flex gap-4 items-start h-[420px] scrollable-div overflow-y-scroll">
                    <div className="form-left w-full h-full">
                      <div className="flex flex-wrap ml-7 mb-8">
                        {checkListMembers() ? (
                          <CardMembers
                            memberCardsFilterCardId={memberCardsFilterCardId}
                            members={membersFilter}
                          />
                        ) : (
                          <></>
                        )}
                        {checkLabel() ? <CardLabel /> : <></>}

                        {checkCardHasEndDate() ? (
                          <CardInfo
                            checkListMembers={checkListMembers}
                            selectCard={selectCard}
                          />
                        ) : (
                          <></>
                        )}
                      </div>

                      {/* Description */}
                      <DescriptionModal card={selectCard} />
                      {/* Description */}
                      {/* List Works */}
                      {worksElement}
                      {/* List Works */}
                    </div>
                    <div className="form-right relative flex flex-col">
                      <ModalFeature />
                    </div>
                  </div>
                </CardContext.Provider>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CardModal;
