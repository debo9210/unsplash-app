import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPhotos,
  getPhotoByLabel,
  uploadPhotoByUrl,
} from '../redux/photoActions';
import { Alert, Button } from 'react-bootstrap';
import PhotoComp from './PhotoComponent';
import Loader from './Loader';
import HeadingComponent from './HeadingComponent';
import PhotoLabelComp from './PhotoLabelComponent';
import AddPhotoComp from './AddPhotoComp';

const PhotoGrid = () => {
  const dispatch = useDispatch();

  const [photoGrid, setPhotoGrid] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [photoLabel, setPhotoLabel] = useState(false);
  const [allPhoto, setAllPhoto] = useState(false);
  const [labelValue, setLabelValue] = useState('');
  const [urlValue, setUrlValue] = useState('');

  const [addPhotoForm, setAddPhotoForm] = useState(false);

  const labelRef = useRef(null);
  const urlRef = useRef(null);

  const { error, loading, photoArray } = useSelector(
    (state) => state.allPhotos
  );

  const {
    error: errorPhotoByLabel,
    loading: loadingPhotoByLabel,
    photoByLabelArray,
  } = useSelector((state) => state.photoByLabel);

  const { error: uploadError } = useSelector((state) => state.uploadedPhoto);

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

  let photoByLabel;
  if (photoByLabelArray) {
    photoByLabel = photoByLabelArray.map((photo) => (
      <div>
        <Button onClick={() => window.location.reload()} variant='outline-dark'>
          Go Back
        </Button>
        <div className='PhotoByLabelContainer'>
          <PhotoLabelComp key={photo._id} imgSrc={photo.imageLink} />
        </div>
      </div>
    ));
  }

  const inputValueHandler = (e) => {
    setInputValue(e.target.value);
  };

  const getPhotoByLabelHandler = (e) => {
    dispatch(getPhotoByLabel(inputValue));
    e.target.value = '';
    setAllPhoto(false);
    setPhotoLabel(true);
  };

  const addPhotoHandler = () => {
    dispatch(uploadPhotoByUrl(labelValue, urlValue));
    labelRef.current.value = '';
    urlRef.current.value = '';
    setLabelValue('');
    setUrlValue('');
  };

  const labelValueHandler = (e) => {
    setLabelValue(e.target.value);
  };

  const urlValueHandler = (e) => {
    setUrlValue(e.target.value);
  };

  const showFormHandler = () => {
    setAddPhotoForm(true);
  };

  const hideFormHandler = () => {
    setAddPhotoForm(false);
  };

  // const getPhotoLabel = (e) => {
  //   if (e.keyCode === 13) {
  //     dispatch(getPhotoByLabel(inputValue));
  //     e.target.value = '';
  //   }
  // };

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
    setAllPhoto(true);
    setPhotoLabel(false);
  }, [dispatch]);

  return (
    <>
      <HeadingComponent
        getInputValue={inputValueHandler}
        getPhotoByLabelHandler={getPhotoByLabelHandler}
        showForm={showFormHandler}
      />
      {error && (
        <Alert
          variant='danger'
          onClose={() => window.location.reload()}
          dismissible
          className='ErrorAlert'
        >
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>{error.fileError}</p>
        </Alert>
      )}
      {errorPhotoByLabel && (
        <Alert
          variant='danger'
          className='ErrorAlert'
          onClose={() => window.location.reload()}
          dismissible
        >
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>{errorPhotoByLabel.imageError}</p>
        </Alert>
      )}
      {loading || loadingPhotoByLabel ? <Loader /> : null}
      {allPhoto ? displayPhoto : photoLabel ? photoByLabel : null}
      {/* {addPhotoForm ? (
        <AddPhotoComp
          submitBtnHandler={addPhotoHandler}
          labelValue={labelValueHandler}
          urlValue={urlValueHandler}
          labelRef={labelRef}
          urlRef={urlRef}
          hideForm={hideFormHandler}
          uploadError={uploadError}
        />
      ) : null} */}
    </>
  );
};

export default PhotoGrid;
