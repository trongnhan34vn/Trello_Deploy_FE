import React, { Fragment, useEffect, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import * as taskSlice from '../../../../../redux/reducers/taskSlice';
import * as workSlice from '../../../../../redux/reducers/workSlice';
import { taskSelector } from '../../../../../redux/selectors';
import { Work, WorkDel } from '../../../../../types/Work.type';
import FormCreateTask from './FormCreateTask';
import FormDeleteWork from './FormDeleteWork';
import Task from './Tasks';

interface WorkProps {
  work: Work;
}

export default function Works({ work }: WorkProps) {
  const dispatch = useDispatch();
  const [workDel, setWorkDel] = useState<WorkDel>({
    id: 0,
    cardId: 0,
  });

  useEffect(() => {
    dispatch(taskSlice.findAll());
  }, [work]);

  const tasks = useSelector(taskSelector).listTask;
  const tasksByWorkId = tasks.filter((task) => task.workId === work.id);

  const getFinishedTaskPercent = () => {
    if (tasksByWorkId.length === 0) return 100;
    const taskFinish = tasksByWorkId.filter((task) => task.status === true);
    const finishPercent = (taskFinish.length / tasksByWorkId.length) * 100;
    return Math.round(100 - finishPercent);
  };

  const taskElement = tasksByWorkId.map((task) => {
    return <Task key={task.id} task={task} />;
  });
  return (
    <div className="item mb-6 transition-all ease-in duration-200">
      <div className="flex text-[#9FADBC] justify-between items-center mb-2">
        <div className="flex items-center">
          <i className="fa-regular fa-square-check mr-3 text-[20px]"></i>
          <h2 className="text-[18px] font-semibold">{work.name}</h2>
        </div>
        <div>
          <Popover className="relative">
            <Popover.Button className="outline-none">
              <div>
                <button
                  className="hover:bg-[#A6C5E229] transition-all ease-in duration-150 rounded-[3px] text-[14px] py-[6px] px-3 bg-[#3A444C]"
                >
                  Xoá
                </button>
              </div>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Popover.Panel className="absolute z-50 top-[calc(100%_+_4px)] right-0">
                {({ close }) => <FormDeleteWork work={work} close={close} />}
              </Popover.Panel>
            </Transition>
          </Popover>
        </div>
      </div>
      <div className="mb-10 w-full relative">
        {/* title */}
        <div className="flex items-center mb-2">
          <div className="">
            <div className="text-[#9FADBC] text-[12px] max-w-[30px]">
              {100 - getFinishedTaskPercent()}%
            </div>
          </div>
          <div className="w-full ml-[10px]">
            <div className="rounded-[4px] h-2 w-full overflow-hidden relative bg-[#3A444C]">
              <div
              style={{transform: `translateX(-${getFinishedTaskPercent()}%)`}}
                className={`transition-all ease-in-out duration-200 rounded-[4px] h-2 w-full overflow-hidden absolute top-0 left-0 bg-green-400`}
              ></div>
            </div>
          </div>
        </div>
        {/* title */}
        {/* work */}
        {taskElement}
        {/* work */}
        <FormCreateTask workId={work.id} />
      </div>
    </div>
  );
}
