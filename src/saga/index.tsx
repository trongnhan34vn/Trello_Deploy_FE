import { all, takeLatest } from 'redux-saga/effects';
import * as projectSlice from '../redux/reducers/projectSlice';
import { findAllTypes } from '../redux/reducers/typeProjectSlice';
import * as userSlice from '../redux/reducers/userSlice';
import * as typeSaga from './items/typeSaga';
import * as userSaga from './items/userSaga';
import * as projectSaga from './items/projectSaga';
import { findAllBGs } from '../redux/reducers/backgroundSlice';
import * as backgroundSaga from './items/backgroundSaga';
import * as tableSlice from '../redux/reducers/tableSlice';
import * as tableSaga from './items/tableSaga';
import * as listSlice from '../redux/reducers/listSlice';
import * as listSaga from './items/listSaga';
import * as cardSlice from '../redux/reducers/cardSlice';
import * as cardSaga from './items/cardSaga';
import * as workSlice from '../redux/reducers/workSlice';
import * as workSaga from './items/workSaga';
import * as taskSlice from '../redux/reducers/taskSlice';
import * as taskSaga from './items/taskSaga';
import * as memberSlice from '../redux/reducers/memberSlice';
import * as memberSaga from './items/memberSaga';
import * as memberCardSaga from './items/memberCardSaga';
import * as memberCardSlice from '../redux/reducers/memberCardSlice';
import * as labelSaga from './items/labelSaga';
import * as labelSlice from '../redux/reducers/labelSlice';
import * as cardLabelSlice from '../redux/reducers/cardLabelSlice';
import * as cardLabelSaga from './items/cardLabelSaga';

export const rootSaga = function* () {
  yield all([
    // USER
    takeLatest(userSlice.register.type, userSaga.register),
    takeLatest(userSlice.login.type, userSaga.login),
    takeLatest(userSlice.searchByEmail.type, userSaga.searchByEmail),
    takeLatest(userSlice.findById.type, userSaga.findById),
    takeLatest(userSlice.findAll.type, userSaga.findAll),
    // TYPES
    takeLatest(findAllTypes.type, typeSaga.findAllTypeProjects),
    // PROJECTS
    takeLatest(projectSlice.createProject.type, projectSaga.createProject),
    takeLatest(
      projectSlice.findProjectsByUserId.type,
      projectSaga.findProjectsByUserId
    ),
    takeLatest(projectSlice.findById.type, projectSaga.findById),
    takeLatest(projectSlice.findAll.type, projectSaga.findAll),
    // BACKGROUNDS
    takeLatest(findAllBGs.type, backgroundSaga.findAllBackgrounds),
    // TABLES
    takeLatest(tableSlice.createTable.type, tableSaga.createTable),
    takeLatest(
      tableSlice.findTableByProjectId.type,
      tableSaga.findTableByProjectId
    ),
    takeLatest(tableSlice.findAll.type, tableSaga.findAll),
    takeLatest(tableSlice.findById.type, tableSaga.findById),
    // LISTS
    takeLatest(listSlice.findListsByTableId.type, listSaga.findListsByTableId),
    takeLatest(listSlice.updateDragList.type, listSaga.updateDragList),
    takeLatest(listSlice.createList.type, listSaga.createList),
    takeLatest(listSlice.findListById.type, listSaga.findListById),
    takeLatest(listSlice.findAllList.type, listSaga.findAllLists),
    // CARDS
    takeLatest(cardSlice.findAllCards.type, cardSaga.findAllCards),
    takeLatest(cardSlice.createCard.type, cardSaga.createCard),
    takeLatest(cardSlice.deleteCard.type, cardSaga.deleteCard),
    takeLatest(cardSlice.updateCard.type, cardSaga.updateCard),
    takeLatest(cardSlice.updateCardTest.type, cardSaga.updateCardTest),
    takeLatest(cardSlice.findCardById.type, cardSaga.findCardById),
    takeLatest(
      cardSlice.updateCardDescription.type,
      cardSaga.updateCardDescription
    ),
    takeLatest(cardSlice.updateCardName.type, cardSaga.updateCardName),
    takeLatest(cardSlice.updateCardDate.type, cardSaga.updateCardDate),
    takeLatest(cardSlice.updateCardStatus.type, cardSaga.updateCardStatus),
    takeLatest(cardSlice.searchCardByName.type, cardSaga.searchCardByName),
    // WORKS
    takeLatest(workSlice.createWork.type, workSaga.createWork),
    takeLatest(workSlice.findWorksByCardId.type, workSaga.findWorksByCardId),
    takeLatest(workSlice.deleteWork.type, workSaga.deleteWork),
    // TASKS
    takeLatest(taskSlice.createTask.type, taskSaga.createTask),
    takeLatest(taskSlice.findAll.type, taskSaga.findAll),
    takeLatest(taskSlice.changeStatus.type, taskSaga.changeStatus),
    takeLatest(taskSlice.updateMember.type, taskSaga.updateMember),
    takeLatest(taskSlice.remove.type, taskSaga.remove),
    // MEMBERS
    takeLatest(memberSlice.createMember.type, memberSaga.createMember),
    takeLatest(memberSlice.findByTableId.type, memberSaga.findByTableId),
    takeLatest(memberSlice.updateRole.type, memberSaga.updateRole),
    takeLatest(memberSlice.updateTask.type, memberSaga.updateTask),
    takeLatest(memberSlice.findAll.type, memberSaga.findAll),
    takeLatest(memberSlice.findByUserId.type, memberSaga.findByUserId),
    // MEMBER_CARD
    takeLatest(memberCardSlice.create.type, memberCardSaga.create),
    takeLatest(memberCardSlice.deleteMC.type, memberCardSaga.deleteMC),
    takeLatest(memberCardSlice.findAll.type, memberCardSaga.findAll),
    // LABEL
    takeLatest(labelSlice.findAll.type, labelSaga.findAll),
    takeLatest(labelSlice.searchByName.type, labelSaga.searchByName),
    takeLatest(labelSlice.create.type, labelSaga.create),
    takeLatest(labelSlice.update.type, labelSaga.update),
    takeLatest(labelSlice.remove.type, labelSaga.remove),
    // CARD_LABEL
    takeLatest(cardLabelSlice.create.type, cardLabelSaga.create),
    takeLatest(cardLabelSlice.findAll.type, cardLabelSaga.findAll),
    takeLatest(cardLabelSlice.remove.type, cardLabelSaga.remove),

  ]);
};
