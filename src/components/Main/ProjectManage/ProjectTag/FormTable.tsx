import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../../../assets/svg/Spinner';
import { Roles } from '../../../../enum/Roles';
import { createMember } from '../../../../redux/reducers/memberSlice';
import {
  createTable,
  resetTableJustAdded,
} from '../../../../redux/reducers/tableSlice';
import {
  backgroundSelector,
  projectSelector,
  tableSelector,
} from '../../../../redux/selectors';
import { MemberForm } from '../../../../types/Member.type';
import { TableDTO } from '../../../../types/Table.type';
import { User } from '../../../../types/User.type';
import ListBackgrounds from './ListBackgrounds';
import { ProjectContext } from './ProjectTag';

const tableInitState: TableDTO = {
  name: '',
  projectId: 0,
  bgId: 0,
};

export default function FormTable(props: { closeFn: () => void }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectBGId = useSelector(backgroundSelector).selectBGId;
  const listProjects = useSelector(projectSelector).listProjects;
  const listProjectsElement = listProjects.map((project) => (
    <option key={project.id} value={project.id}>
      {project.name}
    </option>
  ));

  const userLocal = localStorage.getItem('userLogin');
  const currentUser: User | null = userLocal ? JSON.parse(userLocal) : null;

  // get table just added
  const tableJustAdded = useSelector(tableSelector).latestTable;

  // Xử lí form
  const [inputValue, setInputValue] = useState<TableDTO>(tableInitState);
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    let name = e.target.name;
    let value = e.target.value;
    setInputValue({ ...inputValue, [name]: value });
    if (name === 'projectId') {
      setInputValue({ ...inputValue, projectId: +value });
    }
  };
  useEffect(() => {
    selectBGId && setInputValue({ ...inputValue, bgId: selectBGId });
  }, [selectBGId]);

  const createAdminMember = () => {
    if (!tableJustAdded) return;
    if (!currentUser) return;
    if (tableJustAdded && projectId === tableJustAdded.projectId) {
      let admin: MemberForm = {
        tableId: tableJustAdded.id,
        userId: currentUser.id,
        role: Roles.ADMIN,
      };
      dispatch(createMember(admin));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(createTable(inputValue));
    setLoadingButton(true);
    setTimeout(() => {
      setLoadingButton(false);
      setInputValue(tableInitState);
      props.closeFn();
    }, 2000);
  };

  useEffect(() => {
    if (tableJustAdded) {
      createAdminMember();
      // Navigate đến trang table
      setTimeout(() => {
        navigate(`/main-app/project/${projectId}/table/${tableJustAdded.id}/`);
      }, 3000);
      dispatch(resetTableJustAdded());
    }
  }, [tableJustAdded]);

  // loading button
  const [loadingButton, setLoadingButton] = useState<boolean>(false);

  // validate button
  const activeButton = () => {
    if (inputValue.name.trim() !== '' && inputValue.projectId !== 0) {
      return true;
    }
    return false;
  };

  // set default value project
  const projectId: number = useContext(ProjectContext).id;

  useEffect(() => {
    if (projectId) {
      setInputValue({ ...inputValue, projectId: projectId });
    }
  }, [projectId]);

  return (
    <div
      className={`w-[304px] absolute z-[999] transition-all ease-in-out duration-200 rounded-[8px] min-h-fit bg-[#282E33] h-[390px] top-1/2 left-full`}
    >
      <div>
        <button
          onClick={() => props.closeFn()}
          className="absolute z-10 top-1 right-1 text-[#B6C2CF] py-1 px-2"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="text-sm font-bold text-[#B6C2CF]">
          <h2 className="h-10 text-center leading-10">Tạo bảng</h2>
        </div>
      </div>
      <div className="h-[340px] scrollable-div overflow-y-scroll justify-start flex flex-col p-3">
        <div className="h-full flex  justify-center pb-2">
          <div className="bg-[url(https://images.unsplash.com/photo-1688934728322-597cbe61ef57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNjg5MDA2MTU2fA&ixlib=rb-4.0.3&q=80&w=400)] w-[200px] h-[120px] bg-center bg-cover rounded-[3px] flex items-center justify-center shadow-lg">
            <div className="bg-[url(https://trello.com/assets/14cda5dc635d1f13bc48.svg)] bg-no-repeat bg-center w-full h-full"></div>
          </div>
        </div>
        <form className="">
          <div className="">
            <label className="block mb-1 mt-3 font-bold text-[12px] text-[#B6C2CF]">
              Phông nền
            </label>
            {/* List Backgrounds */}
            <ListBackgrounds />
            {/* List Backgrounds */}
          </div>
          <div className="">
            <label className="block mb-1 mt-3 font-bold text-[12px] text-[#B6C2CF]">
              Tiêu đề bảng <span className="text-red-600">*</span>
            </label>
            <input
              onChange={handleChange}
              name="name"
              value={inputValue.name}
              className="mt-[2px] border-[2px] border-[#A6C5E229] bg-[#22272B] text-[#B6C2CF] outline-[#EF5C48] text-sm leading-5 w-full py-1 px-2 rounded-[3px]"
              type="text"
            />
          </div>
          <div className="">
            <label className="block mb-1 mt-3 font-bold text-[12px] text-[#B6C2CF]">
              Không gian làm việc <span className="text-red-600">*</span>
            </label>
            <select
              onChange={handleChange}
              name="projectId"
              value={inputValue.projectId}
              className="mt-[2px] border-[2px] border-[#A6C5E229] bg-[#22272B] text-[#B6C2CF] outline-[#EF5C48] text-sm leading-5 w-full py-1 px-2 rounded-[3px]"
            >
              <option value={0}>Chọn...</option>
              {listProjectsElement}
            </select>
          </div>
          <div>
            <button
              disabled={!activeButton()}
              onClick={handleSubmit}
              className={`
              ${
                activeButton()
                  ? 'bg-[#579DFF] text-[#1D2125]'
                  : 'text-[#BFDBF847] bg-[#BCD6F00A] cursor-not-allowed'
              }
              w-full font-normal mb-2 mt-4 text-sm leading-5 rounded-[3px] py-[6px] px-3 bg-[#579DFF]`}
            >
              {loadingButton ? (
                <span className="inline-flex items-center justify-center w-full h-full">
                  <Spinner />
                  <span className="text-[#fff]">Loading...</span>
                </span>
              ) : (
                <span>Tiếp tục</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
