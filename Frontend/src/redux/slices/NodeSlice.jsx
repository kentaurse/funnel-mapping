import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  nodeData: null,
  point: null,
  colorData: null,
  messageData: null,
  isChange: false,
  isConnecting: false,
  isDelete: false,
  category: {
    plus: [],
    minus: [],
  },
  arrayCategory: {
    right: {
      '0': {},
      '1': {},
      '2': {},
    },
    bottom: {
      '0': {},
      '1': {},
    }
  }
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
    },
    setCategory: (state, action) => {
      state.category = action.payload
    },
    setArrayCategory: (state, action) => {
      state.arrayCategory = action.payload
    }
  },
})

export const { setNodeData, setPoint, setChange, setColorData, setMessageData, setConnecting, setDelete, setCategory, setArrayCategory } = NodeSlice.actions

export default NodeSlice.reducer