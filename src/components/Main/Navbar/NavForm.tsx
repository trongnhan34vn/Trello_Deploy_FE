import React from 'react';
import { User } from '../../../types/User.type';

interface NavFormProps {
  signOut: () => void;
  state: any;
  userLogin: User | undefined;
}

const NavForm = ({ state, signOut, userLogin }: NavFormProps) => {
  return (
    <div
      className={`${
        state ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
      } transition-all text-[#B6C2CF] z-[999] ease-in-out duration-75 absolute right-0 mt-2 w-[250px] origin-top-right rounded-md bg-[#282E33] py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="user-menu-button"
      tabIndex={-1}
    >
      {/* Active: "bg-gray-100", Not Active: "" */}
      <div className='border-b-[1px] border-b-[#3C474F]'>
        <h2 className="text-[#8C9BAB] uppercase text-[11px] leading-[16px] font-extrabold mt-4 mb-2 px-5">
          Tài khoản
        </h2>
        <div className='px-5 py-2 flex items-center'>
          <img className='h-10 w-10 rounded-[50%] mr-2 ' src={userLogin ? userLogin.imageUrl : ''} alt="" />
          <div className='overflow-hidden'>
            <h1 className='text-[14px]'>{userLogin?.fullName}</h1>
            <p className='text-[12px]'>{userLogin?.email}</p>
          </div>
        </div>
      </div>
      <div>
        <a
          href="#"
          className="block hover:bg-[#A1BDD914] transition-all ease-in duration-150 px-4 py-2 text-sm text-g"
          role="menuitem"
          tabIndex={-1}
          id="user-menu-item-0"
        >
          Your Profile
        </a>
        <a
          href="#"
          className="block hover:bg-[#A1BDD914] transition-all ease-in duration-150 px-4 py-2 text-sm"
          role="menuitem"
          tabIndex={-1}
          id="user-menu-item-1"
        >
          Settings
        </a>
        <button
          onClick={signOut}
          className="block px-4 py-2 hover:bg-[#A1BDD914] transition-all ease-in duration-150 w-full text-left text-sm"
          role="menuitem"
          tabIndex={-1}
          id="user-menu-item-2"
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default NavForm;
