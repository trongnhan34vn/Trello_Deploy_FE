import React, { useState } from 'react';
import LoadingOverlay from 'react-loading-overlay-ts';
import { Outlet, useLocation } from 'react-router-dom';
import { createContext } from 'react';
import Navbar from '../../components/Main/Navbar/Navbar';
import SideMenu from '../../components/Main/SideMenu/SideMenu';
import SideMenu_Detail from '../../components/Main/SideMenu/SideMenu_Detail';

interface LoadingProps {
  isActive: boolean;
  setActive: () => void;
  setInActive: () => void;
}

export const LoadingContext = createContext<LoadingProps | null>(null);

export default function MainLayout() {
  const location = useLocation();
  const isMainApp: boolean =
    location.pathname === '/main-app/project-manage' ||
    location.pathname === '/main-app';

  const [toggleProfleDropdown, setToggleProfileDropdown] =
    useState<boolean>(false);

  const handleToggleProfileDropdown = () => {
    setToggleProfileDropdown((pre) => !pre);
  };

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const sideMenuElement = isMainApp ? (
    <SideMenu isOpen={isOpen} openModal={openModal} closeModal={closeModal} />
  ) : (
    <SideMenu_Detail />
  );

  const isDetail = location.pathname.match('/main-app/project/*');

  const [isActive, setActive] = useState<boolean>(false);
  const setActiveLoading = () => {
    setActive(true)
  }

  const setInActive = () => {
    setActive(false)
  }
  return (
    <LoadingOverlay active={isActive} spinner text="Loading...">
      <div className="bg-[#1D2125] h-[calc(100vh)] w-full">
        <Navbar
          openModal={openModal}
          isOpen={isOpen}
          toggleFn={handleToggleProfileDropdown}
          state={toggleProfleDropdown}
        />
        <div
          onClick={() => {
            setToggleProfileDropdown(false);
          }}
          className={`${!isMainApp ? '' : 'mx-auto w-[1150px]'}`}
        >
          <div
            className={`${
              !isMainApp ? 'overflow-hidden' : 'overflow-y-scroll overflow-x-visible'
            } sticky-container fixed scrollable-div h-[calc(100vh_-_64px)] w-full flex justify-center items-start`}
          >
            <div className="w-full flex">
              {sideMenuElement}
              <LoadingContext.Provider
                value={{ isActive: isActive, setActive: setActiveLoading, setInActive }}
              >
                <Outlet />
              </LoadingContext.Provider>
            </div>
          </div>
        </div>
      </div>
    </LoadingOverlay>
  );
}
