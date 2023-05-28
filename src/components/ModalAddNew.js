import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form'

const ModalAddNew = (props) => {

  const { show, handleClose } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleSaveUser = () => {
    console.log(">>> Check state: ", "Name = ", name, " job = ", job)
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value)
                  }} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Job</Form.Label>
                <Form.Control
                  type="text"
                  value={job}
                  onChange={(event) => {
                    setJob(event.target.value)
                  }}
                />
              </Form.Group>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handleSaveUser()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default ModalAddNew;