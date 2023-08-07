import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateCardName } from '../../../../../redux/reducers/cardSlice';
import { CardDB, CardUpdateName } from '../../../../../types/Card.type';

const initState: CardUpdateName = {
  id: 0,
  name: '',
};

interface FormEditCardProps {
  card: CardDB | null;
}

const FormEditCard = ({ card }: FormEditCardProps) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState<CardUpdateName>(initState);
  const [isEditing, setEditing] = useState<boolean>(false);
  
  useEffect(() => {
    if(!card) return
    setInputValue(card)
  },[card])

  const handleSetCloseEdit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!card) return;
    setInputValue({ id: card.id, name: e.target.value });
  };

  const handleSubmit = (e:React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(updateCardName(inputValue))
    handleSetCloseEdit(e)
  };

  return (
    <div className=" ml-3 flex items-start w-full flex-col">
      <button
        onClick={() => setEditing(true)}
        className={`${
          isEditing
            ? 'p-0 h-0 w-0 opacity-0 overflow-hidden'
            : ' h-fit opacity-100'
        } text-[20px] leading-8 font-bold relative transition-all ease-in duration-200 text-[#9FADBC] rounded-[3px]`}
      >
        {isEditing ? '' : card ? card.name : ''}
      </button>
      <form
        className={`${
          isEditing ? 'h-full opacity-100' : 'h-0 opacity-0 overflow-hidden'
        } transition-all ease-in duration-200 w-full`}
      >
        <textarea
          value={inputValue.name}
          onChange={handleChange}
          placeholder="Nhập tên..."
          className="h-[56px] w-full resize-none outline-none py-2 px-3 bg-[#22272B] text-[#B6C2CF] text-[14px]"
        ></textarea>
        <div className="text-[14px]">
          <button
            disabled={inputValue.name.length !== 0 ? false : true}
            onClick={handleSubmit}
            className={`${
              inputValue.name.length === 0
                ? 'text-[#BFDBF847] bg-[#BCD6F00A] cursor-not-allowed'
                : 'bg-[#579DFF] text-[#1D2125]'
            } opacity-80 hover:opacity-100 transition-all ease-in duration-200 mr-2 font-normal mb-2 mt-2 text-sm leading-5 rounded-[3px] py-[6px] px-3`}
          >
            Sửa
          </button>
          <button
            onClick={handleSetCloseEdit}
            className="text-[#9FADBC] hover:bg-[#A6C5E229] transition-all ease-in duration-200 rounded-[3px] text-[14px] py-[6px] px-3"
          >
            Huỷ
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormEditCard;
