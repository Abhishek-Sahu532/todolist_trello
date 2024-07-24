import {configureStore} from '@reduxjs/toolkit'
import taskSlice from './Reducers/taskSlice'
import userSlice from './Reducers/userSlice'

export const store = configureStore({
  reducer : {
    tasks : taskSlice,
    user : userSlice
  }
})

