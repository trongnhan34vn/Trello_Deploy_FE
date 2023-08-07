import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '../../../../../redux/reducers/taskSlice';
import { TaskForm } from '../../../../../types/Task.type';

const initState: TaskForm = {
  name: '',
  workId: 0,
  endAt: 0,
  status: false
};

interface CreateTaskProps {
  workId: number;
}

const FormCreateTask = ({ workId }: CreateTaskProps) => {
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState<TaskForm>(initState);
  const [isEditing, setEditing] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue({...inputValue,
      name: e.target.value,
      workId: workId,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(createTask(inputValue));
    handleSetCloseEdit(e);
    setInputValue({...inputValue, name: ''})
  };

  const handleSetCloseEdit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setEditing(false);
  };
  return (
    <div className="ml-7 flex items-start flex-col mt-2">
      <button
        onClick={() => setEditing(true)}
        className={`${
          isEditing
            ? 'p-0 h-0 w-0 opacity-0 overflow-hidden'
            : 'py-[6px] h-fit px-3 opacity-100'
        } text-[14px] w-1/4 relative transition-all ease-in duration-200 text-[#9FADBC] bg-[#A1BDD914] rounded-[3px]`}
      >
        {isEditing ? '' : 'Thêm một mục'}
      </button>
      <form
        className={`${
          isEditing ? 'h-full opacity-100' : 'h-0 opacity-0 overflow-hidden'
        } transition-all ease-in duration-200 w-full`}
      >
        <textarea
          value={inputValue.name}
          onChange={handleChange}
          placeholder="Thêm một mục..."
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
            Thêm
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

export default FormCreateTask;
