import {
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

export const uploadPhotoByUrl = (labelValue, urlValue) => (dispatch) => {
  const formUrlEncoded = (x) =>
    Object.keys(x).reduce(
      (p, c) => p + `&${c}=${encodeURIComponent(x[c])}`,
      ''
    );
  dispatch({ type: UPLOAD_PHOTO_BY_URL_REQUEST });

  axios({
    method: 'POST',
    url: '/api/unsplash-app/photo/byUrl',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: formUrlEncoded({
      label: labelValue,
      photoUrl: urlValue,
    }),
  })
    .then((response) =>
      dispatch({
        type: UPLOAD_PHOTO_BY_URL_SUCCESS,
        payload: response.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: UPLOAD_PHOTO_BY_URL_FAIL,
        payload: error.response.data,
      })
    );
};
