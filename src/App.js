import { useState } from 'react';
import './App.scss';
import Header from './components/Header';

import Container from 'react-bootstrap/Container'
import { Routes, Route, Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';
import { useEffect } from 'react';
import AppRoutes from './routes/AppRoute';



function App() {

  const { user, loginContext } = useContext(UserContext)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      loginContext(localStorage.getItem('email'), localStorage.getItem('token'))
    }
  }, [])

  return (
    <>
      <div className='app-container'>

        {/*<Header />*/}
        <br></br>
        <Header />
        <Container>
          {/*<TableUsers/>*/}
          <AppRoutes />
        </Container>

      </div>

    </>
  );
}

export default App;
