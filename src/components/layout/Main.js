import React, { Fragment } from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <Fragment>
            <Header></Header>
            <Outlet></Outlet>        {/*Outlet: Hiển thị các Route con bên trong Route cha*/}
        </Fragment>
    );
};

export default Main;