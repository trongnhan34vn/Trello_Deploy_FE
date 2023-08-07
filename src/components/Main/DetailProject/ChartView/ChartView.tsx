import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { findAllCards } from '../../../../redux/reducers/cardSlice';
import { findAllList } from '../../../../redux/reducers/listSlice';
import {
  findAll,
  findTableByProjectId,
} from '../../../../redux/reducers/tableSlice';
import {
  cardSelector,
  listSelector,
  tableSelector,
} from '../../../../redux/selectors';
import { Table } from '../../../../types/Table.type';

import PieChart from './PieChart';
import SubNavChartView from './SubNavChartView';
import BarChart from './BarChart';

const ChartView = () => {
  const { tableId, projectId } = useParams();
  const dispatch = useDispatch();

  const lists = useSelector(listSelector).lists;
  const cards = useSelector(cardSelector).listCards;
  const tables = useSelector(tableSelector).listTable;

  useEffect(() => {
    if (!projectId) return;
    dispatch(findAllList());
    dispatch(findAllCards());
    dispatch(findAll());
  }, [projectId]);

  const [selectTable, setSelectTable] = useState<Table | null>(null);

  const listFilterTable = selectTable
    ? lists.filter((list) => list.tableId === selectTable.id)
    : [];

  useEffect(() => {
    if (!tableId) return;
    const defaultTable = tables.find((t) => t.id === +tableId);
    if (!defaultTable) return;
    setSelectTable(defaultTable);
  }, [tableId]);

  const countCardInList = (listId: number) => {
    let cardFilter = cards.filter((card) => card.listId === listId);
    return cardFilter.length;
  };

  const tablesFilter = projectId ? tables.filter((t) => t.projectId === +projectId):[];

  return (
    <div className="pl-[260px] w-full">
      <SubNavChartView
        setSelectTable={setSelectTable}
        tables={tablesFilter}
        selectTable={selectTable}
      />
      {listFilterTable.length === 0 ? (
        <>
          <div className="w-full h-full flex items-center justify-center">
            <h1 className="text-[40px] text-[#a3a3a3]">CHƯA CÓ DỮ LIỆU</h1>
          </div>
        </>
      ) : (
        <div className='h-full flex items-center gap-5'>
          <div className="w-[500px] h-[500px]">
            <PieChart
              countCardInList={countCardInList}
              listFilterTable={listFilterTable}
            />
          </div>
          <div className="min-w-[500px] flex items-center gap-5 h-[500px]">
           <BarChart />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartView;
