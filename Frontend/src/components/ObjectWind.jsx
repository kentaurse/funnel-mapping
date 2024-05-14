import React, { useState } from 'react';
import { Menu, Tabs } from 'antd';
import { TfiLayoutGrid3 } from "react-icons/tfi";
import { AppstoreOutlined, UnorderedListOutlined, SearchOutlined, UndoOutlined, FilterOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

const ObjectWind = () => {
  const [largeView, setLargeView] = useState(true)
  
  const items = [
    {
      key: '1',
      label: (
        <div className='flex flex-col justify-center items-center select-none w-[60px]'>
          <img src='/items/lay-mtg.png' />
          <p>アイテム</p>
        </div>
      ),
      children: (
        <div className='flex justify-end gap-2 px-2 pb-2'>
          <button onClick={() => setLargeView(false)}><TfiLayoutGrid3 className='text-[26px]'/></button>
          <button onClick={() => setLargeView(true)}><AppstoreOutlined className='text-[30px]'/></button>
          <button onClick={() => setLargeView(false)}><UnorderedListOutlined className='text-[30px]'/></button>
          <button><SearchOutlined className='text-[30px]'/></button>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div className='flex flex-col justify-center items-center select-none w-[60px]'>
          <img src='/items/squen-mtg.png' />
          <p>属性管理</p>
        </div>
      ),
      children: (
        <div className='flex justify-end gap-2 px-2 pb-2'>
          <button><UndoOutlined className='text-[30px]'/></button>
          <button><FilterOutlined className='text-[30px]'/></button>
          <button><SearchOutlined className='text-[30px]'/></button>
        </div>
      ),
    },
    {
      key: '3',
      label: (
        <div className='flex flex-col justify-center items-center select-none w-[60px]'>
          <img src='/items/attr-mtg.png' />
          <p>シーケンス</p>
        </div>
      ),
      children: (
        <div className='flex justify-end gap-2 px-2 pb-2'>
          <button><AppstoreOutlined className='text-[30px]'/></button>
          <button><UnorderedListOutlined className='text-[30px]'/></button>
          <button><SearchOutlined className='text-[30px]'/></button>
        </div>
      ),
    },
  ];
  
  const onChange = (key) => {

  };

  const handleDragStart = (e, src, alt, type) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ src, alt, type }));
  };

  return (
    <div className='w-[286px] h-full overflow-hidden'>
      <Tabs onChange={onChange} type="card" items={items} />
      <hr />
      <div className='no-scrollbar overflow-y-auto h-full'>
        <Menu mode='inline' className='select-none'>
          <SubMenu key={'1'} title={"メッセージ"} >
            <div key={'1-1'} className='flex flex-row flex-wrap gap-2 px-2'>
              {Array.from({ length: 6 }).map((_, index) => (
                <img key={'1-1' + index} src={`/messages/${index + 1}.png`} onDragStart={(e) => handleDragStart(e, `/messages/${index + 1}.png`, `${index + 1}`, 'message')} className={largeView ? 'w-[130px]' : 'w-[84px]'} />
              ))}
            </div>
          </SubMenu>
          <SubMenu key={'2'} title={"オブジェクト"} className='pb-60' >
            <div key={'2-1'} className='flex flex-row flex-wrap gap-2 px-2'>
              {Array.from({ length: 13 }).map((_, index) => (
                <img key={'2-1' + index} src={`/objects/${index + 1}.png`} onDragStart={(e) => handleDragStart(e, `/objects/${index + 1}.png`, `${index + 1}`, 'object')} className={largeView ? 'w-[130px]' : 'w-[84px]'} />
              ))}
            </div>
          </SubMenu>
        </Menu>
      </div>
    </div>
  );
}

export default ObjectWind;
