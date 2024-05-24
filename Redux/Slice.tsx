import {createSlice} from '@reduxjs/toolkit';

interface Idata {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface Imain {
  data: Idata[];
  status: 'Idle' | 'Loading' | 'Failed' | 'Success';
}
const initialState: Imain = {
  data: [],
  status: 'Idle',
};
const Slice = createSlice({
  name: 'Slice',
  initialState,
  reducers: {
    success: (state, action) => {
      state.data = action.payload;
      state.status = 'Success';
    },
    failed: state => {
      state.data = [];
      state.status = 'Failed';
    },
    loading: state => {
      state.data = [];
      console.log('Loading');
      state.status = 'Loading';
    },
  },
});
export const SliceReducer = Slice.reducer;

export const {success, failed, loading} = Slice.actions;
