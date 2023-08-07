import React from 'react';

export default function MainHome() {
  return (
    <div className="mt-10 pl-[45px] w-[420px]">
      <div className="flex bg-[#1D2125] flex-col mb-4 relative w-full overflow-hidden rounded-[4px] shadow-xl">
        <div className="bg-[url(https://trello.com/assets/e55b3540e5c1f06a51d7.svg)] w-full min-h-[100px] h-[108px] rounded-tl-[4px] rounded-tr-[4px] "></div>
        <div className='flex flex-col bg text-[#B6C2CF] p-4 flex-auto w-full'>
          <span className='text-center text-[16px] font-bold leading-6'>Theo dõi và cập nhật</span>
          <span className='my-[10px] text-[14px] leading-5 text-center'>Mời mọi người vào bảng và thẻ, để lại nhận xét, thêm ngày hết hạn và chúng tôi sẽ hiển thị hoạt động quan trọng nhất ở đây.</span>
        </div>
      </div>
    </div>
  );
}
