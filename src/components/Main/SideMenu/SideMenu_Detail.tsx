import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  backgroundSelector,
  memberSelector,
  projectSelector,
  tableSelector,
} from '../../../redux/selectors';
import { Link, NavLink, useLocation, useParams } from 'react-router-dom';
import * as tableSlice from '../../../redux/reducers/tableSlice';
import * as backgroundSlice from '../../../redux/reducers/backgroundSlice';
import { Table } from '../../../types/Table.type';

export default function SideMenu_Detail() {
  const dispatch = useDispatch();
  const selectProject = useSelector(projectSelector).selectProject;
  const { projectId, tableId } = useParams();
  const [active, setActive] = useState('');
  const location = useLocation();

  const isDetail = location.pathname.match(
    `/main-app/project/${projectId}/table/${tableId}/*`
  )
    ? true
    : false;
  
  useEffect(() => {
    if (!tableId) return;
    if (location.state === 'member') {
      dispatch(tableSlice.findById(+tableId));
    }
  }, [location]);

  const selectTable = useSelector(tableSelector).selectTable;

  const [memberTables, setMemberTables] = useState<Table[]>([]);

  useEffect(() => {
    let arr = [];
    if (isDetail) {
      if (location.state === 'member' && selectTable) {
        arr.push(selectTable);
        setMemberTables(arr);
      }
    }
  }, [selectTable]);

  const tables = useSelector(tableSelector).tablesByProjectId;
  const backgrounds = useSelector(backgroundSelector).listBGs;

  const tablesResult = location.state === 'member' ? memberTables : tables;
  useEffect(() => {
    if (!projectId) return;
    dispatch(tableSlice.findTableByProjectId(+projectId));
    dispatch(backgroundSlice.findAllBGs());
  }, [projectId]);

  const getBG = (bgId: number) => {
    let bg = backgrounds.find((bg) => bgId === bg.id);
    if (!bg) return;
    return bg.bgUrl;
  };

  const tableElement = tablesResult.map((table) => {
    return (
      <NavLink
        state={location.state}
        onClick={() => setActive('table-' + table.id)}
        key={table.id}
        to={`/main-app/project/${table.projectId}/table/${table.id}/`}
        className={`${
          active === 'table-' + table.id ? 'bg-[#464247]' : ''
        } flex text-[14px] text-[#9FADBC] transition-all ease-in-out duration-150 hover:bg-[#464247] items-center pl-4 h-8`}
      >
        <img
          src={table.bgId ? getBG(table.bgId) : ''}
          alt="ảnh"
          className="w-6 h-5 cover rounded-[3px] flex items-center justify-center "
        />
        <p className="ml-2 overflow-hidden text-ellipsis whitespace-nowrap">
          {table.name}
        </p>
      </NavLink>
    );
  });

  return (
    <div className="w-[260px] block bg-[hsla(206,13.7%,10%,0.9)] absolute h-[calc(100vh_-_64px)] left-0 top-0 z-10">
      <div className="flex items-center min-h-10 py-[8px] px-[12px] border-b-[1px] border-b-[hsla(211,18%,68%,0.16)]">
        <div className="w-8 h-8 flex items-center justify-center rounded-[3px] overflow-hidden ">
          <div className="bg-[#F87462] flex w-full h-full text-xl text-[#000] font-bold items-center justify-center">
            K
          </div>
        </div>
        <div className="flex-1 ml-2 mr-1 text-left">
          <span className="text-[#9FADBC] leading-5 text-sm font-semibold text-ellipsis overflow-hidden whitespace-pre-wrap">
            {selectProject ? selectProject.name : ''}
          </span>
          <p className="text-[#9FADBC] text-xs">Miễn phí</p>
        </div>
        <button className="flex items-center justify-center rounded-[3px] cursor-pointer p-[2px]">
          <i className="text-[#fff] font-bold fa-solid fa-angle-left"></i>
        </button>
      </div>
      <div className="text-sm font-semibold leading-5">
        <div className="pt-3">
          <a
            href="#"
            className="flex text-[#9FADBC] transition-all ease-in-out duration-150 hover:bg-[#464247] items-center pl-4 h-8"
          >
            <i className="fa-solid fa-table"></i>
            <p className="ml-3 overflow-hidden text-ellipsis whitespace-nowrap">
              Bảng
            </p>
          </a>
          <a
            href="#"
            className="flex justify-between mb-2 text-[#9FADBC] transition-all ease-in-out duration-150 hover:bg-[#464247] items-center pl-4 h-8"
          >
            <div className="flex items-center">
              <i className="fa-regular fa-user"></i>
              <p className="ml-3 overflow-hidden text-ellipsis whitespace-nowrap">
                Thành viên
              </p>
            </div>
            <button className="p-1 mx-[6px]">
              <i className="fa-solid fa-plus"></i>
            </button>
          </a>
        </div>
      </div>
      <div className="mt-[6px]">
        <div className="flex items-center py-4 pl-3">
          <h2 className="font-bold text-[14px] text-[#9FADBC]">
            Dạng xem không gian làm việc
          </h2>
        </div>
        <ul className="py-[2px]">
          <NavLink
            onClick={() => setActive('table-view')}
            to={{
              pathname: `/main-app/project/${projectId}/table/${tableId}/table-view`,
            }}
            state={location.state}
            className={`${
              active === 'table-view' ? 'bg-[#464247]' : ''
            } flex text-[14px] font-semibold text-[#9FADBC] transition-all ease-in-out duration-150 hover:bg-[#464247] items-center pl-4 h-8`}
          >
            <i className="fa-solid fa-table"></i>
            <p className="ml-3 italic overflow-hidden text-ellipsis whitespace-nowrap">
              Bảng
            </p>
          </NavLink>
          <Link
            state={location.state}
            onClick={() => setActive('chart-view')}
            to={`/main-app/project/${projectId}/table/${tableId}/chart-view`}
            className={`${
              active === 'chart-view' ? 'bg-[#464247]' : ''
            } flex text-[14px] font-semibold text-[#9FADBC] transition-all ease-in-out duration-150 hover:bg-[#464247] items-center pl-4 h-8`}
          >
            <i className="fa-regular w-[14px] fa-calendar-days"></i>
            <p className="ml-3 italic overflow-hidden text-ellipsis whitespace-nowrap">
              Thống kê
            </p>
          </Link>
        </ul>
      </div>
      <div className="mt-[6px]">
        <div className="flex items-center text-sm text-[#9FADBC] justify-between py-1 pl-3">
          <h2 className="text font-bold ">Các bảng của bạn</h2>
          <div className="flex pr-[2px]">
            <button className="p-1 mx-[6px]">
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
        <ul className="py-[2px]">{tableElement}</ul>
      </div>
    </div>
  );
}
