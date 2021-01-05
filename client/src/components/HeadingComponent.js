import React from 'react';

import UnsplashLogo from '../svg/my_unsplash_logo.svg';
import searchIcon from '../svg/search-black-18dp.svg';

const HeadingComponent = ({
  getInputValue,
  getPhotoByLabelHandler,
  showForm,
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
              placeholder='Search by label'
              className='SearchInput'
              style={{ backgroundImage: `url(${searchIcon})` }}
              onChange={getInputValue}
              onBlur={getPhotoByLabelHandler}
            />
          </div>
          <button onClick={showForm} className='AddPhotoBtn'>
            Add a photo
          </button>
        </div>
      </header>
    </>
  );
};

export default HeadingComponent;
