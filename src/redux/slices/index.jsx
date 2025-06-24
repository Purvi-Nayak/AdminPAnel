import { combineReducers } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import taskSlice from './taskSlice'

const rootReducer = combineReducers({
  users: userSlice,
  tasks: taskSlice
});

export default rootReducer;