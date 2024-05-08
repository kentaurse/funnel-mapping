import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const list = ['about', 'dashboard', 'blog', 'login', 'register'];

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <nav>
      <ul className='flex justify-center gap-20 items-center w-full h-[50px]'>
        {list.map((item, index) => (
          <NavLink key={index} to={`/${item}`} className={ location.pathname === `/${item}` ? 'text-colorLink' : ''}>{capitalize(item)}</NavLink>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;