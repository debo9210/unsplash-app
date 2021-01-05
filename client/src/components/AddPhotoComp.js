import React from 'react';
import { Form, Button } from 'react-bootstrap';

const AddPhotoComp = ({
  submitBtnHandler,
  labelValue,
  urlValue,
  labelRef,
  urlRef,
  hideForm,
  uploadError,
}) => {
  return (
    <div className='AddPhotoContainer'>
      <h3 className='AddPhotoHeading'>Add a new photo</h3>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Group>
          <Form.Label className='PhotoLabel'>Label</Form.Label>
          <Form.Control type='text' onChange={labelValue} ref={labelRef} />
          <small className='ErrorText'>
            {uploadError ? uploadError.label : null}
          </small>
        </Form.Group>

        <Form.Group>
          <Form.Label className='PhotoLabel'>Photo URL</Form.Label>
          <Form.Control type='text' onChange={urlValue} ref={urlRef} />
          <small className='ErrorText'>
            {uploadError ? uploadError.photoUrl : null}
          </small>
        </Form.Group>
        <div className='BtnGroup'>
          <Button onClick={hideForm} variant='light'>
            Cancel
          </Button>
          <Button
            onClick={submitBtnHandler}
            className='SubmitBtn'
            variant='success'
            type='submit'
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddPhotoComp;
