import React, { Fragment } from 'react';
import { Task, TaskStatus } from '../../../../../types/Task.type';
import { Popover, Transition } from '@headlessui/react';
import FormFeatureLayout from '../FormFeatureLayout';
import { FeatureContext } from '../CreateFeatureBtn';
import { ModalFeatureProps } from './ModalFeature';
import { User } from '../../../../../types/User.type';
import { Member } from '../../../../../types/Member.type';

const feature: ModalFeatureProps = {
  name: 'Chỉ định',
  code: 'TS',
  icon: '',
};

interface AssignmentTaskProps {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  task: Task;
  assignUser: User | null | undefined;
  assignMember: Member | undefined;
}

const AssignmentTask = ({
  setActive,
  task,
  assignUser,
  assignMember,
}: AssignmentTaskProps) => {


  return (
    <Popover className="relative flex">
      <Popover.Button className="w-full outline-none">
        <div className="focus:bg-[#A6C5E229] w-7 flex items-center justify-center mr-1 h-7 rounded-[4px] hover:bg-[#A6C5E229] transition-all ease-in duration-200 opacity-80  hover:opacity-100">
          {assignUser && task.member && assignMember && task.member === assignMember.id && assignUser.id === assignMember.userId ? (
            <img className="w-7 h-7 rounded-[50%]" src={assignUser.imageUrl} />
          ) : (
            <i className="fa-solid text-[14px] text-[#fff] fa-user-plus"></i>
          )}
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
        <Popover.Panel className="absolute -left-[850%] top-[118%] z-50">
          {({ close, open }) => {
            // setActive(open);
            return (
              <FeatureContext.Provider
                value={{ feature: feature, closeFn: close, task: task }}
              >
                <FormFeatureLayout closeFn={close} />;
              </FeatureContext.Provider>
            );
          }}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default AssignmentTask;
