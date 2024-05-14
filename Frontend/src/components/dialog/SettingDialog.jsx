import React, {useState} from 'react';
import { Button, Input, Select, Modal, Divider, Checkbox, theme } from 'antd';
import ColorButton from "src/components/common/ColorButton";
const { TextArea } = Input;

const NewDialog = ({ open, onOk, onCancel }) => {
  const [fontFamily, setFontFamily] = useState();
  const [colors, setColors] = useState({
    theme: ['#81c556', '#4392ee', '#f24237', '#f2f351', '#af319f', '#ed7230'],
    tag: ['#81c556', '#4392ee', '#f24237', '#f2f351', '#af319f', '#ed7230'],
    list: ['#81c556', '#4392ee', '#f24237', '#f2f351', '#af319f', '#ed7230'],
    field: ['#81c556', '#4392ee', '#f24237', '#f2f351', '#af319f', '#ed7230'],
    line: ['#404040', '#7f7f7f', '#afabab', '#94a8da', '#3b5194', '#4c843c'],
  });
  const [pickerColor, setPickerColor] = useState({
    theme: '#ffffff', tag: '#ffffff', list: '#ffffff', field: '#ffffff', line: '#ffffff', lineText: '#ffffff'
  });

  const colorSettings = ['テーマ', 'タグ', 'リスト', 'フィールド'];
  const type = ['theme', 'tag', 'list', 'field', ];
  
  
  const family = [
    {label: 'Agency FB', value: 0},
    {label: 'Algerian', value: 1},
    {label: 'Arial', value: 2},
    {label: 'Arial Rounded MT', value: 3},
    {label: 'Bahnschrift', value: 4},
    {label: 'Baskerville Old Face', value: 5},
    {label: 'Bauhaus 93', value: 6},
    {label: 'Bell MT', value: 7},
    {label: 'Berlin Sans FB', value: 8},
    {label: 'Bernard MT', value: 9},
    {label: 'Blackadder ITC', value: 10},
    {label: 'Bodoni MT', value: 11},
    {label: 'Bodoni MT Poster', value: 12},
    {label: 'Book Antiqua', value: 13},
    {label: 'Bookman Old Style', value: 14},
  ];
  const size = [
    {label: '6', value: 0},
    {label: '7', value: 1},
    {label: '8', value: 2},
    {label: '9', value: 3},
    {label: '10', value: 4},
    {label: '11', value: 5},
    {label: '12', value: 6},
    {label: '13', value: 7},
    {label: '14', value: 8},
    {label: '15', value: 9},
    {label: '16', value: 10},
    {label: '17', value: 11},
    {label: '18', value: 12},
    {label: '19', value: 13},
    {label: '20', value: 14}
  ];

  const handleColorChange = (type, index) => (color) => {
    setColors(prevColors => ({
      ...prevColors,
      [type]: prevColors[type].map((c, i) => (i === index ? color : c))
    }));
  };
  
  const pickerColorChange = (type) => (color) => {
    setPickerColor(prevColors => ({
      ...prevColors,
      [type]: color
    }));
  };

  const renderColorButtons = (type) => {
    return colors[type].map((color, index) => (
      <ColorButton key={index} color={color} setColor={handleColorChange(type, index)} isBorder={index === 1} />
    ));
  };

  return (
    <Modal className='select-none' centered open={open} onOk={onOk} onCancel={onCancel} footer={false} width={600}>
      <h3 className='text-center pt-5'>プロジェクト設定</h3>
      <Divider />
      <div className='flex flex-col gap-y-3 px-10'>
        <div>
          <div className='flex gap-2'>タイトル <p className='text-red-500'>*</p></div>
          <Input type="text" />
        </div>
        <div className='flex gap-2 pt-5'>
          <div className='w-[110px] pr-5'>カラー設定</div>
          <div className='flex flex-col gap-5'>
            {colorSettings.map((item, index) => (
              <div key={index} className='flex gap-4'>
                <p className='w-[100px]'>{item}</p>
                {renderColorButtons(type[index])}
                <ColorButton key={index} color={pickerColor[type[index]]} setColor={pickerColorChange(type[index])} isDisable={false} isBorder={false} />
              </div>
            ))}
          </div>
        </div>
        <div className='flex gap-2 pt-5'>
          <div className='w-[110px] pr-5'>コネクト設定</div>
          <div className='flex flex-col gap-5'>
            <div className='flex items-center gap-4'>
              <p className='w-[100px]'>ラインカラー</p>
              {renderColorButtons('line')}
              <ColorButton color={pickerColor.line} setColor={pickerColorChange('line')} isDisable={false} isBorder={false} />
            </div>
            <div className='flex items-center gap-4'>
              <p className='w-[100px]'>ラインテキスト</p>
              <div className='flex gap-1'>
                <Select className='w-[138px]' options={family} />
                <Select className='w-[58px]' options={size} />
              </div>
              <ColorButton color={pickerColor.lineText} setColor={pickerColorChange('lineText')} isDisable={false} isBorder={false} />
            </div>
          </div>
        </div>
        <div>
          <div>説明文</div>
          <TextArea rows={3} />
        </div>
        <div className='flex justify-center gap-14'>
          <Button>キャンセル</Button>
          <Button type='primary'>保存</Button>
        </div>
      </div>
    </Modal>
  );
}

export default NewDialog;
