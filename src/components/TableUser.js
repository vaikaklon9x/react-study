import { useEffect, useState } from "react"
import { Table } from "react-bootstrap"

import { fetchAllUser } from "../services/UserService"
import ReactPaginate from 'react-paginate'
import ModalAddNew from './ModalAddNew'
import ModalEditUser from "./ModalEditUser"
import ModalConfirm from "./ModalConfirm"
import _ from 'lodash'
import { debounce } from "lodash"
import { CSVLink, CSVDownload } from "react-csv"
import './TableUser.scss'
import Papa from 'papaparse'


const TableUsers = (props) => {

  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false)
  const [dataUserEdit, setDataUserEdit] = useState({})

  const [isShowModalDelete, setIsShowModalDelete] = useState(false)
  const [dataUserDelete, setDataUserDelete] = useState({})

  const [sortBy, setSortBy] = useState("asc")
  const [sortField, setSortField] = useState("id")

  const [keyword, setKeyword] = useState("")
  const [dataExport, setDataExport] = useState([])

  const getUsers = async () => {
    let res = await fetchAllUser();

    if (res && res.data) {
      setListUsers(res.data)
      setTotalUsers(res.total)
      setTotalPages(res.total_pages)
    }
    console.log("check axios", res)

  }

  const handlePageClick = () => {

  }

  const handleClose = () => {
    setIsShowModalAddNew(false)
    setIsShowModalEdit(false)
    setIsShowModalDelete(false)
  }
  const handleUpdateTable = (user) => {
    setListUsers([user, ...listUsers])
  }
  const handleEditUser = (user) => {
    setDataUserEdit(user)
    setIsShowModalEdit(true)
  }

  const handleEditUserFromModal = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers)
    let index = listUsers.findIndex(item => item.id === user.id)
    cloneListUsers[index].first_name = user.first_name
    setListUsers(cloneListUsers)
  }

  const handleDeleteUser = (user) => {
    setIsShowModalDelete(true)
    setDataUserDelete(user)

  }

  const handleDeleteUserFromModal = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers)
    cloneListUsers = cloneListUsers.filter(item => item.id !== user.id)
    setListUsers(cloneListUsers)
  }

  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy)
    setSortField(sortField)

    let cloneListUsers = _.cloneDeep(listUsers)
    cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy])
    setListUsers(cloneListUsers)
    console.log(cloneListUsers)
  }

  const handleSearch = debounce((event) => {
    console.log(event.target.value)
    let term = event.target.value
    if (term) {
      let cloneListUsers = _.cloneDeep(listUsers)
      cloneListUsers = cloneListUsers.filter(item => item.email.includes(term))
      setListUsers(cloneListUsers)
    } else {
      getUsers(1)
    }
  }, 500)

  useEffect(() => {
    getUsers();
  }, [])



  const getUsersExport = (event, done) => {
    let result = []
    if (listUsers && listUsers.length > 0) {
      result.push(["Id", "Email", "First name", "Last name"])
      listUsers.map((item, index) => {
        let arr = []
        arr[0] = item.id
        arr[1] = item.email
        arr[2] = item.first_name
        arr[3] = item.last_name
        result.push(arr)
      })
      setDataExport(result)
      done()
    }
  }
  const handleImportCSV = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      let file = event.target.files[0]
      if (file.type !== 'text/csv') {
        alert('Error accept csv files...')
        return
      }
      console.log(file)
      Papa.parse(file, {
        //header: true,
        complete: function (results) {
          //console.log("Finished:", results.data)
          let rawCSV = results.data
          if (rawCSV.length > 0) {
            if (rawCSV[0] && rawCSV[0].length === 3) {
              if (rawCSV[0][0] !== 'email'
                || rawCSV[0][1] !== 'first_name'
                || rawCSV[0][2] !== 'last_name'
              ) {
                alert('Error header CSV.')
              } else {
                console.log(rawCSV)
                let result = []
                rawCSV.map((item, index) => {
                  if (index > 0 && item.length === 3) {
                    let obj = {}
                    obj.email = item[0]
                    obj.first_name = item[1]
                    obj.last_name = item[2]
                    result.push(obj)
                  }
                })
                setListUsers(result)
              }

            } else {
              alert('Error CSV file.')
            }
          }
        }
      })
    }

  }

  return (<>
    <div className="my-3 add-new d-sm-flex">
      <span>List users:</span>
      <div className="group-btns">
        <label htmlFor="Import" className="btn btn-warning">Import</label>
        <input id="Import" type="file" hidden onChange={(event) => handleImportCSV(event)} />
        <CSVLink
          filename={"Users.csv"}
          className="btn btn-primary"
          data={dataExport}
          asyncOnClick={true}
          onClick={getUsersExport}
        >Export</CSVLink>
        <button
          className="btn btn-success"
          onClick={() => setIsShowModalAddNew(true)}
        >
          <i className="fa-solid fa-circle-plus"></i>
          Add new user</button>
      </div>
    </div>
    <div className="col-sm-4 my-3">
      <input className="form-control" placeholder="Search user by email...."
        //value={keyword}
        onChange={(event) => handleSearch(event)}
      />
    </div>
    <br />
    <div className="customize-table">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <div className="sort-header">
                <span>ID</span>
                <span>
                  <i onClick={() => handleSort("desc", "id")} className="fa-solid fa-arrow-down"></i>
                  <i onClick={() => handleSort("asc", "id")} className="fa-solid fa-arrow-up"></i>
                </span>
              </div>
            </th>
            <th>Email</th>
            <th>
              <div className="sort-header">
                <span>First Name</span>
                <span>
                  <i onClick={() => handleSort("desc", "first_name")} className="fa-solid fa-arrow-down"></i>
                  <i onClick={() => handleSort("asc", "first_name")} className="fa-solid fa-arrow-up"></i>
                </span>
              </div>
            </th>
            <th>Last Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers && listUsers.length > 0 &&

            listUsers.map((item, index) => {
              return (
                <tr key={`users-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>
                    <button
                      className="btn btn-info mx-3"
                      onClick={() => handleEditUser(item)}>Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(item)}
                      className="btn btn-danger">Delete
                    </button>
                  </td>
                </tr>
              )
            })
          }

        </tbody>
      </Table>
    </div>
    <ReactPaginate
      breakLabel="..."
      nextLabel="next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={totalPages}
      previousLabel="< previous"

      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakClassName="page-item"
      breakLinkClassName="page-link"
      containerClassName="pagination"
      activeClassName="active"

    />
    <ModalAddNew
      show={isShowModalAddNew}
      handleClose={handleClose}
      handleUpdateTable={handleUpdateTable}
    />
    <ModalEditUser
      show={isShowModalEdit}
      dataUserEdit={dataUserEdit}
      handleClose={handleClose}
      handleEditUserFromModal={handleEditUserFromModal}

    />
    <ModalConfirm
      show={isShowModalDelete}
      handleClose={handleClose}
      dataUserDelete={dataUserDelete}
      handleDeleteUserFromModal={handleDeleteUserFromModal}
    />
  </>)
}
export default TableUsers