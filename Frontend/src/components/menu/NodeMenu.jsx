import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdSettings, MdEditSquare, MdLink, MdOutlineBookmarkRemove, MdDelete } from "react-icons/md";
import { LiaClone } from "react-icons/lia";
import { Menu } from 'antd';
import { setNodeMenu, setNodeSettingDlg } from "src/redux/slices/PageSlice";

const items = [
  {
    label: '編集',
    key: '1',
    icon: <MdSettings />,
  },
  {
    label: 'ファイル作成',
    key: '2',
    icon: <MdEditSquare />,
  },
  {
    label: '複製',
    key: '3',
    icon: <LiaClone />,
  },
  {
    label: 'リンク先',
    key: '4',
    icon: <MdLink />,
  },
  {
    label: '非表示',
    key: '5',
    icon: <MdOutlineBookmarkRemove />,
  },
  {
    label: '削除',
    key: '6',
    icon: <MdDelete />,
  }
]


const NodeMenu = ({ top, left, nodeRef }) => {
  const dispatch = useDispatch();
  
  const handleBlur = (e) => {
    const newFocusedElement = e.relatedTarget;
    const tagName = newFocusedElement?.tagName.toLowerCase();
    if(tagName !== 'ul' && tagName !== 'li') {
      dispatch(setNodeMenu({ x: 0, y: 0, flag: false }));
    }
  };
  
  const onClick = (e) => {
    switch (e.key) {
      case '1':
        dispatch(setNodeSettingDlg(true));
        break;
    
      default:
        break;
    }
    dispatch(setNodeMenu({ x: 0, y: 0, flag: false }));
  };
  
  if(top > 567){
    top -= 268;
  }
  if(left > 1098){
    left -= 224;
  }
  
  return (
    <div ref={nodeRef} tabindex="0" autoFocus onContextMenu={(e) => e.preventDefault()} onBlur={handleBlur} className={`absolute w-56 h-[268px] rounded-md z-50 select-none`} style={{ top: `${top}px`, left: `${left}px` }}>
      <Menu onClick={(e) => onClick(e)} mode="inline" items={items} className='rounded-md' />
    </div>
  )
}

export default NodeMenu;