import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  getPhotosReducer,
  getPhotoByLabelReducer,
  uploadPhotoReducer,
} from './redux/photoReducers';

const reducers = combineReducers({
  allPhotos: getPhotosReducer,
  photoByLabel: getPhotoByLabelReducer,
  uploadedPhoto: uploadPhotoReducer,
});
const initialState = {};

const middleware = [thunk];

const devTools =
  process.env.NODE_ENV === 'production'
    ? applyMiddleware(...middleware)
    : composeWithDevTools(applyMiddleware(...middleware));

const store = createStore(reducers, initialState, devTools);

export default store;
