import React, { SetStateAction } from 'react';
import { Label } from '../../../../../types/Label.type';

interface LabelProps {
  label: Label;
  selectInputs: number[];
  handleClick: (labelId: number) => void;
  setAddLabel: React.Dispatch<SetStateAction<string>>;
  setEditLabel: React.Dispatch<SetStateAction<Label | null>>;
}

const LabelComp = ({
  label,
  selectInputs,
  handleClick,
  setAddLabel,
  setEditLabel,
}: LabelProps) => {
  const handleEdit = (labelParam: Label) => {
    setEditLabel(labelParam);
    setAddLabel('edit');
  };

  return (
    <div
      key={label.id}
      className="flex w-full transition-all ease-in duration-150  cursor-pointer items-center mb-1"
    >
      <div
        onClick={() => handleClick(label.id)}
        className="hover:opacity-80 flex w-full transition-all ease-in duration-100 "
      >
        <input
          onChange={() => {}}
          checked={selectInputs.includes(label.id)}
          type="checkbox"
        />
        <div
          style={{ backgroundColor: `${label.code}` }}
          className={`ml-3 mr-3 flex-1 flex items-center rounded-[3px] h-8 px-3`}
        >
          <span className="text-[14px] text-[#fff]">{label.labelName}</span>
        </div>
      </div>
      <div>
        <button
          onClick={() => handleEdit(label)}
          className="text-[#B6C2CF] text-[14px] p-2 w-[37px] transition-all ease-in duration-100 hover:bg-[#A6C5E229] rounded-[3px]"
        >
          <i className="fa-regular fa-pen-to-square"></i>
        </button>
      </div>
    </div>
  );
};

export default LabelComp;
