import React from 'react';

const PhotoLabelComponent = ({ imgSrc }) => {
  return (
    <div
      className='PhotoByLabel'
      style={{ backgroundImage: `url(${imgSrc})` }}
    ></div>
  );
};

export default PhotoLabelComponent;
