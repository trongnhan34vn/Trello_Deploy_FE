import React, { useContext, useEffect, useState } from 'react';
import Head from './Head';
import Item from './Item';
import { TableViewContext } from './TableView';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as tableSlice from '../../../../redux/reducers/tableSlice';
import { tableSelector } from '../../../../redux/selectors';
import { Table } from '../../../../types/Table.type';

const BodyTable = () => {
  const tableViewContext = useContext(TableViewContext);
  const tables = tableViewContext ? tableViewContext.tables : [];
  const lists = tableViewContext ? tableViewContext.lists : [];

  const location = useLocation()
  const dispatch = useDispatch();
  const { projectId, tableId } = useParams();

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

  const getTable = useSelector(tableSelector).selectTable;

  const [memberTables, setMemberTables] = useState<Table[]>([]);

  useEffect(() => {
    let arr = [];
    if (isDetail) {
      if (location.state === 'member' && getTable) {
        arr.push(getTable);
        setMemberTables(arr);
      }
    }
  }, [getTable]);

  const tablesResult = location.state === 'member' ? memberTables : tables;

  const tableElement = tablesResult.map((table) => {
    const listsFiltered = lists.filter((list) => list.tableId === table.id);
    return listsFiltered.map((list) => {
      return <Item key={list.id} table={table} list={list} />;
    });
  });

  return (
    <div className="bang">
      <Head />
      <div className="content">{tableElement}</div>
    </div>
  );
};

export default BodyTable;
