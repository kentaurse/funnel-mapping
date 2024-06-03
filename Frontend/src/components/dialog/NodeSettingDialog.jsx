import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdClose } from "react-icons/md";
import { Select, Tabs, Input, Button, Checkbox, Divider } from 'antd';
const { TextArea } = Input;
import ColorButton from "src/components/common/ColorButton";
import { FaPlusCircle, FaListAlt, FaEdit } from "react-icons/fa";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { VscTag } from "react-icons/vsc";
import JointDialog from "src/components/dialog/JointDialog";
import { setNodeSettingDlg } from "src/redux/slices/PageSlice";
import { setChange, setPoint, setColorData, setMessageData, setCategory, setArrayCategory } from "src/redux/slices/NodeSlice";

const colors = ['#81c556', '#4392ee', '#f24237', '#f2f351', '#af319f', '#ed7230'];

const Category = ({ text, type, flag }) => (
  <div className='flex relative'>
    <div className='pt-[6px] pl-4 pr-3'>
      <h5 className='bg-orange-400 rounded-sm h-5 text-[11px] px-2'>{text}</h5>
    </div>
    {type == 1 && <VscTag className='absolute top-0 left-0 text-[25px] text-[#08c]' />}
    {type == 2 && <FaListAlt className='absolute top-0 left-1 text-[20px] text-[#08c]' />}
    {type == 3 && <FaEdit className='absolute top-0 left-1 text-[20px] text-[#08c]' />}
    {flag ? <CiCirclePlus className='absolute top-0 right-0 text-[18px] text-[#08c]' /> :
      <CiCircleMinus className='absolute top-0 right-0 text-[18px] text-[#08c]' />}
  </div >
)

const Joint = ({ text, setText, setColor, type, index, joint, color }) => {
  const dispatch = useDispatch();
  const { category } = useSelector(state => state.node);
  const [isJoint, setJoint] = useState(false);
  const [jointColor, setJointColor] = useState(null);

  const handleOk = () => {
    setJoint(false);
  }

  const handleCancel = () => {
    setJoint(false);
  }

  const handleChange = (e) => {
    const updatedJoint = { ...joint };
    updatedJoint[type][index] = e.target.value;
    setText(updatedJoint);
  }

  const handleCheck = (e) => {
    setJointColor(e.target.value);
    const updatedColor = { ...color };
    updatedColor[type][index] = e.target.value;
    setColor(updatedColor);
  };

  return (
    <div>
      <div className='flex justify-between'>
        <h4>テキスト</h4>
        <div className='flex gap-5'>
          <Input defaultValue={text} onChange={handleChange} maxLength={1} className='w-8' />
          <h4>１⽂字のみ</h4>
        </div>
      </div>
      <div className='flex justify-between items-start pt-7'>
        <div className='flex items-center'>
          <h4>アクション</h4>
          <button onClick={() => setJoint(true)}><FaPlusCircle className='text-[20px] text-[#08c]' /></button>
        </div>
        <div className='flex flex-wrap gap-1 max-w-[192px]'>
          {category['plus']?.map((item, key) => {
            let type;
            if (item.type === 'tag') type = 1;
            if (item.type === 'list') type = 2;
            if (item.type === 'field') type = 3;
            if (item.type === 'category') type = 4;
            return (<Category text={item.name} type={type} flag={true} />);
          })}
          {category['minus']?.map((item, key) => {
            let type;
            if (item.type === 'tag') type = 1;
            if (item.type === 'list') type = 2;
            if (item.type === 'field') type = 3;
            if (item.type === 'category') type = 4;
            return (<Category text={item.name} type={type} flag={false} />);
          })}
        </div>
      </div>
      <div className="flex justify-between pt-7">
        <h4 className='pr-12'>カラー</h4>
        {colors.map((color, index) => {
          const btnStyle = index === 1 ? { borderColor: color, borderWidth: '1px' } : { backgroundColor: color };
          return (
            <div className='relative' key={index}>
              <input type='radio' value={color} onChange={handleCheck} className='w-5 h-5 rounded-full appearance-none' name='joint' style={btnStyle} />
              {jointColor === color && <img src='/check.png' className='absolute top-0 w-5 pointer-events-none' />}
            </div>
          )
        })}
      </div>
      <JointDialog open={isJoint} onOk={handleOk} onCancel={handleCancel} />
    </div>
  )
}

