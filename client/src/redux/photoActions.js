import {
  GET_ALL_PHOTO_FAIL,
  GET_ALL_PHOTO_REQUEST,
  GET_ALL_PHOTO_SUCCESS,
  GET_PHOTO_BY_LABEL_FAIL,
  GET_PHOTO_BY_LABEL_REQUEST,
  GET_PHOTO_BY_LABEL_SUCCESS,
} from './constants';
import axios from 'axios';

export const getPhotos = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_PHOTO_REQUEST });

    const { data } = await axios.get('/api/unsplash-app/photo/all');

    dispatch({
      type: GET_ALL_PHOTO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_PHOTO_FAIL,
      payload: error.response.data,
    });
  }
};

export const getPhotoByLabel = (labelName) => async (dispatch) => {
  try {
    dispatch({ type: GET_PHOTO_BY_LABEL_REQUEST });

    const { data } = await axios.get(
      `/api/unsplash-app/photo/label/${labelName}`
    );

    dispatch({
      type: GET_PHOTO_BY_LABEL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PHOTO_BY_LABEL_FAIL,
      payload: error.response.data,
    });
  }
};
