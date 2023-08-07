import React, { Fragment, useContext, useEffect, useState } from 'react';
import ShareModal from '../Modal/ShareModal/ShareModal';
import { SubnavContext } from '../DetailProject/DetailProject';
import MemberImages from './MemberImages';
import FilterComp from './FilterComp';
import ViewTypeComp from './ViewTypeComp';
import { useParams } from 'react-router-dom';

export default function SubNav() {
  const [shareModal, setShareModal] = useState<boolean>(false);
  const subNavContext = useContext(SubnavContext);
  

  const returnTableName = () => {
    if (!subNavContext) return;
    if (!subNavContext.selectTable) return;
    return subNavContext.selectTable.name;
  };
  const {tableId} = useParams()
  const users = subNavContext ? subNavContext.users : [];
  const members = subNavContext ? subNavContext.members : [];
  const membersFilter = tableId ? members.filter(member => member.tableId === +tableId) : [];

  const membersElement = membersFilter.map((member) => {
    const userFilter = users.filter(user => user.id === member.userId);
    return <MemberImages users={userFilter} key={member.id} member={member} />;
  });

  return (
    <div className="bg-[#0000003d] w-full z-50">
      <div className="flex-nowrap justify-between h-auto relative inline-flex flex-row gap-1 w-[calc(100%_-_23px)] items-center py-3 pr-[10px] pl-[16px] ">
        <div className="flex items-center">
          <h2 className="flex-nowrap font-bold text-lg px-[10px] text-[#fff] cursor-default relative flex items-start h-8 max-w-full">
            {returnTableName()}
          </h2>
          <ViewTypeComp />
        </div>

        <div className="flex items-center relative">
          <FilterComp />
          {/* List member (img) */}
          <div className={`mr-2 flex relative `}>{membersElement}</div>
          <button
            onClick={() => setShareModal(true)}
            className="hover:opacity-80 transition-all duration-200 ease-in bg-[#091e42e3] max-w-[400px] h-8 rounded-[3px] py-[6px] px-[12px] flex items-center text-[#fff]"
          >
            <i className="text-[12px] fa-solid fa-user-plus mr-1"></i>
            <span className="text-[14px]">Chia sẻ</span>
          </button>
        </div>
      </div>
      <ShareModal
        shareModal={shareModal}
        onClose={() => setShareModal(false)}
      />
    </div>
  );
}
