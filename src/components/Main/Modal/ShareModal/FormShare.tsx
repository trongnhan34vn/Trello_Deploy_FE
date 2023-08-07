import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../../assets/svg/Loading';
import { Roles } from '../../../../enum/Roles';
import { createMember } from '../../../../redux/reducers/memberSlice';
import { notify } from '../../../../redux/reducers/notifySlice';
import { searchByEmail } from '../../../../redux/reducers/userSlice';
import { projectSelector, userSelector } from '../../../../redux/selectors';
import { Member, MemberForm } from '../../../../types/Member.type';
import { Notify } from '../../../../types/Notify.type';
import { User } from '../../../../types/User.type';
import { SubnavContext } from '../../DetailProject/DetailProject';
import InputSearch from './InputSearch';
import SelectRoles from './SelectRoles';

const roles = [Roles.MEMBER, Roles.OBSERVER];

interface FormShare {
  memberList: Member[];
}

const FormShare = ({ memberList }: FormShare) => {
  const dispatch = useDispatch();
  const [selectRoles, setSelectRoles] = useState(roles[0]);
  const [selectUser, setSelectUser] = useState<User | null>(null);
  const [query, setQuery] = useState<string>('');
  const [selectUsers, setSelectUsers] = useState<User[]>([]);

  const userLocal = localStorage.getItem('userLogin');
  const currentUser: User = userLocal ? JSON.parse(userLocal) : null;

  const users = useSelector(userSelector).search;

  const [usersFilter, setUserFilter] = useState<User[]>([]);

  useEffect(() => {
    if (!currentUser) return;
    if (!users) return;
    let usersFiltered = [...users].filter((user) => user.id !== currentUser.id);
    setUserFilter(usersFiltered);
  }, [users]);

  // const selectProject = useSelector(projectSelector).selectProject;
  const [loading, setLoading] = useState<boolean>(false);

  const subNavContext = useContext(SubnavContext);

  useEffect(() => {
    dispatch(searchByEmail(query));
  }, [query]);

  const exchangeToMember = (user: User) => {
    let member: MemberForm = {
      userId: user.id,
      tableId: subNavContext ? subNavContext.tableId : 0,
      role: Roles.MEMBER,
    };
    return member;
  };

  useEffect(() => {
    if (!selectUser) return;
    if (!checkExists(selectUser, selectUsers)) {
      setSelectUsers([...selectUsers, selectUser]);
      let member = exchangeToMember(selectUser);
      setMembers([...members, member]);
    }
  }, [selectUser]);

  const [members, setMembers] = useState<MemberForm[]>([]);

  const checkExists = (user: User, users: User[]) => {
    return users.find((u) => u.id === user.id);
  };

  useEffect(() => {
    let arr = members;
    for (let i = 0; i < arr.length; i++) {
      arr[i].role = selectRoles;
    }
    setMembers(arr);
  }, [selectRoles]);

  const checkExist = (memberList: Member[], userId: number) => {
    for (let i = 0; i < memberList.length; i++) {
      if (memberList[i].userId === userId) return true;
    }
    return false;
  };

  const handleSubmit = () => {
    if (selectUsers.length !== 0) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        for (let i = 0; i < members.length; i++) {
          if (!checkExist(memberList, members[i].userId)) {
            dispatch(createMember(members[i]));
          } else {
            let notifyError: Notify = {
              type: 'error',
              message: 'You have already shared table with this user!'
            }
            dispatch(notify(notifyError));
          }
        }
      }, 3000);
    } else {
      let notifyError: Notify = {
        type: 'error',
        message: 'Please choose member you want to share!'
      }
      dispatch(notify(notifyError));
    }
    setTimeout(() => {
      dispatch(notify(null));
    }, 1000)
  };

  return (
    <div>
      <div className="flex items-center">
        <div className="relative w-full max-w-[341px] mr-2">
          <InputSearch
            selectUser={selectUser}
            setSelectUser={setSelectUser}
            users={usersFilter}
            query={query}
            setQuery={setQuery}
            currentUser={currentUser}
            members={members}
            setMembers={setMembers}
            setSelectUsers={setSelectUsers}
            selectUsers={selectUsers}
            loading={loading}
          />
        </div>
        <SelectRoles
          selectRoles={selectRoles}
          setSelectRoles={setSelectRoles}
          roles={roles}
        />

        <button
          onClick={handleSubmit}
          className="bg-[#579DFF] w-[75px] relative hover:opacity-90 opacity-100 transition-all ease-in-out duration-200 rounded-[3px] h-[37px] text-[14px] py-[6px] px-[12px]"
        >
          {loading ? (
            <div className="absolute top-[-12px] left-[-6px] w-full">
              <Loading />
            </div>
          ) : (
            'Chia sẻ'
          )}
        </button>
      </div>
    </div>
  );
};

export default FormShare;
