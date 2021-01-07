import React from 'react';

const PhotoComponent = ({
  imgSrc,
  classType,
  photoLabel,
  DeleteBtnControl,
  photoID,
}) => {
  const ShowDeleteHandler = (e) => {
    if (e.target.className === 'MouseOver') {
      e.target.firstChild.firstChild.style.display = 'block';
      e.target.lastChild.style.display = 'block';
    }
  };

  const HideDeleteHandler = (e) => {
    if (e.target.className === 'MouseOver') {
      e.target.firstChild.firstChild.style.display = 'none';
      e.target.lastChild.style.display = 'none';
    }
  };

  return (
    <>
      <div
        className={`Cell ${classType}`}
        style={{ backgroundImage: `url(${imgSrc})` }}
        onMouseEnter={ShowDeleteHandler}
        onMouseLeave={HideDeleteHandler}
      >
        <div className='MouseOver'>
          <div className='PhotoTextContainer'>
            <p className='PhotoText'>{photoLabel}</p>
          </div>

          <div className='DeleteBtnContainer'>
            <button
              onClick={DeleteBtnControl}
              className='DeleteBtn'
              id={photoID}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PhotoComponent;
