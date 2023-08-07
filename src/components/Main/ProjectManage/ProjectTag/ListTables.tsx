import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tableSelector } from '../../../../redux/selectors';
import { Member } from '../../../../types/Member.type';
import CreateTableBtn from './CreateTableBtn';
import { ProjectContext } from './ProjectTag';
import Table from './Table';
import * as type from '../../../../types/Table.type';

interface ListTablesProps {
  type: string;
  tableFilter: type.Table[];
}

export default function ListTables({ tableFilter, type }: ListTablesProps) {
  const tables = useSelector(tableSelector).listTable;
  const project = useContext(ProjectContext);

  const tableFilterMember = tableFilter.filter(
    (table) => table.projectId === project.id
  );

  const tableFiltersUser = tables.filter(
    (table) => table.projectId === project.id
  );

  const tableResult = type === 'user' ? tableFiltersUser : tableFilterMember;

  const tableElement = tableResult.map((table) => {
    return <Table type={type} project={project} key={table.id} table={table} />;
  });

  return (
    <ul className="flex flex-wrap justify-starts w-[900px]">
      {tableElement}
      {type === 'user' ? <CreateTableBtn /> : <></>}
    </ul>
  );
}