const NodeSettingDialog = () => {
  const dispatch = useDispatch();
  const { nodeData, category, arrayCategory } = useSelector(state => state.node);
  const [isjoint, setIsJoint] = useState(false);
  const [jointIdentify, setJointIdentify] = useState(['right', '0']);
  const [message, setMessage] = useState({
    content1: null,
    content2: null
  })
  const [joint, setJoint] = useState({
    right: ['y'],
    bottom: ['n'],
  })
  const [color, setColor] = useState({
    right: ['#81c556'],
    bottom: ['#81c556'],
  })

  const handleColorChange = () => (color) => {
    alert(color)
  };

  const setRightNum = (value) => {
    const num = parseInt(value);
    const yArray = Array.from({ length: num }, () => 'y');
    setJoint(prevState => ({
      ...prevState,
      right: yArray
    }));
  }

  const setBottomNum = (value) => {
    const num = parseInt(value);
    const nArray = Array.from({ length: num }, () => 'n');
    setJoint(prevState => ({
      ...prevState,
      bottom: nArray
    }));
  }

  const handleJoint = (e) => {
    setIsJoint(e.target.checked);
    if (e.target.checked) {

    }
  }

  const jointTabItems = [
    ...joint.right.map((text, index) => ({
      label: `右 ${index + 1}`,
      key: `right-${index}`,
      children: <Joint key={`rJoint-${index}`} text={text} setText={setJoint} setColor={setColor} type='right' index={index} joint={joint} color={color} />
    })),
    ...joint.bottom.map((text, index) => ({
      label: `下 ${index + 1}`,
      key: `bottom-${index}`,
      children: <Joint key={`bJoint-${index}`} text={text} setText={setJoint} setColor={setColor} type='bottom' index={index} joint={joint} color={color} />
    }))
  ];
  const onTabPoint = (e) => {
    const str = e.split('-');
    setJointIdentify(str);
    dispatch(setCategory({
      plus: [],
      minus: [],
    }))
  }

  const handleSave = () => {
    if (isjoint) {
      dispatch(setPoint(joint));
      dispatch(setColorData(color));
    }
    dispatch(setCategory({
      plus: [],
      minus: [],
    }))
    dispatch(setMessageData(message));
    dispatch(setChange(true));
    dispatch(setNodeSettingDlg(false));
    dispatch(setCategory({
      plus: [],
      minus: [],
    }))
  }
  useEffect(() => {
    const newArray = { ...arrayCategory };
    newArray[jointIdentify[0]] = { ...newArray[jointIdentify[0]] };
    newArray[jointIdentify[0]][jointIdentify[1]] = category;
    dispatch(setArrayCategory(newArray));
  }, [category]);

  return (
    <div className='absolute top-[1px] right-0 h-full w-[350px] shadow bg-base-300 select-none'>
      <div className='common pt-2'>
        <div className='flex justify-end pr-2'>
          <button className='hover:bg-base-200 px-auto' onClick={() => dispatch(setNodeSettingDlg(false))}><MdClose className='text-[25px] text-base-500' /></button>
        </div>
        <div className='flex flex-col gap-2 pr-10 pt-2'>
          <div className='flex justify-around'>
            <h4>タイトル</h4>
            <p>{nodeData.heading}</p>
          </div>
          <div className='flex justify-around pt-2'>
            <h4>タイプ</h4>
            <p>WEBページ</p>
          </div>
          <div className='flex justify-around pt-2'>
            <h4>カテゴリー</h4>
            <Select
              defaultValue="1"
              style={{ width: 120 }}
              // onChange={handleChange}
              options={[
                { value: '1', label: 'シナリオ' },
                { value: 'lucy', label: 'Lucy' },
                { value: 'Yiminghe', label: 'yiminghe' },
              ]}
            />
          </div>
          <div className='w-full pl-5 pt-2'>
            <Tabs className='h-[625px] overflow-hidden overflow-y-auto' defaultActiveKey="1"
              items={[
                {
                  label: '基本設定',
                  key: '1',
                  children: (
                    <div>
                      <div className='flex justify-between'>
                        <h4>メモ</h4>
                        <TextArea className='w-52' rows={6} placeholder="maxLength is 500" maxLength={500} />
                      </div>
                      <div className='flex justify-between pt-10'>
                        <h4>テーマカラー</h4>
                        {colors.map((color, index) => (
                          <ColorButton key={index} color={color} setColor={handleColorChange} isBorder={index === 1} />
                        ))}
                      </div>
                      <div className='flex justify-between pt-10'>
                        <h4>URL</h4>
                        <div className='flex flex-col w-52 items-center gap-1'>
                          <Input placeholder="https://" />
                          <h4>スナップショットを使う</h4>
                        </div>
                      </div>
                      <div className='flex justify-between pt-10'>
                        <h4>サムネイル</h4>
                        <div className='flex flex-col w-52 items-center gap-1'>
                          <img src='/messages/1.png' className='w-40' />
                          <Button>選択</Button>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  label: 'オプション',
                  key: '2',
                  children: (
                    <div>
                      <div className='flex justify-between'>
                        <h4 className='pt-1'>ジョイント</h4>
                        <div className='flex flex-col items-center'>
                          <div className='flex items-center gap-5'>
                            <h4>右</h4>
                            <Select defaultValue="1" onChange={setRightNum}
                              options={[
                                {
                                  value: '1',
                                  label: '1',
                                },
                                {
                                  value: '2',
                                  label: '2',
                                },
                                {
                                  value: '3',
                                  label: '3',
                                }
                              ]}
                            />
                            <h4>下</h4>
                            <Select defaultValue="1" onChange={setBottomNum}
                              options={[
                                {
                                  value: '1',
                                  label: '1',
                                },
                                {
                                  value: '2',
                                  label: '2',
                                }
                              ]}
                            />
                          </div>
                          <div className='pt-1'>
                            <Checkbox onChange={handleJoint} checked={isjoint}>Yes / No</Checkbox>
                          </div>
                        </div>
                      </div>
                      <div>
                        {isjoint && <Tabs defaultActiveKey="right-1" onChange={onTabPoint}
                          items={jointTabItems}
                        />}
                        <Divider />
                        <h4>プレビュー</h4>
                        <div className='pt-2'>
                          <img src='/messages/1.png' className='w-40' />
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  label: 'コンテンツ',
                  key: '3',
                  children: (
                    <div>
                      <div className="flex justify-between">
                        <h4>件名</h4>
                        <Input className='w-56' onChange={(e) => setMessage(pre => ({ ...pre, content1: e.target.value }))} />
                      </div>
                      <div className="flex justify-between pt-10">
                        <h4>件名</h4>
                        <TextArea rows={6} className='w-56' onChange={(e) => setMessage(pre => ({ ...pre, content2: e.target.value }))} />
                      </div>
                    </div>
                  ),
                },
              ]}
            />
            <Divider />
            <div className='flex justify-end gap-5'>
              <Button>キャンセル</Button>
              <Button type='primary' onClick={handleSave}>保存</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NodeSettingDialog;
