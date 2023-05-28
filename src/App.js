import { useState } from 'react';
import './App.scss';
import Header from './components/Header';
import ModalAddNew from './components/ModalAddNew';
import TableUsers from './components/TableUser';
import Container from 'react-bootstrap/Container'

function App() {

  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const handleClose = () => {
    setIsShowModalAddNew(false);
  }

  return (
    <div className='app-container'>
      <Header />
      <br></br>
      <Container>
        <div className="my-3 add-new">
          <span>List users:</span>
          <button
            className="btn btn-primary"
            onClick={() => setIsShowModalAddNew(true)}
          >
            Add new user</button>
        </div>
        <TableUsers />
      </Container>
      <ModalAddNew
        show={isShowModalAddNew}
        handleClose={handleClose}
      />
    </div>
  );
}

export default App;
