import React from 'react';

const Head = () => {
  return (
    <div className="title mr-[15px] ml-[15px] h-[41px] flex items-center border-b-[2px] border-b-[#333B43]">
      <div className="w-[calc(32%_-_20px)] text-[#9FADBC] p-2 font-bold inline-flex items-center text-[12px]">
        <span>Thẻ</span>
      </div>
      <div className="w-[17%] text-[#9FADBC] p-2 font-bold inline-flex items-center text-[12px]">
        <span>Danh sách</span>
      </div>
      <div className="w-[17%] text-[#9FADBC] p-2 font-bold inline-flex items-center text-[12px]">
        <span>Nhãn</span>
      </div>
      <div className="w-[17%] text-[#9FADBC] p-2 font-bold inline-flex items-center text-[12px]">
        <span>Thành viên</span>
      </div>
      <div className="w-[17%] text-[#9FADBC] p-2 font-bold inline-flex items-center text-[12px]">
        <span>Ngày hết hạn</span>
      </div>
    </div>
  );
};

export default Head;
