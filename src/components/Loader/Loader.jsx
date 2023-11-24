import React from 'react';
import css from './Loader.module.css';
import { RotatingSquare } from 'react-loader-spinner';

function Loader() {
  return (
    <RotatingSquare
      height="100"
      width="100"
      color="#3e18bb"
      ariaLabel="rotating-square-loading"
      strokeWidth="4"
      wrapperStyle={{}}
      wrapperClass={css.RotatingSquare}
      visible={true}
    />
  );
}

export default Loader;
