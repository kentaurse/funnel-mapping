import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  nodeData: null,
  point: null,
  colorData: null,
  messageData: null,
  isChange: false,
  isConnecting: false,
  isDelete: false,
}

export const NodeSlice = createSlice({
  name: 'NodeSlice',
  initialState,
  reducers: {
    setNodeData: (state, action) => {
      state.nodeData = action.payload
    },
    setPoint: (state, action) => {
      state.point = action.payload
    },
    setColorData: (state, action) => {
      state.colorData = action.payload
    },
    setMessageData: (state, action) => {
      state.messageData = action.payload
    },
    setChange: (state, action) => {
      state.isChange = action.payload
    },
    setConnecting: (state, action) => {
      state.isConnecting = action.payload
    },
    setDelete: (state, action) => {
      state.isDelete = action.payload
    }
  },
})

export const { setNodeData, setPoint, setChange, setColorData, setMessageData, setConnecting, setDelete } = NodeSlice.actions

export default NodeSlice.reducer