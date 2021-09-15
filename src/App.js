import React from 'react';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Routes from './routes'
import history from './services/history';

import { Router } from 'react-router-dom';

const App = (props) => {

  return (
    <>
      <Router history={history} >
        <Routes />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {props.children}
      </Router>
    </>
  );
}

export default App;
