import React, { memo, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Handle, Position, useReactFlow, useUpdateNodeInternals, useStore } from "reactflow";
import { setNodeMenu, setNodeSettingDlg } from 'src/redux/slices/PageSlice';
import { setChange, setNodeData, setPoint, setColorData, setMessageData } from 'src/redux/slices/NodeSlice';
import { Tooltip } from 'antd';

const position = {
  right: {
    first: [57, 37, 22],
    common: [0, 40, 35]
  },
  bottom: {
    first: [50, 25],
    common: [0, 50]
  }
}
const connectionNodeIdSelector = (state) => state.connectionNodeId;

const Node = ({ data, selected, id }) => {
  const connectionNodeId = useStore(connectionNodeIdSelector);
  const isTarget = connectionNodeId && connectionNodeId !== id;
  const dispatch = useDispatch();
  const { isChange, point, nodeData, colorData, messageData, isConnecting, category } = useSelector(state => state.node);
  const { setNodes } = useReactFlow();
  const updateNodeInternals = useUpdateNodeInternals();

  const right = {
    number: data.point?.right?.length,
    position: []
  }
  const bottom = {
    number: data.point?.bottom?.length,
    position: []
  }

  for (let index = 0; index < right.number; index++) {
    right.position.push(`${(position.right.first[right.number - 1] + position.right.common[right.number - 1] * index)}%`);
  }
  for (let index = 0; index < bottom.number; index++) {
    bottom.position.push(`${(position.bottom.first[bottom.number - 1] + position.bottom.common[bottom.number - 1] * index)}%`);
  }

  const handleClick = () => {
    dispatch(setNodeData(data));
  }

  // useEffect(() => {
  //   console.log(data);
  // }, [selected])

  useEffect(() => {
    if (isChange) {
      setNodes((nds) =>
        nds.map((n) => {
          if (n.data.id === nodeData.id) {
            n.data = {
              ...n.data,
              point: point,
              color: colorData,
              category: category,
              message: messageData
            };
            return { ...n };
          }
          return n;
        })
      );
      updateNodeInternals(nodeData.id);
      dispatch(setPoint(null));
      dispatch(setColorData(null));
      dispatch(setMessageData(null));
      dispatch(setChange(false));
    }
  }, [isChange])

  return (
    <div className={`basicNode flex flex-col items-center justify-center w-[150px]`} onMouseDown={handleClick} onClick={handleClick} onContextMenu={(e) => e.preventDefault()}>
      <p>{data.heading}</p>
      {(data.message?.content1 !== null && data.message?.content2 !== null && selected) ? <Tooltip placement="topLeft" title={(
        <div>
          <h2>{data.message?.content1}</h2>
          <hr />
          <p>{data.message?.content2}</p>
        </div>
      )} arrow={true}>
        <img src={data.image} onContextMenu={(e) => { e.preventDefault(); handleClick(); dispatch(setNodeMenu({ x: e.clientX, y: e.clientY, flag: true })) }} onDoubleClick={() => dispatch(setNodeSettingDlg(true))} className={`${selected ? 'outline outline-2 outline-dashed outline-yellow-500 w-[150px]' : 'w-[150px]'}`} />
      </Tooltip> : <img src={data.image} onContextMenu={(e) => { e.preventDefault(); handleClick(); dispatch(setNodeMenu({ x: e.clientX, y: e.clientY, flag: true })) }} onDoubleClick={() => dispatch(setNodeSettingDlg(true))} className={`${selected ? 'outline outline-2 outline-dashed outline-yellow-500' : ''}`} />}
      {data.point?.right?.map((item, index) => {
        const bgStyle = data.color.right[index] ? data.color.right[index] : '#81c556';
        return (
          <Handle key={index} type="source" position={Position.Right} className={`flex justify-center w-4 h-4`} style={{ top: right.position[index], right: '-16px', backgroundColor: bgStyle }} id={`right${index}`}>
            <p className="text-[10px] pointer-events-none">{item}</p>
          </Handle>
        )
      })}
      {data.point?.bottom?.map((item, index) => {
        const bgStyle = data.color.bottom[index] ? data.color.bottom[index] : '#81c556';
        return (
          <Handle key={index} type="source" position={Position.Bottom} className={`flex justify-center w-4 h-4`} style={{ left: bottom.position[index], bottom: '-16px', backgroundColor: bgStyle }} id={`bottom${index}`}>
            <p className="text-[10px] pointer-events-none">{item}</p>
          </Handle>
        )
      })}
      {(data.point?.right?.length == 0 && data.point?.bottom?.length == 0) &&
        <>
          <Handle type="source" position={Position.Right} className={`dynamicHandle ${(isConnecting && isTarget) ? 'hideSide' : 'invisible'}`} style={{ top: `${position.right.first[0]}%` }} id="right" />
          <Handle type="source" position={Position.Bottom} className={`dynamicHandle ${(isConnecting && isTarget) ? 'hideSide' : 'invisible'}`} id="buttom" />
        </>
      }

      <Handle type="target" position={Position.Left} className={`dynamicHandle ${(isConnecting && isTarget) ? 'hideSide' : 'invisible'}`} style={{ top: `${position.right.first[0]}%` }} id="left" />
      <Handle type="target" position={Position.Top} className={`dynamicHandle ${(isConnecting && isTarget) ? 'hideSide' : 'invisible'}`} id="top" />
    </div>
  );
};

export default memo(Node);