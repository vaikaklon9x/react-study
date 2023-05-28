import { useState } from 'react';
import './App.scss';
import Header from './components/Header';

import TableUsers from './components/TableUser';
import Container from 'react-bootstrap/Container'


function App() {


  return (
    <>
      <div className='app-container'>
        <Header />
        <br></br>
        <Container>
          <TableUsers />
        </Container>

      </div>

    </>
  );
}

export default App;
