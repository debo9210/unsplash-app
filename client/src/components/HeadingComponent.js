import React from 'react';

import UnsplashLogo from '../svg/my_unsplash_logo.svg';
import searchIcon from '../svg/search-black-18dp.svg';

const HeadingComponent = ({
  getInputValue,
  getPhotoByLabelHandler,
  getPhotoLabel,
}) => {
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
              onChange={getInputValue}
              onBlur={getPhotoByLabelHandler}
              onKeyDown={getPhotoLabel}
            />
          </div>
          <button className='AddPhotoBtn'>Add a photo</button>
        </div>
      </header>
    </>
  );
};

export default HeadingComponent;
