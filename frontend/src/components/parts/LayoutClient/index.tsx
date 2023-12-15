'use client';

import React from 'react';

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const LayoutClient = () => (
  <ToastContainer
    position="top-center"
    autoClose={5000}
    closeOnClick
    draggable
    pauseOnHover
    pauseOnFocusLoss={false}
    hideProgressBar
  />
);

export default LayoutClient;
