import {configureStore} from '@reduxjs/toolkit';
import {SliceReducer, success} from './Slice';
import {Alert} from 'react-native';

function customMiddleWare(store: any) {
  return function (next: (arg0: any) => void) {
    return function (action: any) {
      makeApiCall(store, action);
      next(action);
    };
  };
}

const Store = configureStore({
  reducer: {
    SliceReducer,
  },
  middleware: getDefaultMiddleWare =>
    getDefaultMiddleWare().concat(customMiddleWare),
});

async function makeApiCall(
  store: {dispatch: (arg0: {payload: any; type: 'Slice/success'}) => void},
  action: {type: string | string[]},
) {
  if (action.type.includes('loading')) {
    try {
      let apicall = await fetch('https://jsonplaceholder.typicode.com/todos');
      let res = await apicall.json();
      store.dispatch(success(res));
    } catch (error) {
      Alert.alert(`${error}`);
    }
  }
}
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof Store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof Store.dispatch;

export default Store;
