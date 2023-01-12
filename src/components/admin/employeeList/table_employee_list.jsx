import {Helmet} from "react-helmet";
import React from "react";
import {useEffect, useState} from 'react'
import axiosInstance from "../../../utils/axiosConfig.js";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import EditEmployeeModal from "./edit_employee_modal";

import '/src/assets/css/datatables.css'
import '/src/assets/css/datatable-extension.css'
import '/src/assets/css/data-table.css'

function TableEmployeeList(props){
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [currentUserId, setCurrentUserId] = useState("")
    const [currentUserInfo, setCurrentUserInfo] = useState("")
    const closeDeleteModal = () => setDeleteModal(false);
    const clodeEditModal = () => setEditModal(false);
    const loadEmployeeList = () =>  props.getEmployeeList()
    function loadData(){
        if (typeof props.employeeList == "object"){
            var i = 0;
            $("#employeeTable").DataTable()
            $("#employeeTable").DataTable().rows().remove().draw();
            for (const c of props.employeeList){
                const ans = []
                var editButton = `<button data-id="${c.user_id}" class="editRow mx-1 btn btnLogin"><i style="font-size: 13px; line-height: 1" class="fa fa-pencil" data-id="${c.user_id}"></i></button>`
                var deleteButton = `<button data-id="${c.user_id}" class="deleteRow mx-1 btn btnLogin2"><i style="font-size: 13px; line-height: 1" class="fa fa-trash" data-id="${c.user_id}"></i></button>`
                ans.push(++i)
                ans.push(c.username)
                ans.push(c.full_name)
                ans.push(c.email)
                ans.push(c.phone)
                ans.push(`<div class="buttonRow d-flex">` + editButton + deleteButton + `</div>`)
                $("#employeeTable").DataTable().row.add(ans).draw(false)
            }
            
        }
    }
    function changeButton(e) {
        if (e.target.className == "deleteRow mx-1 btn btnLogin2" || e.target.className == "fa fa-trash") {
            event.target.dataset
            setCurrentUserId(event.target.getAttribute('data-id'))
            setDeleteModal(true)
        }
        if (e.target.className == "editRow mx-1 btn btnLogin" || e.target.className == "fa fa-pencil") {
            event.target.dataset
            var userId = event.target.getAttribute('data-id')
            setCurrentUserId(userId)
            axiosInstance.get(`/admin/employee/${userId}`).then((result)=>{
                if (result.data.isSuccess == true){
                    setCurrentUserInfo(result.data.user)
                    setEditModal(true)
                } else {
                    alert(result.data.message)
                }
            })
            .catch((err)=>{
                alert(err)
            })
        }
    }
    async function confirmDeleteUser() {
        setDeleteModal(false)
        await axiosInstance.delete(`/admin/employee/${currentUserId}`).then((result)=> {
            if (result.data.isSuccess == true){
                loadData()
                alert(result.data.message)
            }
            else{
                alert(result.data.message)
            }
        }).catch((err)=>{
            alert(err)
        })
        loadEmployeeList()
    }

    setTimeout(loadData, 200)
    
    return(
        <div className="row">
            {
                typeof props.employeeList == "object" &&
                    <div className="dt-ext table-responsive card-body" style={{fontFamily: "Jost", fontSize: "13px"}}>
                        <table id="employeeTable" className="display">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Username</th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody onClick={changeButton}>
                            </tbody>
                        </table>
                        <Modal show={deleteModal} onHide={closeDeleteModal} >
                            <Modal.Header>
                                <Modal.Title >
                                    <div style={{ fontSize: "20px"}} className="modalTitle">Delete Employee</div>
                                </Modal.Title>
                            </Modal.Header>

                            <Modal.Body >
                                <p className="modalContent" style={{ fontSize: "15px"}}>Are your sure want to delete this employee?</p>
                            </Modal.Body>

                            <Modal.Footer>
                                <button className="btn btn-light" onClick={closeDeleteModal} style={{fontFamily: "Jost"}}>Cancel</button>
                                <button className="btn btnLogin"  onClick={confirmDeleteUser} style={{fontFamily: "Jost"}}>Confirm</button>
                            </Modal.Footer>
                        </Modal>
                        {editModal && <EditEmployeeModal 
                            editModal={editModal} clodeEditModal={clodeEditModal} info={currentUserInfo} loadEmployeeList={loadEmployeeList}/>
                        }e
                        <Helmet>
                            <script src="/src/assets/js/datatables/jquery.dataTables.min.js"></script>
                            <script src="/src/assets/js/datatable-extension/dataTables.buttons.min.js"></script>
                            <script src="/src/assets/js/datatable-extension/buttons.colVis.min.js"></script>
                            <script src="/src/assets/js/datatable-extension/jszip.min.js"></script>
                            <script src="/src/assets/js/datatable-extension/pdfmake.min.js"></script>
                            <script src="/src/assets/js/datatable-extension/vfs_fonts.js"></script>
                            <script src="/src/assets/js/datatable-extension/dataTables.autoFill.min.js"></script>
                            <script src="/src/assets/js/datatable-extension/dataTables.select.min.js"></script>
                            <script src="/src/assets/js/datatable-extension/buttons.print.min.js"></script>
                            <script src="/src/assets/js/datatable-extension/buttons.html5.min.js"></script>
                            <script src="/src/assets/js/datatable-extension/dataTables.bootstrap4.min.js"></script>
                            <script src="/src/assets/js/datatable-extension/dataTables.responsive.min.js"></script>
                            <script src="/src/assets/js/datatable-extension/responsive.bootstrap4.min.js"></script>
                            <script src="/src/assets/js/datatable-extension/dataTables.keyTable.min.js"></script>
                            <script src="/src/assets/js/datatable-extension/custom.js"></script>
                        </Helmet>
                    </div>
            }
        </div>
    )
}
export default TableEmployeeList