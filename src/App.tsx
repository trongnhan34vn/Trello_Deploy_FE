import React from 'react';
import logo from './logo.svg';
import './App.css';
import './assets/css/header.css';
import Home from './pages/Home';
import Login from './pages/Login';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Main from './pages/Main';
import AuthenLayout from './layouts/AuthenLayout/AuthenLayout';
import MainLayout from './layouts/MainLayout.tsx/MainLayout';
import ProjectManage from './components/Main/ProjectManage/ProjectManage';
import DetailProject from './components/Main/DetailProject/DetailProject';
import MainHome from './components/Main/Home/MainHome';
import LoadingOverlayComp from './components/LoadingOverlay/LoadingOverlayComp';
import EmailCheck from './components/Login_Register/EmailCheck';
import { TableView } from './components/Main/DetailProject/TableView/TableView';
import ChartView from './components/Main/DetailProject/ChartView/ChartView';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/test" element={<LoadingOverlayComp />} />

        {/* Home */}
        <Route path="/" element={<Home />} />
        {/* Home */}

        {/* Main Layout */}
        <Route element={<MainLayout />}>
          <Route path="/main-app" element={<Main />}>
            <Route index element={<MainHome />} />
            <Route path="project-manage" element={<ProjectManage />} />
            <Route path="project/:projectId/table/:tableId/table-view" element={<TableView />}/>
            <Route path="project/:projectId/table/:tableId/chart-view" element={<ChartView />}/>
            <Route path="project/:projectId/table/:tableId" element={<DetailProject />} />
          </Route>
        </Route>
        {/* Main Layout */}

        {/* Authen Layout */}
        <Route element={<AuthenLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/email-check" element={<EmailCheck />} />
        </Route>
        {/* Authen Layout */}

        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
