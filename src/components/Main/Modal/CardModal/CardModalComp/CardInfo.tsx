import { Popover, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateCardStatus } from '../../../../../redux/reducers/cardSlice';
import { CardDB, CardUpdateStatus } from '../../../../../types/Card.type';
import { FeatureContext } from '../CreateFeatureBtn';
import FormFeatureLayout from '../FormFeatureLayout';

interface CardInfoProps {
  selectCard: CardDB | null;
  checkListMembers: () => boolean;
}

const CardInfo = ({ selectCard, checkListMembers }: CardInfoProps) => {
  const dispatch = useDispatch();

  const feature = {
    code: 'N',
    name: 'Ngày',
    icon: 'fa-regular fa-clock',
  };

  const formatCreateDate = (timeStamp: number) => {
    let date = new Date(timeStamp);
    return date.getDate() + ' tháng ' + (+date.getMonth() + 1);
  };

  const handleChange = () => {
    if (!selectCard) return;
    dispatch(
      updateCardStatus({ id: selectCard.id, status: !selectCard.status })
    );
  };

  const formatEndDate = (timeStamp: number) => {
    let date = new Date(timeStamp);
    return (
      date.getDate() +
      ' tháng ' +
      (+date.getMonth() + 1) +
      ' lúc ' +
      (date.getHours() < 10 ? 0 : '') +
      date.getHours() +
      ':' +
      (date.getMinutes() < 10 ? 0 : '') +
      date.getMinutes()
    );
  };

  const getCardStatus = () => {
    if (!selectCard) return;
    return selectCard.status;
  };

  return (
    <div>
      <h3 className="text-[#9FADBC] text-left text-[12px] font-bold mb-2">
        Ngày
      </h3>
      <Popover className="relative">
        <input
          checked={getCardStatus()}
          onChange={handleChange}
          className="absolute top-1/2 translate-y-[-80%] left-[10px] z-50"
          type="checkbox"
        />
        <Popover.Button className="mb-2 min-w-1/2 outline-none ">
          <h3 className="bg-[#A1BDD914] pl-7 flex items-center text-left hover:bg-[#A6C5E229] rounded-[3px] text-[#B6C2CF] py-[6px] pr-4 text-[14px] font-normal ">
            <div className="mr-3">
              <span>
                {selectCard ? formatCreateDate(selectCard.createdAt) : ''}
              </span>
              <span> - </span>
              <span>{selectCard ? formatEndDate(selectCard.endAt) : ''}</span>
            </div>
            <span
              className={`${
                getCardStatus() ? 'px-1' : 'p-0 w-0 h-0'
              } bg-[#4BCE97] overflow-hidden transition-all ease-linear duration-300 text-[14px] rounded-[3px] text-[#1D2125]`}
            >
              Hoàn tất
            </span>
          </h3>
        </Popover.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Popover.Panel className="absolute top-full left-0 z-50">
            {({ close }) => {
              return (
                <FeatureContext.Provider
                  value={{ feature: feature, closeFn: close }}
                >
                  <FormFeatureLayout closeFn={close} />;
                </FeatureContext.Provider>
              );
            }}
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
};

export default CardInfo;
