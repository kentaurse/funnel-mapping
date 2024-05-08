import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userName: null,
  userEmail: null,
}

export const UserSlice = createSlice({
  name: 'UserSlice',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userName = action.payload.name;
      state.userEmail = action.payload.email;
    }
  },
})

export const { setUser } = UserSlice.actions

export default UserSlice.reducer