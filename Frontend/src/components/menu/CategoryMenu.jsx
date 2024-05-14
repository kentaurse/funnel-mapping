import React from 'react';
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { MdSettings, MdEditSquare, MdLink, MdOutlineBookmarkRemove, MdDelete } from "react-icons/md";
import { LiaClone } from "react-icons/lia";
import { Menu } from 'antd';

const items = [
  {
    label: '追加',
    key: '1',
    icon: <CiCirclePlus />,
  },
  {
    label: '削除',
    key: '2',
    icon: <CiCircleMinus />,
  },
  {
    label: '削除',
    key: '3',
    icon: <MdDelete />,
  }
]

const onClick = () => {

}

const CategoryMenu = ({ className }) => {
  return (
    <Menu onClick={onClick} onContextMenu={(e) => e.preventDefault()} className={`absolute w-56 h-[136px] rounded-md z-50 select-none ${className}`} mode="inline" items={items} />
  )
}

export default CategoryMenu;