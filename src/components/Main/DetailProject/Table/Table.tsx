import React, { useContext } from 'react';
import Head from '../TableView/Head';
import { SubnavContext } from '../DetailProject';
import Item from './Item';

const TableComp = () => {
  const subNavContext = useContext(SubnavContext);

  const selectTable = subNavContext ? subNavContext.selectTable : null;
  const lists = subNavContext ? subNavContext.lists : [];

  const listsFiltered = selectTable
    ? lists.filter((list) => list.tableId === selectTable.id)
    : [];

  const listElement = listsFiltered.map((list) => {
    return <Item key={list.id} list={list} />;
  });

  return (
    <div className="bang mt-3 mx-3 rounded-[8px] h-[calc(100%_-_84px)] bg-[#1D2125]">
      <Head />
      <div className="content">{listElement}</div>
    </div>
  );
};

export default TableComp;
