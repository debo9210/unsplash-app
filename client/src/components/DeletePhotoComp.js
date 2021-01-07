import React from 'react';
import { Form, Button } from 'react-bootstrap';

const DeletePhotoComp = ({
  hideForm,
  DeleteBtnHandler,
  passwordValue,
  passwordRef,
  pwdError,
  scrollPosition,
}) => {
  return (
    <div
      className='DeletePhotoContainer'
      style={{ top: `${scrollPosition + 150}px` }}
    >
      <h3 className='AddPhotoHeading'>Are you sure?</h3>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Group>
          <Form.Label className='PhotoLabel'>Password</Form.Label>
          <Form.Control
            type='password'
            onChange={passwordValue}
            ref={passwordRef}
          />
          <small className='ErrorText'>{pwdError ? pwdError : null}</small>
        </Form.Group>

        <div className='BtnGroup'>
          <Button onClick={hideForm} variant='light'>
            Cancel
          </Button>
          <Button
            onClick={DeleteBtnHandler}
            className='SubmitBtn'
            variant='danger'
            type='submit'
          >
            Delete
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default DeletePhotoComp;
