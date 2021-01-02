import React from 'react';

const PhotoGrid = () => {
  return (
    <div className='PhotoGridContainer'>
      <div className='LeftPhotoGridContainer'>
        <div className='PhotoGrid green'></div>
        <div className='PhotoGrid purple'></div>
        <div className='PhotoGrid orange'></div>
      </div>

      <div className='CenterPhotoGridContainer'>
        <div className='PhotoGrid tomato'></div>
        <div className='PhotoGrid blue'></div>
      </div>

      <div className='RightPhotoGridContainer'>
        <div className='PhotoGrid yellow'></div>
        <div className='PhotoGrid pink'></div>
      </div>
    </div>
  );
};

export default PhotoGrid;
