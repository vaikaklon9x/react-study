import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { putUpdateUser } from "../services/UserService"


const ModalEditUser = (props) => {

    const { show, handleClose, dataUserEdit, handleEditUserFromModal } = props;
    const [name, setName] = useState("");
    const [job, setJob] = useState("");

    /*const handleSaveUser = async () => {
        let res = await postCreateUser(name, job)
        console.log(">>> Check state: ", "Name = ", name, " job = ", job)
        if (res && res.id) {
            handleClose()
            setName('')
            setJob('')
            handleUpdateTable({ first_name: name, id: res.id })
            //success
        }
        else {
            //error 
        }
    }*/

    const handleEditUser = async () => {
        let res = await putUpdateUser(name, job)
        if (res && res.updatedAt) {
            handleEditUserFromModal({
                first_name: name,
                id: dataUserEdit.id,
            })
            handleClose()
            //success
        } else {
            //error
        }
        console.log(res)
    }

    useEffect(() => {
        if (show) {
            setName(dataUserEdit.first_name)
        }
    }, [dataUserEdit])


    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit a user</Modal.Title>
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
                        onClick={() => handleEditUser()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalEditUser;