import React from 'react';

export default function AddLinkCard({onClick}:any) {
  return (
    <div className=" items-center flex flex-shrink-0 relative transition-all ease-in-out duration-200 justify-between">
      <button
        onClick={onClick}
        type="button"
        className="hover:bg-[#A6C5E229] transition-all ease-in-out duration-200 rounded-[8px] min-h-[32px] text-sm text-left text-[#B6C2CF] w-full block my-2 py-1 pl-[6px] pr-2 relative "
      >
        <i className="fa-solid fa-plus text-sm mr-[6px]"></i>
        <span className="">Thêm thẻ</span>
      </button>
    </div>
  );
}
