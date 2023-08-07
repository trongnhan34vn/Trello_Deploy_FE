import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as taskSlice from '../../../../../redux/reducers/taskSlice';
import {
  Task,
  TaskStatus,
  TaskUpdateMember,
} from '../../../../../types/Task.type';
import AssignmentTask from './AssignmentTask';
import { SubnavContext } from '../../../DetailProject/DetailProject';

interface TaskProps {
  task: Task;
}

export default function Tasks({ task }: TaskProps) {
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    dispatch(taskSlice.changeStatus({ id: id, status: !task.status }));
  };

  const [active, setActive] = useState<boolean>(false);
  const subNavContext = useContext(SubnavContext);
  const members = subNavContext ? subNavContext.members : [];
  const assginMember = members.find(
    (member) => member.id === task.member && task.member !== undefined
  );
  const users = subNavContext ? subNavContext.users : [];
  const assignUser = assginMember
    ? users.find((user) => user.id === assginMember.userId)
    : null;

  const handleRemoveTask = (id: number) => {
    dispatch(taskSlice.remove(id));
  };

  return (
    <div
      className={`${
        active ? 'bg-[#A6C5E229]' : ''
      } group hover:bg-[#A6C5E229] rounded-[4px] box-border justify-between flex items-center`}
    >
      <div className="flex items-center px-2 py-1">
        <div className="flex items-center justify-start mr-3">
          <input
            checked={task.status}
            onChange={(e) => handleChange(e, task.id)}
            className="block -mb-[2px] p-2"
            type="checkbox"
          />
        </div>
        <div className="flex items-center">
          <span className="text-[16px] text-[#9FADBC]">{task.name}</span>
        </div>
      </div>
      <div className="flex items-center py-1">
        <button className="w-7 flex items-center justify-center mr-1 h-7 rounded-[4px] hover:bg-[#A6C5E229] transition-all ease-in duration-200 opacity-80  hover:opacity-100">
          <i className="fa-regular text-[14px] text-[#fff] fa-clock"></i>
        </button>
        <AssignmentTask
          assignUser={assignUser}
          setActive={setActive}
          task={task}
          assignMember={assginMember}
        />
        <button
          onClick={() => handleRemoveTask(task.id)}
          className="w-7 flex items-center justify-center mr-1 h-7 rounded-[4px] hover:bg-[#A6C5E229] transition-all ease-in duration-200 opacity-80  hover:opacity-100"
        >
          <i className="fa-solid fa-trash-can text-[14px] text-red-500"></i>
        </button>
      </div>
    </div>
  );
}
