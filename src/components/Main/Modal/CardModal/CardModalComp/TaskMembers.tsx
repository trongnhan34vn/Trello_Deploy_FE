import React, { useContext, useEffect } from 'react';
import { Member, MemberUpdateTask } from '../../../../../types/Member.type';
import { SubnavContext } from '../../../DetailProject/DetailProject';
import { useParams } from 'react-router-dom';
import { FeatureContext } from '../CreateFeatureBtn';
import { useDispatch, useSelector } from 'react-redux';
import { updateTask } from '../../../../../redux/reducers/memberSlice';
import { TaskUpdateMember } from '../../../../../types/Task.type';
import { updateMember } from '../../../../../redux/reducers/taskSlice';
import { userSelector } from '../../../../../redux/selectors';

interface TaskMembersProps {
  member: Member;
  inputValue: string;
}

export const TaskMembers = ({ member, inputValue }: TaskMembersProps) => {
  const dispatch = useDispatch();
  const subNavContext = useContext(SubnavContext);
  const featureContext = useContext(FeatureContext);
  const task = featureContext ? featureContext.task : null;
  const users = subNavContext ? subNavContext.users : [];
  const usersFilter = users.filter((user) => user.id === member.userId);
  const searchUsers = useSelector(userSelector).search;
  const searchFilters = searchUsers.filter((user) => user.id === member.userId);

  const handleUpdateTask = (id: number) => {
    if(!featureContext) return
    if(!task) return;
    let taskUpdate: TaskUpdateMember = {
      member: (member.id === task.member) ? null : id,
      id: task.id,
    }
    dispatch(updateMember(taskUpdate))
    featureContext.closeFn()
  };

  const returnUser  = () => {
    if(inputValue.trim() === '') return usersFilter
    return searchFilters;
  }

  const memberElement = returnUser().map((user) => {
    return (
      <div
        key={user.id}
        onClick={() => handleUpdateTask(member.id)}
        className="flex items-center cursor-pointer hover:bg-[#A6C5E229] p-2 rounded-[4px]"
      >
        <img
          src={user.imageUrl}
          className=" w-8 h-8 rounded-[50%] flex items-center text-[#fff] mr-2 justify-center"
        />

        <p className="text-[#B6C2CF] text-[14px]">
          {user.fullName} ({user.email})
        </p>
      </div>
    );
  });
  return <>{memberElement}</>;
};
