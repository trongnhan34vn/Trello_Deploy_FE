import { CardDB } from '../types/Card.type';
import { Member } from '../types/Member.type';
import { MemberCard } from '../types/MemberCard.type';

export const filterCardsSelectMember = (
  membersFilter: Member[],
  memberCards: MemberCard[],
  cards: CardDB[]
) => {
  const checkExistsMC = (mc: MemberCard, mcs: MemberCard[]) => {
    return mcs.find((mem) => mem.id === mc.id);
  };

  const filterMembersByUserId = () => {
    let mcs = [];
    for (let i = 0; i < membersFilter.length; i++) {
      let mc = memberCards.find((m) => m.memberId === membersFilter[i].id);
      if (!mc) return [];
      if (!checkExistsMC(mc, mcs)) {
        mcs.push(mc);
      }
    }
    return mcs;
  };

  const checkExistCards = (card: CardDB, cards: CardDB[]) => {
    return cards.find((c) => c.id === card.id);
  };

  const getCardHasSelectMember = () => {
    let cardArr = [];
    let memberCs = filterMembersByUserId();

    for (let i = 0; i < memberCs.length; i++) {
      let card = cards.find((c) => c.id === memberCs[i].cardId);
      if (!card) return [];
      if (!checkExistCards(card, cardArr)) {
        cardArr.push(card);
      }
    }
    return cardArr;
  };

  return getCardHasSelectMember();
};
