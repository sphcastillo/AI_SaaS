import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';

// this is the redux store. It takes all the reducers from the 'Slice' files and exports them.
export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
