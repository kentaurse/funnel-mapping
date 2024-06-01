import React, { useEffect, useState } from 'react';
import { Menu, Tabs } from 'antd';
import { TfiLayoutGrid3 } from "react-icons/tfi";
import { AppstoreOutlined, UnorderedListOutlined, SearchOutlined, UndoOutlined, FilterOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

const ObjectWind = () => {
  const [largeView, setLargeView] = useState(true)
  const [itemWidth, setItemWidth] = useState('w-[130px]')
  const [currentTab, setCurrentTab] = useState(1)
  const items = [
    {
      key: '1',
      label: (
        <div className='flex flex-col justify-center items-center select-none w-[60px]'>
          <img src='ObjectWnd/Item.png' />
          <p>アイテム</p>
        </div>
      ),
      children: (
        <div className='flex justify-end gap-2 px-2 pb-2'>
          <button onClick={() => setLargeView(false)}><TfiLayoutGrid3 className='text-[26px]' /></button>
          <button onClick={() => setLargeView(true)}><AppstoreOutlined className='text-[30px]' /></button>
          <button onClick={() => setLargeView(false)}><UnorderedListOutlined className='text-[30px]' /></button>
          <button><SearchOutlined className='text-[30px]' /></button>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div className='flex flex-col justify-center items-center select-none w-[60px]'>
          <img src='ObjectWnd/Attribute.png' />
          <p>属性管理</p>
        </div>
      ),
      children: (
        <div className='flex justify-end gap-2 px-2 pb-2'>
          <button><UndoOutlined className='text-[30px]' /></button>
          <button><FilterOutlined className='text-[30px]' /></button>
          <button><SearchOutlined className='text-[30px]' /></button>
        </div>
      ),
    },
    {
      key: '3',
      label: (
        <div className='flex flex-col justify-center items-center select-none w-[60px]'>
          <img src='ObjectWnd/Sequence.png' />
          <p>シーケンス</p>
        </div>
      ),
      children: (
        <div className='flex justify-end gap-2 px-2 pb-2'>
          <button><AppstoreOutlined className='text-[30px]' /></button>
          <button><UnorderedListOutlined className='text-[30px]' /></button>
          <button><SearchOutlined className='text-[30px]' /></button>
        </div>
      ),
    },
  ];

  const onChange = (key) => {
    setCurrentTab(key)
  };

  const handleDragStart = (e, src, alt, type) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ src, alt, type }));
  };

  const getFileName = (str) => {
    var trimmedStr = str.slice(0, -4);
    var parts = trimmedStr.split("/");
    var lastElement = parts[parts.length - 1];
    return lastElement;
  }
  useEffect(() => {
    if (largeView) {
      setItemWidth('w-[130px]');
    }else setItemWidth('w-[84px]');
  }, [largeView])
  const ObjectLists = {
    message: {
      activeCampain: ['ObjectWnd/Item/Message/ActiveCampaig/Automation.png'],
      mail: [
        'ObjectWnd/Item/Message/Mail/Mail1.png',
        'ObjectWnd/Item/Message/Mail/Mail2.png',
        'ObjectWnd/Item/Message/Mail/Mail3.png',
      ],
      line: [
        'ObjectWnd/Item/Message/Line/Line1.png',
        'ObjectWnd/Item/Message/Line/Line2.png',
        'ObjectWnd/Item/Message/Line/Line3.png',
      ],
      instagram: [
        'ObjectWnd/Item/Message/Instagram/Instagram1.png',
        'ObjectWnd/Item/Message/Instagram/Instagram2.png',
        'ObjectWnd/Item/Message/Instagram/Instagram3.png',
      ],
      messenser: [
        'ObjectWnd/Item/Message/Messenser/Messenser1.png',
        'ObjectWnd/Item/Message/Messenser/Messenser2.png',
        'ObjectWnd/Item/Message/Messenser/Messenser3.png',
      ],
      sms: [
        'ObjectWnd/Item/Message/Sms/Sms1.png',
        'ObjectWnd/Item/Message/Sms/Sms2.png',
        'ObjectWnd/Item/Message/Sms/Sms3.png',
      ],
      x: [
        'ObjectWnd/Item/Message/X/Twitter1.png',
        'ObjectWnd/Item/Message/X/Twitter2.png',
        'ObjectWnd/Item/Message/X/Twitter3.png',
      ],
    },
    object: {
      sales: [
        'ObjectWnd/Item/Object/Sales/アップセル.png',
        'ObjectWnd/Item/Object/Sales/オプトインページ.png',
        'ObjectWnd/Item/Object/Sales/サンキユーページ.png',
        'ObjectWnd/Item/Object/Sales/セールスページ.png',
        'ObjectWnd/Item/Object/Sales/ダウンロードページ.png',
        'ObjectWnd/Item/Object/Sales/ブログページ.png',
        'ObjectWnd/Item/Object/Sales/ランディングページ.png',
        'ObjectWnd/Item/Object/Sales/動画ページ.png',
        'ObjectWnd/Item/Object/Sales/支払いページ.png',
      ],
      content: [
        'ObjectWnd/Item/Object/Content/Content.png',
      ],
      platform: [
        'ObjectWnd/Item/Object/Platform/Platform.png',
      ],
      instagram: [
        'ObjectWnd/Item/Object/Instagram/Instagram1.png',
        'ObjectWnd/Item/Object/Instagram/Instagram2.png',
        'ObjectWnd/Item/Object/Instagram/Instagram3.png',
      ],
      facebook: [
        'ObjectWnd/Item/Object/Facebook/Facebook.png',
      ],
      x: [
        'ObjectWnd/Item/Object/X/Twitter1.png',
        'ObjectWnd/Item/Object/X/Twitter2.png',
        'ObjectWnd/Item/Object/X/Twitter3.png',
      ],
      advertise: [
        'ObjectWnd/Item/Object/Advertisement/Advertisement.png',
      ],
      other: [
        'ObjectWnd/Item/Object/Other/Other.png',
      ],
    }
  }
  const subMenus = {
    message: [
      { key: 'activeCampain', title: 'Activecampaign', list: ObjectLists.message.activeCampain },
      { key: 'mail', title: 'メール', list: ObjectLists.message.mail },
      { key: 'line', title: 'LINE', list: ObjectLists.message.line },
      { key: 'instagram', title: 'Instagram', list: ObjectLists.message.instagram },
      { key: 'messenser', title: 'Messenser', list: ObjectLists.message.messenser },
      { key: 'sms', title: 'Sms', list: ObjectLists.message.sms },
      { key: 'x', title: 'X', list: ObjectLists.message.x },
    ],
    object: [
      { key: 'sales', title: 'セールスファネル', list: ObjectLists.object.sales },
      { key: 'content', title: 'コンテンツ', list: ObjectLists.object.content },
      { key: 'platform', title: 'プラットフォーム', list: ObjectLists.object.platform },
      { key: 'instagram', title: 'Instagram', list: ObjectLists.object.instagram },
      { key: 'facebook', title: 'Facebook', list: ObjectLists.object.facebook },
      { key: 'x', title: 'X', list: ObjectLists.object.x },
      { key: 'advertise', title: '広告', list: ObjectLists.object.advertise },
      { key: 'other', title: 'その他', list: ObjectLists.object.other },
    ],
  };
  return (
    <div className='w-[286px] h-full overflow-hidden'>
      <Tabs onChange={onChange} type="card" items={items} />
      <hr />
      <div className='no-scrollbar overflow-y-auto h-[737px]'>
        {currentTab == 1 &&
          <Menu mode='inline' className='select-none'>
            <SubMenu key='message' title="メッセージ" icon={<img src='ObjectWnd/Item/Message/Message.png' width={20} />} >
              {subMenus.message.map(menu => (
                <SubMenu key={menu.key} title={menu.title}>
                  <div className='flex flex-row flex-wrap gap-2 px-2'>
                    {menu.list.map((item, index) => (
                      <div key={index} className='flex flex-col items-center'>
                        <p className={`py-3 text-[15px] long-text w-[130px] text-center ${itemWidth}`}>{getFileName(item)}</p>
                        <img src={item} onDragStart={(e) => handleDragStart(e, item, getFileName(item), 'message')} className={itemWidth} />
                      </div>
                    ))}
                  </div>
                </SubMenu>
              ))}
            </SubMenu>
            <SubMenu key='object' title="オブジェクト" icon={<img src='ObjectWnd/Item/Object/Object.png' width={20} />} >
              {subMenus.object.map(menu => (
                <SubMenu key={menu.key} title={menu.title}>
                  <div className='flex flex-row flex-wrap gap-2 px-2'>
                    {menu.list.map((item, index) => (
                      <div key={index} className='flex flex-col items-center'>
                        <p className={`py-3 text-[15px] long-text w-[130px] text-center ${itemWidth}`}>{getFileName(item)}</p>
                        <img src={item} onDragStart={(e) => handleDragStart(e, item, getFileName(item), 'object')} className={itemWidth} />
                      </div>
                    ))}
                  </div>
                </SubMenu>
              ))}
            </SubMenu>
          </Menu>
        }
      </div>
    </div>
  );
}

export default ObjectWind;
