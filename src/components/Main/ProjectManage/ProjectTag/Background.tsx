import React, { SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectBGId } from '../../../../redux/reducers/backgroundSlice';

interface BackgroundProps {
  bgUrl: string;
  bgId: number;
  setSelectBG: React.Dispatch<SetStateAction<number>>;
  selectBG: number;
}

export default function Background({
  bgUrl,
  bgId,
  setSelectBG,
  selectBG,
}: BackgroundProps) {
  const dispatch = useDispatch()
  const handleSelectBG = (
    id: number,
    e: React.FormEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setSelectBG(id);
    dispatch(selectBGId(id));
  };

  return (
    <button
      onClick={(e) => handleSelectBG(bgId, e)}
      style={{ backgroundImage: 'url(' + bgUrl + ')' }}
      className={`
      hover:opacity-100 relative opacity-75 block bg-center bg-no-repeat bg-cover rounded-[3px] w-[64px] h-[40px]`}
    >
      <span
        className={`${
          selectBG === bgId ? '' : 'hidden'
        } absolute inset-0 bg-[#FFFFFF29] text-[12px] flex items-center justify-center`}
      >
        <i className="fa-solid fa-check"></i>
      </span>
    </button>
  );
}
