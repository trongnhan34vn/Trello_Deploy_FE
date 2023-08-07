import { CardDB } from '../types/Card.type';
import { MemberCard } from '../types/MemberCard.type';

export const filterCardNoMembers = (
  memberCards: MemberCard[],
  cards: CardDB[]
) => {
  const getCardHasMember = () => {
    let arr: CardDB[] = [];
    for (let i = 0; i < memberCards.length; i++) {
      let member = cards.find((card) => card.id === memberCards[i].cardId);
      if (!member) return [];
      arr.push(member);
    }
    return arr;
  };

  const removeFromArr = (arr: CardDB[], card: CardDB) => {
    let index = arr.indexOf(card);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  };

  const getCardNonMember = () => {
    let cardArr = [...cards];
    let cardMember = getCardHasMember();
    for (let i = 0; i < cardMember.length; i++) {
      let card = cards.find((c) => c.id === cardMember[i].id);
      if (!card) return [];
      removeFromArr(cardArr, card);
    }
    return cardArr;
  };

  return getCardNonMember();
};
