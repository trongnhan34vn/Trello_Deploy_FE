
import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { deleteWork } from '../../../../../redux/reducers/workSlice';
import { Work, WorkDel } from '../../../../../types/Work.type';

interface DelWorkProps {
  close: () => void;
  work: Work
}

const FormDeleteWork = ({close, work} : DelWorkProps) => {
  const dispatch = useDispatch()
  const closeForm = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    close()
  }
  const handleDelete = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let workDel: WorkDel = {
      id: work.id,
      cardId: work.cardId,
    };
    dispatch(deleteWork(workDel));
    close()
  };
  return (
    <form className="bg-[#282E32] pt-3 w-[304px] rounded-[8px] text-[14px] font-semibold">
      <header className="py-1 px-2 relative">
        <h1 className="px-8 h-10 flex items-center justify-center text-center w-full">
          Bạn có muốn xoá {work.name}?
        </h1>
        <button
        onClick={closeForm}
        className="absolute z-10 top-0 right-1 text-[#B6C2CF] py-1 px-2"
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
      </header>
      <div className="px-3 pb-3">
        <div className="">
          <p className="text-[14px] font-normal mb-2">
            Danh sách công việc sẽ bị xoá vĩnh viễn và không bao giờ lấy lại
            được.
          </p>
        </div>
        <div>
          <button onClick={handleDelete} className="bg-[#F87462] hover:bg-[#FF9C8F] transition-all ease-in duration-100 font-normal rounded-[3px] text-[#1D2125] w-full text-[14px] py-[6px] px-3">
            Xoá danh sách công việc
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormDeleteWork;
