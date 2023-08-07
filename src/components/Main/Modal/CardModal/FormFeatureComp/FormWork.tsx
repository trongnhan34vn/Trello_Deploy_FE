import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createWork } from '../../../../../redux/reducers/workSlice';
import { WorkForm } from '../../../../../types/Work.type';
import { CardContext } from '../CardModal';
import { FeatureContext } from '../CreateFeatureBtn';

const workInitState: WorkForm = {
  cardId: 0,
  name: '',
  process: 0,
};

export default function FormWork() {
  const dispatch = useDispatch();
  const card = useContext(CardContext);
  const [inputValue, setInputValue] = useState<WorkForm>(workInitState);
  const featureContext = useContext(FeatureContext);

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    
    if (!featureContext) return;
    e.preventDefault();
    dispatch(createWork(inputValue));
    setInputValue(workInitState);
    featureContext.closeFn();
  };

  const activeButton = () => {
    if (inputValue.name.trim() !== '') {
      return true;
    }
    return false;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!card) return;
    setInputValue({ ...inputValue, name: e.target.value, cardId: +card.id });
  };
  return (
    <form className="">
      <div className="mb-3">
        <label className="block mb-1 mt-3 font-bold text-[12px] text-[#B6C2CF]">
          Tiêu đề
        </label>
        <input
          onChange={handleChange}
          name="name"
          value={inputValue.name}
          className="mt-[2px] border-[2px] border-[#A6C5E229] bg-[#22272B] text-[#B6C2CF] outline-[#EF5C48] text-sm leading-5 w-full py-1 px-2 rounded-[3px]"
          type="text"
          placeholder="Việc cần làm..."
        />
      </div>
      <div className="">
        <button
          disabled={!activeButton()}
          onClick={handleSubmit}
          className={`
              ${
                activeButton()
                  ? 'bg-[#579DFF] text-[#1D2125]'
                  : 'text-[#BFDBF847] bg-[#BCD6F00A] cursor-not-allowed'
              }
              w-full font-normal transition-all ease-in duration-200 mb-2 mt-4 text-sm leading-5 rounded-[3px] py-[6px] px-3 bg-[#579DFF]`}
        >
          <span>Tiếp tục</span>
        </button>
      </div>
    </form>
  );
}
