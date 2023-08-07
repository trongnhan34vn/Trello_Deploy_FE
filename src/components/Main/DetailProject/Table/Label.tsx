import React from 'react';
import { CardLabel } from '../../../../types/CardLabel.type';
import { Label } from '../../../../types/Label.type';

interface LabelProps {
  cardLabels: CardLabel[];
  labels: Label[];
  cardId: number;
}

const LabelComp = ({ cardLabels, labels, cardId }: LabelProps) => {
  const filterLabelsByCard = (cardId: number) => {
    let cl = cardLabels.filter((cl) => cl.cardId === cardId);
    let temps = [];
    for (let i = 0; i < cl.length; i++) {
      let temp = labels.find((label) => label.id === cl[i].labelId);
      if (!temp) return [];
      temps.push(temp);
    }
    return temps;
  };

  const labelElement = filterLabelsByCard(cardId).map((label) => {
    return (
      <div
        style={{ backgroundColor: `${label.code}` }}
        className="rounded-[4px] min-w-[56px] h-4 flex justify-center items-center"
      >
        <span className="text-[#fff] text-one-line text-[12px]">{label.labelName}</span>
      </div>
    );
  });

  return <>{labelElement}</>;
};

export default LabelComp;
