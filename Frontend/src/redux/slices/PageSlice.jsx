import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isFileWndLoading: false,
  isHeaderBar: true,
  isFileWnd: true,
  isObjectWnd: true,
  openFiles: [],
  tempFile: null,
  selectFile: null,
  selectFolder: null,
  isUndo: false,
  isRedo: false,
  isDownloadCanvas: false,
  isDownloadContent: false,
  isInitialCanvas: false,
  isNodeSettingDlg: false,
  nodeMenu: {x: 0, y: 0, flag: false},
}

export const PageSlice = createSlice({
  name: 'PageSlice',
  initialState,
  reducers: {
    setViewMode: (state, action) => {
      state.isHeaderBar = action.payload
      state.isFileWnd = action.payload
      state.isObjectWnd = action.payload
    },
    onFileWndLoading: (state) => {
      state.isFileWndLoading = !state.isFileWndLoading
    },
    onFileWind: (state) => {
      state.isFileWnd = !state.isFileWnd
    },
    onObjectWnd: (state) => {
      state.isObjectWnd = !state.isObjectWnd
    },
    addOpenFiles: (state, action) => {
      const isExist = state.openFiles.filter(file => file.key === action.payload.key).length > 0 ? true : false;
      if(!isExist && state.openFiles.length < 3) state.openFiles.push(action.payload);
    },
    removeOpenFiles: (state, action) => {
      state.openFiles = state.openFiles.filter(item => item.key !== action.payload)
      if(action.payload == state.selectFile) {
        if(state.tempFile != null) state.selectFile = state.tempFile;
        if(state.openFiles.length == 0) state.selectFile = null;
        else state.selectFile = state.openFiles[state.openFiles.length - 1].key;
      }
    },
    setTempFile: (state, action) => {
      if(action.payload == null && state.tempFile?.key == state.selectFile) {
        if(state.openFiles.length == 0) state.selectFile = null;
        else state.selectFile = state.openFiles[state.openFiles.length - 1].key;
      }
      state.tempFile = action.payload
    },
    setSelectFile: (state, action) => {
      state.selectFile = action.payload
    },
    setSelectFolder: (state,action) => {
      state.selectFolder = action.payload
    },
    setRename: (state,action) => {
      const index = state.openFiles.findIndex(obj => obj.key === action.payload._id);
      if (index !== -1) {
        state.openFiles[index].name = action.payload.name;
      }
      if(state.tempFile !== null && state.tempFile.key === action.payload._id){
        state.tempFile.name = action.payload.name;
      }
    },
    setUndo: (state, action) => {
      state.isUndo = action.payload
    },
    setRedo: (state, action) => {
      state.isRedo = action.payload
    },
    setDownloadCanvas: (state, action) => {
      state.isDownloadCanvas = action.payload;
    },
    setDownloadContent: (state, action) => {
      state.isDownloadContent = action.payload;
    },
    setInitialCanvas: (state, action) => {
      state.isInitialCanvas = action.payload
    },
    setNodeSettingDlg: (state, action) => {
      state.isNodeSettingDlg = action.payload
    },
    setNodeMenu: (state, action) => {
      state.nodeMenu = action.payload
    },
  },
})

export const { setViewMode, onFileWndLoading, onFileWind, onObjectWnd, addOpenFiles, removeOpenFiles, setTempFile, setSelectFile, setSelectFolder, setRename, setUndo, setRedo, setDownloadCanvas, setDownloadContent, setInitialCanvas, setNodeSettingDlg, setNodeMenu } = PageSlice.actions

export default PageSlice.reducer