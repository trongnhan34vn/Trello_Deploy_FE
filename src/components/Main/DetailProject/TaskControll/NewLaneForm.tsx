import { Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
interface LaneForm {
  id: string;
  title: string;
}

const initialState: LaneForm = {
  id: '',
  title: '',
};
export default function NewLaneForm(props: {
  onAdd: (lane: LaneForm) => void;
  onCancel: () => void;
}) {
  const [inputValue, setInputValue] = useState<LaneForm>(initialState);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setInputValue({ id: 'nam béo', title: value });
  };
  const handleSubmit = () => {
    if (inputValue.title !== '') {
      props.onAdd(inputValue);
    }
  };

  const checkActiveBtn = () => {
    if (inputValue.title === '') return true;
    return false;
  };

  return (
    <Transition
      show={true}
      as={Fragment}
      leave="transition ease-in duration-250"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-0"
    >
      <div className="mx-[6px] my-[5px] bg-[#101204] rounded-[12px] p-2 inline-block h-full scroll-m-2 align-top whitespace-nowrap w-[272px]">
        <input
          onChange={handleChange}
          type="text"
          value={inputValue.title}
          className="bg-[#22272B] px-3 py-2 text-[14px] text-[#B6C2CF] w-full h-full rounded-[3px] block mb-2"
          placeholder="Nhập tiêu đề danh sách"
        />
        <div className="flex">
          <button
            disabled={(checkActiveBtn())}
            onClick={handleSubmit}
            className={`${
              !checkActiveBtn()
                ? 'bg-[#0C66E4] text-[#1D2125]'
                : 'text-[#BFDBF847] bg-[#BCD6F00A] cursor-not-allowed'
            } text-sm rounded-[3px] py-[6px] px-3 text-[#fff] mr-2`}
          >
            Thêm danh sách
          </button>
          <button
            onClick={props.onCancel}
            className="w-8 h-8 flex items-center justify-center"
          >
            <i className="fa-solid fa-xmark text-2xl text-[#9FADBC]"></i>
          </button>
        </div>
      </div>
    </Transition>
  );
}
