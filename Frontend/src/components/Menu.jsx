import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu as AntdMenu } from 'antd';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem('Navigation One', '1', <MailOutlined />, [
    getItem('Option 1', '11'),
    getItem('Option 2', '12'),
    getItem('Option 3', '13'),
    getItem('Option 4', '14'),
  ]),
  getItem('Navigation Two', '2', <AppstoreOutlined />, [
    getItem('Option 1', '21'),
    getItem('Option 2', '22'),
    getItem('Submenu', '23', null, [
      getItem('Option 1', '231'),
      getItem('Option 2', '232'),
      getItem('Option 3', '233'),
    ]),
    getItem('Submenu 2', '24', null, [
      getItem('Option 1', '241'),
      getItem('Option 2', '242'),
      getItem('Option 3', '243'),
    ]),
  ]),
  getItem('Navigation Three', '3', <SettingOutlined />, [
    getItem('Option 1', '31'),
    getItem('Option 2', '32'),
    getItem('Option 3', '33'),
    getItem('Option 4', '34'),
  ]),
];
const getLevelKeys = (items1) => {
  const key = {};
  const func = (items2, level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        return func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};
const levelKeys = getLevelKeys(items);

const Menu = () => {
  const [stateOpenKeys, setStateOpenKeys] = useState(['2', '23']);
  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };
  return (
    <div>
      <div className='h-[65px]' />
      <div className='h-[879px] overflow-y-auto no-scrollbar'>
        <AntdMenu
          mode="inline"
          defaultSelectedKeys={['231']}
          openKeys={stateOpenKeys}
          onOpenChange={onOpenChange}
          style={{
            width: 300,
          }}
          items={items}
        />
      </div>
    </div>
  );
};
export default Menu;