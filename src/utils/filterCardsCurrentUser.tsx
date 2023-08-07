import { CardDB } from "../types/Card.type";
import { Member } from "../types/Member.type";
import { MemberCard } from "../types/MemberCard.type";
import { User } from "../types/User.type";

export const filterCardsCurrentUser = (memberCards: MemberCard[], members: Member[], currentUser: User , cards: CardDB[]) => {

  const membersFilterByCurrentUser = members.filter(
    (member) => member.userId === currentUser.id
  );

  const getMembersCardFilterCurrentUser = () => {
    let memberCard = [];
    for (let i = 0; i < memberCards.length; i++) {
      for (let j = 0; j < membersFilterByCurrentUser.length; j++) {
        if (membersFilterByCurrentUser[j].id === memberCards[i].memberId) {
          memberCard.push(memberCards[i]);
        }
      }
    }
    return memberCard;
  };

  const getCardsCurrentUser = () => {
    let memberCards = getMembersCardFilterCurrentUser();
    let cardArr = [];
    for (let i = 0; i < memberCards.length; i++) {
      let card = cards.find((c) => c.id === memberCards[i].cardId);
      if (!card) return [];
      cardArr.push(card);
    }
    return cardArr;
  };

  return getCardsCurrentUser();
}