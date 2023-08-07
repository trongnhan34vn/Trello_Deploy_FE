import { RootState } from './store';

export const userSelector = (state: RootState) => state.user;
export const typeProjectSelector = (state: RootState) => state.type;
export const projectSelector = (state: RootState) => state.project;
export const backgroundSelector = (state: RootState) => state.background;
export const tableSelector = (state: RootState) => state.table;
export const listSelector = (state: RootState) => state.list;
export const cardSelector = (state: RootState) => state.card;
export const modalSelector = (state: RootState) => state.modal;
export const workSelector = (state: RootState) => state.work;
export const taskSelector = (state: RootState) => state.task;
export const memberSelector = (state: RootState) => state.member;
export const notifySelector = (state: RootState) => state.notify;
export const memberCardSelector = (state: RootState) => state.memberCard;
export const labelSelector = (state: RootState) => state.label;
export const cardLabelSelector = (state: RootState) => state.cardLabel;
