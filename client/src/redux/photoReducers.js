import {
  DELETE_PHOTO_FAIL,
  DELETE_PHOTO_REQUEST,
  DELETE_PHOTO_SUCCESS,
  GET_ALL_PHOTO_FAIL,
  GET_ALL_PHOTO_REQUEST,
  GET_ALL_PHOTO_SUCCESS,
  GET_PHOTO_BY_LABEL_FAIL,
  GET_PHOTO_BY_LABEL_REQUEST,
  GET_PHOTO_BY_LABEL_SUCCESS,
  UPLOAD_PHOTO_BY_URL_FAIL,
  UPLOAD_PHOTO_BY_URL_REQUEST,
  UPLOAD_PHOTO_BY_URL_SUCCESS,
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

export const uploadPhotoReducer = (state = {}, action) => {
  switch (action.type) {
    case UPLOAD_PHOTO_BY_URL_REQUEST:
      return { ...state, loading: true };
    case UPLOAD_PHOTO_BY_URL_SUCCESS:
      return {
        ...state,
        loading: false,
        upload: action.payload,
      };
    case UPLOAD_PHOTO_BY_URL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const deletePhotoReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PHOTO_REQUEST:
      return { ...state, loading: true };
    case DELETE_PHOTO_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case DELETE_PHOTO_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
