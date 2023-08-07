import React from 'react';

export default function Tag(props: { openModal: any }) {
  return (
    <button
      onClick={() => props.openModal()}
      type="button"
      className="text-left hover:bg-[#091E4224] rounded-[8px] flex-shrink-0 mb-[1px] bg-[#fff] shadow-[0_1px_1px_#091e4240] text-[#000] cursor-pointer block max-w-[300px] min-h-[20px] relative scroll-m-2 z-0"
    >
      <span className="block pt-2 pr-2 pb-1 pl-3 clear-both text-[#000] mb-1 overflow-hidden">
        anh Nam gucci
      </span>
    </button>
  );
}
