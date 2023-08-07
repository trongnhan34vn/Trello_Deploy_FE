import React from 'react';
import CreateFeatureBtn from '../CreateFeatureBtn';

export interface ModalFeatureProps {
  name: string;
  code: string;
  icon: string;
}

export const listFeatures: ModalFeatureProps[] = [
  {
    code: 'TV',
    name: 'Thành viên',
    icon: 'fa-regular fa-user',
  },
  {
    code: 'Label',
    name: 'Nhãn',
    icon: 'fa-solid fa-tag',
  },
  {
    code: 'VCL',
    name: 'Việc cần làm',
    icon: 'fa-solid fa-check-to-slot',
  },
  {
    code: 'N',
    name: 'Ngày',
    icon: 'fa-regular fa-clock',
  },
];

export default function ModalFeature() {
  const listFeaturesElement = listFeatures.map((feature, index) => {
    return <CreateFeatureBtn key={index} feature={feature} />;
  });
  return (
    <div className="fixed mb-4">
      <h3 className="font-semibold w-full min-w-[170px] mb-2 text-[12px] text-[#9FADBC] ">
        Thêm vào thẻ
      </h3>
      <div className="flex flex-col">
        {/* Item */}
        {/* <button className="hover:bg-[#A6C5E229] bg-[#A1BDD914] rounded-[3px] h-8 mb-2 max-w-[300px] overflow-hidden py-[6px] px-3 relative text-left text-sm text-[#9FADBC] ">
          <i className="fa-regular fa-user mr-[6px]"></i>
          <p className=" inline-block ">Thành viên</p>
        </button> */}
        {listFeaturesElement}
        {/* Item */}
      </div>
    </div>
  );
}
