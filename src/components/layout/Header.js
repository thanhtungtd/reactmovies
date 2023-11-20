import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <div className="w-full mx-auto fixed z-20 top-0 left-0">
        <header className="header flex absolute w-full justify-center items-center gap-x-5 text-white text-lg py-6 font-bold gradientHead">
            <NavLink className={({isActive}) => (isActive) ? "text-primary" : ""} to="/">Home</NavLink>
            <NavLink className={({isActive}) => (isActive) ? "text-primary" : ""} to="/movies">Movies</NavLink>
        </header>
        </div>
    );
};

export default Header;