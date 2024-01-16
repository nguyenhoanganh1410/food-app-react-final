import React from 'react';
import ReactLoading from 'react-loading';
import './LoadingPageStyle.scss'

const LoadingPage = () => {
  return (
    <div className='loading-page'>
      <ReactLoading type='spin' color='white' height={46} width={46} />
    </div>
  );
};

export default LoadingPage;
