import { createSlice } from '@reduxjs/toolkit'

export const UserSlice = createSlice(
    {

  name: 'counter',
  initialState: {
    value:JSON.parse(localStorage.getItem('user'))?JSON.parse(localStorage.getItem('user')):null,
  },
  reducers: {
    
    
    UserData: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { UserData } =UserSlice.actions

export default UserSlice.reducer