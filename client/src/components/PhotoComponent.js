import React from 'react';

const PhotoComponent = ({ imgSrc, classType }) => {
  return (
    <>
      <div
        className={`Cell ${classType}`}
        style={{ backgroundImage: `url(${imgSrc})` }}
      ></div>
    </>
  );
};

export default PhotoComponent;
