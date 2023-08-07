import React, { SetStateAction } from 'react';

interface WordFilterProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const WordFilter = ({handleChange}: WordFilterProps) => {
  return (
    <div className="word">
      <label className="text-[12px] font-bold text-[#9FADBC] block mt-4 mb-2">
        Từ khoá
      </label>
      <input
        onChange={handleChange}
        className="w-full  rounded-[3px] bg-[#22272B] text-[#B6C2CF] border-[2px] border-[#A6C5E229] outline-none px-3 py-2 leading-5 text-[14px] font-normal"
        placeholder="Nhập từ khoá..."
        type="text"
      />
      <span className="text-[11px] mt-2 mb-1 leading-[14px] text-[#9FADBC]">
        Tìm kiếm các thẻ, các thành viên, các nhãn và hơn thế nữa.
      </span>
    </div>
  );
};

export default React.memo(WordFilter);
