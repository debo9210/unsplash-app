import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPhotos, getPhotoByLabel } from '../redux/photoActions';
import PhotoComp from './PhotoComponent';
import Loader from './Loader';
import HeadingComponent from './HeadingComponent';

const PhotoGrid = () => {
  const dispatch = useDispatch();

  const [photoGrid, setPhotoGrid] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const { error, loading, photoArray } = useSelector(
    (state) => state.allPhotos
  );

  let displayPhoto;
  if (photoGrid.length !== 0) {
    displayPhoto = (
      <div className='PhotoGridContainer'>
        {/* <div className='Cell c1'></div> */}
        <PhotoComp classType='c1' imgSrc={photoGrid[0].imageLink} />
        <PhotoComp classType='c2' imgSrc={photoGrid[1].imageLink} />
        <PhotoComp classType='c3' imgSrc={photoGrid[2].imageLink} />
        <PhotoComp classType='c4' imgSrc={photoGrid[3].imageLink} />
        <PhotoComp classType='c5' imgSrc={photoGrid[4].imageLink} />
        <PhotoComp classType='c6' imgSrc={photoGrid[5].imageLink} />
        <PhotoComp classType='c7' imgSrc={photoGrid[6].imageLink} />
      </div>
    );
  }

  const inputValueHandler = (e) => {
    setInputValue(e.target.value);
  };

  const getPhotoByLabelHandler = (e) => {
    dispatch(getPhotoByLabel(inputValue));
    e.target.value = '';
  };

  const getPhotoLabel = (e) => {
    if (e.keyCode === 13) {
      dispatch(getPhotoByLabel(inputValue));
      e.target.value = '';
    }
  };

  useEffect(() => {
    let reverse;
    if (photoArray) {
      reverse = photoArray.reverse();
      // console.log(reverse[0].imageLink);
      setPhotoGrid(reverse);
    }
  }, [photoArray]);

  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  return (
    <>
      <HeadingComponent
        getInputValue={inputValueHandler}
        getPhotoByLabelHandler={getPhotoByLabelHandler}
        getPhotoLabel={getPhotoLabel}
      />
      {loading ? <Loader /> : displayPhoto}
    </>
  );
};

export default PhotoGrid;
