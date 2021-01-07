import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPhotos,
  getPhotoByLabel,
  uploadPhotoByUrl,
  deletePhoto,
} from '../redux/photoActions';
import { Alert, Button } from 'react-bootstrap';
import PhotoComp from './PhotoComponent';
import Loader from './Loader';
import HeadingComponent from './HeadingComponent';
import PhotoLabelComp from './PhotoLabelComponent';
import AddPhotoComp from './AddPhotoComp';
import DeletePhotoComp from './DeletePhotoComp';

const PhotoGrid = () => {
  const dispatch = useDispatch();

  const [photoGrid, setPhotoGrid] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [photoLabel, setPhotoLabel] = useState(false);
  const [allPhoto, setAllPhoto] = useState(false);
  const [labelValue, setLabelValue] = useState('');
  const [urlValue, setUrlValue] = useState('');
  const [addPhotoForm, setAddPhotoForm] = useState(false);
  const [deletePhotoForm, setDeletePhotoForm] = useState(false);
  const [photoID, setPhotoID] = useState('');
  const [deletePassword, setDeletePassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [scrollPosition, setScrollPosition] = useState(0);

  const labelRef = useRef(null);
  const urlRef = useRef(null);
  const pwdRef = useRef(null);

  const { error, loading, photoArray } = useSelector(
    (state) => state.allPhotos
  );

  const {
    error: errorPhotoByLabel,
    loading: loadingPhotoByLabel,
    photoByLabelArray,
  } = useSelector((state) => state.photoByLabel);

  const { error: uploadError } = useSelector((state) => state.uploadedPhoto);

  const DeleteBtnControl = (e) => {
    setDeletePhotoForm(true);
    setPhotoID(e.target.id);
    document.querySelector('body').style.background = '#bfbfbf';
    document.querySelector('body').style.overflow = 'hidden';
  };

  const hideDeleteFormHandler = () => {
    setDeletePhotoForm(false);
    document.querySelector('body').style.background = '#fff';
    document.querySelector('body').style.overflow = 'visible';
  };

  let displayPhoto;
  if (photoGrid.length !== 0) {
    displayPhoto = (
      <div className='PhotoGridContainer'>
        {photoGrid.slice(0, 7).map((photo, index) => (
          <PhotoComp
            key={index}
            classType={`c${index + 1}`}
            imgSrc={photo.imageLink}
            photoLabel={photo.label}
            DeleteBtnControl={DeleteBtnControl}
            photoID={photo._id}
          />
        ))}
      </div>
    );
  }

  let photoByLabel;
  if (photoByLabelArray) {
    photoByLabel = (
      <div>
        <Button onClick={() => window.location.reload()} variant='outline-dark'>
          Go Back
        </Button>
        <div className='PhotoByLabelContainer'>
          {photoByLabelArray.map((photo) => (
            <PhotoLabelComp key={photo._id} imgSrc={photo.imageLink} />
          ))}
        </div>
      </div>
    );
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

  const deleteBtnHandler = () => {
    if (deletePassword === process.env.REACT_APP_DELETE_PWD) {
      dispatch(deletePhoto(photoID));
      setDeletePhotoForm(false);
      pwdRef.current.value = '';
      window.location.reload();
    } else {
      setPasswordError(
        'You need to have admin password to perform this action'
      );
    }
  };

  const passwordValueHandler = (e) => {
    setDeletePassword(e.target.value);
  };

  const labelValueHandler = (e) => {
    setLabelValue(e.target.value);
  };

  const urlValueHandler = (e) => {
    setUrlValue(e.target.value);
  };

  const showFormHandler = () => {
    setAddPhotoForm(true);
    document.querySelector('body').style.background = '#bfbfbf';
    document.querySelector('body').style.overflow = 'hidden';
  };

  const hideFormHandler = () => {
    setAddPhotoForm(false);
    document.querySelector('body').style.background = '#fff';
    document.querySelector('body').style.overflow = 'visible';
  };

  // console.log(scrollPosition);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
      {addPhotoForm ? (
        <AddPhotoComp
          submitBtnHandler={addPhotoHandler}
          labelValue={labelValueHandler}
          urlValue={urlValueHandler}
          labelRef={labelRef}
          urlRef={urlRef}
          hideForm={hideFormHandler}
          uploadError={uploadError}
        />
      ) : null}
      {deletePhotoForm ? (
        <DeletePhotoComp
          hideForm={hideDeleteFormHandler}
          DeleteBtnHandler={deleteBtnHandler}
          passwordValue={passwordValueHandler}
          passwordRef={pwdRef}
          pwdError={passwordError}
          scrollPosition={scrollPosition}
        />
      ) : null}
    </>
  );
};

export default PhotoGrid;
