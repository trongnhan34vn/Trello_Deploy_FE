import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoadingContext } from '../../../../layouts/MainLayout.tsx/MainLayout';
import { backgroundSelector } from '../../../../redux/selectors';
import { Table } from '../../../../types/Table.type';
import { Project } from '../../../../types/Project.type';
import { getMemberTable } from '../../../../redux/reducers/tableSlice';

interface TableProps {
  table: Table;
  project: Project;
  type: string;
}

export default function TableComp({ type, table, project }: TableProps) {
  const location = useLocation()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loadingContext = useContext(LoadingContext);
  const backgrounds = useSelector(backgroundSelector).listBGs;
  const getBGUrl = () => {
    let bgId = table.bgId;
    let bg = backgrounds.find((bg) => bg.id === bgId);
    if (!bg) return;
    return bg.bgUrl;
  };

  const handleClick = () => {
    if (!loadingContext) return;
    loadingContext.setActive();
    setTimeout(() => {
      navigate(`/main-app/project/${project.id}/table/${table.id}/`, {state: type});
      loadingContext.setInActive();
    }, 3000);
  };

  return (
    <li
      onClick={handleClick}
      className="mb-[2%] mr-[2%] relative cursor-pointer list-none"
    >
      <div
        style={{ backgroundImage: `url("${getBGUrl()}")` }}
        className="hover:bg-[#A6C5E229] bg-cover bg-center opacity-80 hover:opacity-100 transition-all ease-in-out duration-150 rounded-[3px]  font-normal bg-[#A1BDD914] h-[96px] text-left  align-top p-2 bg-no-repeat table-cell w-[200px]"
      >
        <p className="text-[#fff] font-extrabold text-[16px]">{table.name}</p>
      </div>
    </li>
  );
}
