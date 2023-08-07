import React, { useContext } from 'react';
import { SubnavContext } from '../../../DetailProject/DetailProject';
import { CardContext } from '../CardModal';

const CardLabel = () => {
  const subNavContext = useContext(SubnavContext);
  const selectCard = useContext(CardContext);

  const cardLabels = subNavContext ? subNavContext.cardLabels : [];
  const cardLabelsFilterByCard = selectCard
    ? cardLabels.filter((cl) => cl.cardId === selectCard.id)
    : [];

  const labels = subNavContext ? subNavContext.labels : [];

  const getCardLabels = () => {
    let temps = [];
    for (let i = 0; i < cardLabelsFilterByCard.length; i++) {
      let temp = labels.find(
        (label) => label.id === cardLabelsFilterByCard[i].labelId
      );
      if (!temp) return [];
      temps.push(temp);
    }
    return temps;
  };

  const labelElement = getCardLabels().map((label) => {
    return (
      <div
        style={{ backgroundColor: `${label.code}` }}
        key={label.id}
        className="h-8 px-3 flex items-center rounded-[3px] min-w-[48px]"
      >
        <span className='text-[14px] text-[#fff] font-semibold'>{label.labelName}</span>
      </div>
    );
  });

  return (
    <div className="mb-4 mr-7">
      <div className="text-[#9FADBC] text-left text-[12px] font-bold mb-2">
        Nhãn
      </div>
      <div className="flex items-center gap-1">{labelElement}</div>
    </div>
  );
};

export default CardLabel;
