import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userInitState } from '../../../constant/userState';
import { Roles } from '../../../enum/Roles';
import * as memberSlice from '../../../redux/reducers/memberSlice';
import * as projectSlice from '../../../redux/reducers/projectSlice';
import * as tableSlice from '../../../redux/reducers/tableSlice';
import {
  memberSelector,
  projectSelector,
  tableSelector,
  userSelector,
} from '../../../redux/selectors';
import { Project } from '../../../types/Project.type';
import { User } from '../../../types/User.type';
import ProjectTag from './ProjectTag/ProjectTag';
import * as userSlice from '../../../redux/reducers/userSlice';
import { Table } from '../../../types/Table.type';

export default function ProjectManage() {
  const dispatch = useDispatch();
  const userLocalStore = localStorage.getItem('userLogin');
  const [userLogin, setUserLogin] = useState<User>(userInitState);
  // Lấy ra user đang đăng nhập
  useEffect(() => {
    if (userLocalStore) {
      setUserLogin(JSON.parse(userLocalStore));
    }
  }, [userLocalStore]);

  // Request danh sách project theo userId
  useEffect(() => {
    dispatch(projectSlice.findProjectsByUserId(userLogin.id));
  }, [userLogin]);

  useEffect(() => {
    dispatch(tableSlice.findAll());
    dispatch(memberSlice.findAll());
    dispatch(projectSlice.findAll());
    dispatch(userSlice.findAll());
  }, []);

  const users = useSelector(userSelector).users;
  const members = useSelector(memberSelector).members;
  const membersFilter = members.filter(
    (member) => member.userId === userLogin.id && member.role !== Roles.ADMIN
  );

  const projects = useSelector(projectSelector).projects;
  const tables = useSelector(tableSelector).listTable;

  const tablesFilterByMember = () => {
    let temps = [];
    for (let i = 0; i < membersFilter.length; i++) {
      let temp = tables.find((t) => t.id === membersFilter[i].tableId);
      if (!temp) return [];
      temps.push(temp);
    }
    return temps;
  };

  const projectsFilterByTable = () => {
    let tables = tablesFilterByMember();
    let temps = [];
    for (let i = 0; i < tables.length; i++) {
      let temp = projects.find((p) => p.id === tables[i].projectId);
      if (!temp) return [];
      temps.push(temp);
    }
    return temps;
  };

  const usersFilterByProject = () => {
    let projects = projectsFilterByTable();
    let temps: User[] = [];
    for (let i = 0; i < projects.length; i++) {
      let temp = users.find((u) => u.id === projects[i].userId);
      if (!temp) return [];
      if (!temps.find((t) => t.id === projects[i].userId)) {
        temps.push(temp);
      }
    }
    return temps;
  };

  const filterProjectByUser = (userId: number) => {
    let projects = projectsFilterByTable();
    return projects.filter((p) => p.userId === userId);
  };

  const memberElement = usersFilterByProject().map((user) => {
    const projectElement = filterProjectByUser(user.id).map((project) => {
      let tables: Table[] = tablesFilterByMember();
      return (
        <ProjectTag
          tables={tables}
          key={project.id}
          project={project}
          type="member"
        />
      );
    });
    return (
      <div key={user.id}>
        <h3 className="text-[#B6C2CF] font-bold my-5">
          CÁC KHÔNG GIAN LÀM VIỆC CỦA{' '}
          {user.fullName === '' ? user.email : user.fullName}
        </h3>
        {/* Project Tag Item */}
        {projectElement}
        {/* Project Tag Item */}
      </div>
    );
  });

  const listProjects: Project[] = useSelector(projectSelector).listProjects;

  const sortListProjects = listProjects.slice().sort((a, b) => {
    return b.id - a.id;
  });

  const projectTagElement = sortListProjects.map((project) => {
    let tables: Table[] = tablesFilterByMember();
    return (
      <ProjectTag
        tables={tables}
        key={project.id}
        project={project}
        type="user"
      />
    );
  });
  return (
    <div className="main mx-4 mt-10 max-w-[825px] min-w-[288px] w-full">
      <div className="sticky-main sticky top-0">
        <div>
          <h3 className="text-[#B6C2CF] font-bold my-5">
            CÁC KHÔNG GIAN LÀM VIỆC CỦA BẠN
          </h3>
          {/* Project Tag Item */}
          {projectTagElement}
          {/* Project Tag Item */}
        </div>
        {memberElement}
      </div>
    </div>
  );
}
