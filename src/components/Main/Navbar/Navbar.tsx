import React, { useEffect, useState } from 'react';
import { User } from '../../../types/User.type';
import { useNavigate } from 'react-router-dom';
import NavForm from './NavForm';

export default function Navbar(props: {
  openModal: () => void;
  isOpen: boolean;
  toggleFn: () => void;
  state: boolean;
}) {
  const navigate = useNavigate()
  const { toggleFn, state } = props;
  const handleToggleProfileDropdown = () => {
    toggleFn();
  };
  const [userLogin, setUserLogin] = useState<User>();

  const userLocalStore = localStorage.getItem('userLogin');

  useEffect(() => {
    if(userLocalStore) {
      setUserLogin(JSON.parse(userLocalStore))
    }
  },[userLocalStore])

  const signOut = () => {
    localStorage.removeItem('userLogin');
    navigate('/');
  }

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-[1400px] px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/*
      Icon when menu is closed.

      Menu open: "hidden", Menu closed: "block"
    */}
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              {/*
      Icon when menu is open.

      Menu open: "block", Menu closed: "hidden"
    */}
              <svg
                className="hidden h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:justify-start">
            <div onClick={()=>{navigate('/main-app/project-manage')}} className="flex w-[75px] h-4 flex-shrink-0 cursor-pointer items-center">
              <img
                className="block h-full w-full lg:hidden"
                src="https://trello.com/assets/87e1af770a49ce8e84e3.gif"
                alt="Your Company"
              />
              <img
                className="hidden h-full w-full lg:block"
                src="https://trello.com/assets/87e1af770a49ce8e84e3.gif"
                alt="Your Company"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                <a
                  href="#"
                  className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                  aria-current="page"
                >
                  Các Không gian làm việc
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Gần đây
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Đã đánh dấu sao
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Mẫu
                </a>
                <button
                  onClick={() => props.openModal()}
                  className="px-3 bg-[#579DFF] hover:bg-[#85B8FF] text-sm font-normal bg-[#579DFF text-[#000] rounded-[3px] leading-8 mr-1"
                >
                  Tạo mới
                </button>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="sr-only">View notifications</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>
            </button>
            {/* Profile dropdown */}
            <div className="relative ml-3">
              <div>
                <button
                  onClick={handleToggleProfileDropdown}
                  type="button"
                  className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src={userLogin?.imageUrl}
                    alt=""
                  />
                </button>
              </div>
              {/*
      Dropdown menu, show/hide based on menu state.

      Entering: "transition ease-out duration-100"
        From: "transform opacity-0 scale-95"
        To: "transform opacity-100 scale-100"
      Leaving: "transition ease-in duration-75"
        From: "transform opacity-100 scale-100"
        To: "transform opacity-0 scale-95"
    */}
             <NavForm userLogin={userLogin} state={state} signOut={signOut} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
