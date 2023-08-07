import React, { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { notifySelector, tableSelector } from '../redux/selectors';
import * as notifySlice from '../redux/reducers/notifySlice';
import { Notify } from '../types/Notify.type';
import { getNotifications } from '../utils/getNotification';

export default function Main() {
  const notifyEntity = useSelector(notifySelector).notify;
  const navigate = useNavigate();

  const userLocal = localStorage.getItem('userLogin');
  const currentUser = userLocal ? JSON.parse(userLocal) : null;
  const location = useLocation();

  useEffect(() => {
    if (!currentUser) {
      if (location.pathname.match('/main-app/*')) {
        navigate('/not-found');
      }
    }
  }, [currentUser]);

  // Init toast

  // get table just added
  const dispatch = useDispatch();
  const tableJustAdded = useSelector(tableSelector).latestTable;

  useEffect(() => {
    if (tableJustAdded) {
      let notify: Notify = {
        type: 'success',
        message: 'Create table successfully!',
      };
      setTimeout(() => {
        dispatch(notifySlice.notify(notify));
        getNotifications(notifyEntity);
      }, 2000);
      setTimeout(() => {
        dispatch(notifySlice.notify(null));
      }, 3000);
    }
  }, [tableJustAdded]);

  // useEffect(() => {
  //   if (!notifyEntity) return;
  //   getNotifications();
  // }, [notifyEntity]);

  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
}
