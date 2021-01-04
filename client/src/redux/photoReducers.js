import {
  GET_ALL_PHOTO_FAIL,
  GET_ALL_PHOTO_REQUEST,
  GET_ALL_PHOTO_SUCCESS,
  GET_PHOTO_BY_LABEL_FAIL,
  GET_PHOTO_BY_LABEL_REQUEST,
  GET_PHOTO_BY_LABEL_SUCCESS,
} from './constants';

export const getPhotosReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_PHOTO_REQUEST:
      return { ...state, loading: true };
    case GET_ALL_PHOTO_SUCCESS:
      return {
        ...state,
        loading: false,
        photoArray: action.payload,
      };
    case GET_ALL_PHOTO_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getPhotoByLabelReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PHOTO_BY_LABEL_REQUEST:
      return { ...state, loading: true };
    case GET_PHOTO_BY_LABEL_SUCCESS:
      return {
        ...state,
        loading: false,
        photoByLabelArray: action.payload,
      };
    case GET_PHOTO_BY_LABEL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
