import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { findProjectsByUserId } from '../../../redux/reducers/projectSlice';
import { projectSelector } from '../../../redux/selectors';
import FormProject from '../Modal/FormProject';
import Projects from './Projects';

export default function SideMenu(props: {
  isOpen: any;
  openModal: any;
  closeModal: any;
}) {
  const dispatch = useDispatch();
  const userLocal = localStorage.getItem('userLogin');
  const currentUser = userLocal ? JSON.parse(userLocal) : null;

  useEffect(() => {
    if(!currentUser) return
    dispatch(findProjectsByUserId(currentUser.id))
  }, []);
  
  const location = useLocation();
  const projects = useSelector(projectSelector).listProjects;
  return (
    <div className="side sticky h-[500px] top-2">
      <nav className="mt-10 px-4 w-[272px]">
        <ul className="side-container border-b-[1px] border-b-[#091e4224]">
          <li className="side-item mb-1">
            <NavLink
              className={`${
                location.pathname === '/main-app/project-manage'
                  ? 'bg-[#092957] text-[#579DFF]'
                  : 'text-[#B6C2CF]'
              }  font-bold h-min-[20px] items-center rounded-[4px] py-[6px] px-2 flex hover:bg-[#A6C5E229]`}
              to={'/main-app/project-manage'}
            >
              <i className="fa-solid fa-table mr-2"></i>
              Bảng
            </NavLink>
          </li>
          <li className="side-item mb-1">
            <a
              className="text-[#B6C2CF] font-bold h-min-[20px] items-center rounded-[4px] py-[6px] px-2 flex hover:bg-[#A6C5E229]"
              href=""
            >
              <i className="fa-solid fa-chart-simple mr-2"></i>
              Mẫu
            </a>
          </li>
          <li className="side-item mb-1">
            <NavLink
              className={`${
                location.pathname === '/main-app'
                  ? 'bg-[#092957] text-[#579DFF]'
                  : 'text-[#B6C2CF]'
              } font-bold h-min-[20px] items-center rounded-[4px] py-[6px] px-2 flex hover:bg-[#A6C5E229]`}
              to={'/main-app'}
            >
              <i className="fa-solid fa-house mr-2"></i>
              Trang chủ
            </NavLink>
          </li>
        </ul>
        <Projects openModal={props.openModal} projects={projects} />
        <FormProject isOpen={props.isOpen} closeModal={props.closeModal} />
      </nav>
    </div>
  );
}
