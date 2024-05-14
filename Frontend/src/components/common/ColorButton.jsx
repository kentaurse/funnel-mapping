import React, { useState } from 'react';
import { ColorPicker } from 'antd';

const ColorButton = ({ color = '#1677ff', isBorder = false, isDisable = true, name, setColor }) => {
  const handleChange = (value) => {
    setColor(value);
  };
  
  const handleCheck = (e) => {
    handleChange(e.target.value);
  };

  const btnStyle = isBorder ? { borderColor: color, borderWidth: '1px' } : { backgroundColor: color };

  return (
    <>
      {isDisable ? (
        <ColorPicker value={color} disabled>
          <div className='relative'>
            <input type='radio' value={color} onChange={handleCheck} className='w-5 h-5 rounded-full appearance-none' name={name} style={btnStyle} />
            {<img src='/check.png' className='absolute top-0 w-5 pointer-events-none' />}
          </div>
        </ColorPicker>
      ) : (
        <ColorPicker value={color} onChange={(e) => handleChange(e.toHexString())}>
          <input type='radio' className='w-5 h-5 rounded-sm appearance-none' name={name} style={btnStyle} />
        </ColorPicker>
      )}
    </>
  );
};

export default ColorButton;
