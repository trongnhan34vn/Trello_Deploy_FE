import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateCardDate } from '../../../../../redux/reducers/cardSlice';
import { CardUpdateDate } from '../../../../../types/Card.type';
import { convertDateToTimeStamp, convertTimeStampToDate } from '../../../../../utils/timeConvert';
import { CardContext } from '../CardModal';
import { FeatureContext } from '../CreateFeatureBtn';

const initInput: CardUpdateDate = {
  id: 0,
  createdAt: 0,
  endAt: 0,
}

const FormDate = () => {
  const featureContext = useContext(FeatureContext);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState<CardUpdateDate>(initInput);
  const selectCard = useContext(CardContext);

  useEffect(() => {
    if (!selectCard) return;
    setInputValue({
      id: selectCard.id,
      createdAt: selectCard.createdAt,
      endAt: selectCard.endAt,
    });
  }, [selectCard]);

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(updateCardDate(inputValue));
    if(!featureContext) return;
    featureContext.closeFn();
    setInputValue(initInput);
  };

  const activeButton = () => {
    if (inputValue.endAt !== 0) {
      return true;
    }
    return false;
  };
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let name = e.target.name;
    let value = e.target.value;
    setInputValue({ ...inputValue, [name]: convertDateToTimeStamp(value) });
  };
  return (
    <form className="">
      <div className="mb-3">
        <label className="block mb-1 mt-3 font-bold text-[12px] text-[#B6C2CF]">
          Ngày bắt đầu
        </label>
        <input
          onChange={handleChange}
          name="createdAt"
          value={convertTimeStampToDate(inputValue.createdAt)}
          className="mt-[2px] border-[2px] border-[#A6C5E229] bg-[#22272B] text-[#B6C2CF] outline-[#EF5C48] text-sm leading-5 w-full py-1 px-2 rounded-[3px]"
          type="datetime-local"
          placeholder="Tìm kiếm Thành viên"
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1 mt-3 font-bold text-[12px] text-[#B6C2CF]">
          Ngày kết thúc
        </label>
        <input
          onChange={handleChange}
          name="endAt"
          value={
            inputValue.endAt === 0
              ? ''
              : convertTimeStampToDate(inputValue.endAt)
          }
          type="datetime-local"
          className="mt-[2px] border-[2px] border-[#A6C5E229] bg-[#22272B] text-[#B6C2CF] outline-[#EF5C48] text-sm leading-5 w-full py-1 px-2 rounded-[3px]"
          placeholder="Tìm kiếm Thành viên"
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
              w-full font-normal mb-2 mt-4 text-sm leading-5 rounded-[3px] py-[6px] px-3 bg-[#579DFF]`}
        >
          <span>Tiếp tục</span>
        </button>
      </div>
    </form>
  );
};

export default FormDate;
