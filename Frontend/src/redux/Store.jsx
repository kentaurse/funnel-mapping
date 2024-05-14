import { configureStore } from '@reduxjs/toolkit'
import user from 'src/redux/slices/UserSlice'
import page from 'src/redux/slices/PageSlice'
import node from 'src/redux/slices/NodeSlice'

export const Store = configureStore({
  reducer: {
    user,
    page,
    node
  },
})