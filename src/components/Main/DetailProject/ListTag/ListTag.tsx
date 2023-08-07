import React from 'react';
import Tag from '../Tag/Tag';

export default function ListTag(props: {createTagElement:any, openModal:any}) {
  return (
    <div className="mx-[6px] inline-block h-full scroll-m-2 align-top whitespace-nowrap w-[272px]">
      <div className="bg-[#f1f2f4] rounded-xl shadow-lg flex flex-col max-h-full relative whitespace-normal w-full">
        <div className="pr-9 min-h-[20px] py-[14px] px-2 relative">
          <div className="bottom-0 left-0 absolute top-0 right-0 cursor-pointer"></div>
          <textarea
            onChange={() => {}}
            value={'Cần làm'}
            className="overflow-hidden h-7 bg-[#0000] text-base border-none rounded-[3px] text-[#000] font-semibold my-[-4px] max-h-[256px] min-h-[20px] py-1 pr-2 pl-3 resize-none w-[224px]"
          ></textarea>
        </div>
        <div className="flex flex-auto flex-col gap-[7px] justify-between mx-1 min-h-0 overflow-x-hidden overflow-y-auto px-1 pt-[1px] z-10">
          {/* Item */}
          <Tag openModal={props.openModal} />
          {/* Item */}
        </div>
        {props.createTagElement()}
      </div>
    </div>
  );
}
