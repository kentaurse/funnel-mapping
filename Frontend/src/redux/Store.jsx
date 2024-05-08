import { configureStore } from '@reduxjs/toolkit'
import user from 'src/redux/slices/UserSlice'

export const Store = configureStore({
  reducer: {
    user,
  },
})