import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul className='flex justify-center gap-20 items-center w-full h-[50px] shadow bg-base-300'>
        <NavLink to="/about" className={ ({ isActive }) => isActive ? 'active-navlink': ''}>About</NavLink>
        <NavLink to="/workspace" >Workspace</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
      </ul>
    </nav>
  );
}

export default Navbar;
