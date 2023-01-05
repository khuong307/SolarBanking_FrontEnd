import {Helmet} from "react-helmet";
import React from "react";
import {useEffect, useState} from 'react'
import axiosInstance from "../../../utils/axiosConfig.js";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '/src/assets/css/datatables.css'
import '/src/assets/css/datatable-extension.css'
import '/src/assets/css/data-table.css'
function TableEmployeeList(props){
    const [modalShow, setModalShow] = useState(false);
    const [currentUserId, setCurrentUserId] = useState("")
    const handleClose = () => setModalShow(false);
    function loadData(){
        if (typeof props.employeeList == "object"){
            var i = 0;
            $("#employeeTable").DataTable().rows().remove().draw();
            for (const c of props.employeeList){
                const ans = []
                var deleteButton = `<div data-id="${c.user_id}" class="deleteRow" style="background: #ff5370; color: white; height: 30px; width: 30px; border: 1px solid black; border-radius: 10%; display: flex; justify-content: center; align-items: center"><i style="font-size: 18px; line-height: 1" class="fa fa-trash" data-id="${c.user_id}"></i></div>`
                ans.push(++i)
                ans.push(c.username)
                ans.push(c.full_name)
                ans.push(c.email)
                ans.push(c.phone)
                ans.push(deleteButton)
                $("#employeeTable").DataTable().row.add(ans).draw(false)
            }
        }
    }
    function deleteUser(e) {
        if (e.target.className == "deleteRow" || e.target.className == "fa fa-trash") {
            event.target.dataset
            setCurrentUserId(event.target.getAttribute('data-id'))
            setModalShow(true)
        }
            
    }
    async function confirmDeleteUser() {
        setModalShow(false)
        await axiosInstance.delete(`/admin/employee/${currentUserId}`, {
            headers: {
                access_token: localStorage.getItem("solarBanking_accessToken"),
                refresh_token: localStorage.getItem("solarBanking_refreshToken"),
            }
        }).then((result)=> {
            if (result.data.isSuccess == true){
                loadData()
            }
            else{
                alert(result.data.message)
            }
        }).catch((err)=>{
            alert(err)
        })
        props.getEmployeeList()
    }
    setTimeout(loadData, 500)
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
                            <tbody onClick={deleteUser}>
                            </tbody>
                        </table>
                        <Modal show={modalShow} onHide={handleClose} >
                            <Modal.Header closeButton>
                                <Modal.Title >
                                    <p style={{ fontSize: "20px"}} className="modalTitle">Delete Employee</p>
                                </Modal.Title>
                            </Modal.Header>

                            <Modal.Body >
                                <p className="modalContent" style={{ fontSize: "15px"}}>Are your sure want to delete this employee?</p>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>Close</Button>
                                <Button variant="primary"  onClick={confirmDeleteUser}>Save changes</Button>
                            </Modal.Footer>
                        </Modal>
                        
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