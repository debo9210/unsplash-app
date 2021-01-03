import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UnsplashLogo from '../svg/my_unsplash_logo.svg';
import searchIcon from '../svg/search-black-18dp.svg';
import { getPhotoByLabel } from '../redux/photoActions';

const HeadingComponent = () => {
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState('');

  const getPhotoByLabelHandler = () => {
    dispatch(getPhotoByLabel(inputValue));
  };

  return (
    <>
      <header className='HeadingContainer'>
        <div className='BrandContainer'>
          <img src={UnsplashLogo} alt='Brand' className='Brand' />
        </div>
        <div className='InputGroup'>
          <div>
            <input
              type='text'
              placeholder='Search by name'
              className='SearchInput'
              style={{ backgroundImage: `url(${searchIcon})` }}
              onChange={(e) => setInputValue(e.target.value)}
              onBlur={getPhotoByLabelHandler}
            />
          </div>
          <button className='AddPhotoBtn'>Add a photo</button>
        </div>
      </header>
    </>
  );
};

export default HeadingComponent;
