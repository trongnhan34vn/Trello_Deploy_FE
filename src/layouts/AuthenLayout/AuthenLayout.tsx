import React, { createContext, useCallback, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Background from '../../components/Login_Register/Background';
import Logo from '../../components/Login_Register/Logo';
import LoadingOverlay from 'react-loading-overlay-ts';
import { useSelector } from 'react-redux';
import { notifySelector, userSelector } from '../../redux/selectors';
import { User } from '../../types/User.type';
import toast, { Toaster } from 'react-hot-toast';

interface LoadingContext {
  setActive: () => void;
  setInActive: () => void;
}

export const LoadingContext = createContext<LoadingContext | null>(null);

export default function AuthenLayout() {
  const [isActive, setActive] = useState<boolean>(false);
  const userLogin: User | null = useSelector(userSelector).loginResponse.user;

  useEffect(() => {
    if (userLogin) {
      localStorage.setItem('userLogin', JSON.stringify(userLogin));
    }
  }, [userLogin]);

  const notifyEntity = useSelector(notifySelector).notify;

  const getNotifications = () => {
    if (!notifyEntity) return;

    if (notifyEntity.type === 'success') {
      return toast.success(notifyEntity.message, {
        icon: '👏',
        style: {
          borderRadius: '10px',
          background: '#282E33',
          color: '#fff',
          textAlign: 'center',
        },
      });
    }
    return toast.error(notifyEntity.message, {
      // icon: '👏',
      style: {
        borderRadius: '10px',
        background: '#fff',
        color: '#000',
        textAlign: 'center',
      },
    });
  };

  useEffect(() => {
    if (!notifyEntity) return;
    setTimeout(() => {
      getNotifications();
    }, 1000);
  }, [notifyEntity]);

  return (
    <LoadingOverlay
      className="fixed h-screen inset-0 flex items-center justify-center"
      active={isActive}
      spinner
      text="Loading..."
    >
      <div>
        <LoadingContext.Provider
          value={{
            setActive: () => setActive(true),
            setInActive: () => setActive(false),
          }}
        >
          <Logo />
          <Outlet />
          <Background />
          <Toaster />
        </LoadingContext.Provider>
      </div>
    </LoadingOverlay>
  );
}
