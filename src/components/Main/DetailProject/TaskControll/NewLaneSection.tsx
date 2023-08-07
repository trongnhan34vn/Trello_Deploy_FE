import React from 'react';

export default function NewLaneSection({onClick}:any) {
  return (
    <div className="mx-[6px]  my-[5px] inline-block h-full scroll-m-2 align-top whitespace-nowrap w-[272px]">
      <button onClick={onClick} className="hover:bg-[#A6C5E229] transition-all ease-in-out duration-200 bg-[#ffffff3d] flex items-center w-full rounded-[12px] py-[14px] px-4 text-[#fff]">
        <i className="block fa-solid fa-plus mr-2"></i>
        <span className='block'>Thêm mới danh sách</span>
      </button>
    </div>
  );
}
