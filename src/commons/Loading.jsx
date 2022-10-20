import { Triangle } from 'react-loader-spinner';
import React from 'react';

export default function Loading({ color }) {
  return (
    <Triangle
      height='40'
      width='40'
      color={color || '#333333'}
      ariaLabel='triangle-loading'
      wrapperStyle={{}}
      wrapperClassName=''
      visible={true}
    />
  );
}
