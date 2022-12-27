import React,{useState,useEffect} from "react";
import numeral from "numeral";
import {Helmet} from "react-helmet";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {formateDateTime, formatMoney} from "../../redux/helper_functions.jsx";
import axiosInstance from "../../../utils/axiosConfig.js";

import '/src/assets/css/datatables.css';
import '/src/assets/css/datatable-extension.css';
import '/src/assets/css/data-table.css';

function TableDebtListSelf(props){
    const userId = localStorage.solarBanking_userId;
    const [reasonCancel,setReasonCancel] = useState("");
    const [debtListSelf,setDebtListSelf] = useState([]);
    const [showDeleteModal,setShowDeleteModal] = useState({
        isShow: false,
        debt_id: null
    });

    const handleOnChangeReason = (e)=>{
        setReasonCancel(e.target.value);
    }
    const handleCloseDeleteModal = ()=>{
        setShowDeleteModal({
            isShow: false,
            debt_id: null
        })
    }
    const handleSubmitDeleteModal = ()=>{
        axiosInstance.delete(`/debtList/cancelDebt/${showDeleteModal.debt_id}`,{
            user_id: userId,
            debt_cancel_message: reasonCancel,
        })
            .then((res)=>{
                setDebtListSelf(debtListSelf.filter(debt => debt.debt_id !== showDeleteModal.debt_id))
                handleCloseDeleteModal();
            })
            .catch((err)=>{
                console.log(err);
            })
    }

    useEffect(function (){
        const buttonComponent = `
            <div class="d-flex">
                <button class="btn btn-info btn-edit">
                    <i class="fa fa-pencil"></i>
                </button>
                <button class="btn btn-danger ml-2 btn-delete">
                    <i class="fa fa-trash"></i>
                </button>
            </div>
        `;
        if (typeof props.debtListSelf == "object"){
            $("#paidDebtSelf").DataTable().rows().remove().draw();
            for (const c of props.debtListSelf) {
                const ans = [];
                ans.push(c.id)
                ans.push(c.debt_account_number)
                ans.push(formatMoney(c.debt_amount) + " VND")
                ans.push(formateDateTime(c.debt_created_at))
                ans.push(c.debt_status)
                ans.push(buttonComponent)
                $("#paidDebtSelf").DataTable().rows.add(ans).draw(false);
            }
            const deleteBtnArr = document.getElementsByClassName('btn-delete');
            for (let i = 0; i < deleteBtnArr.length; i++)
                deleteBtnArr[i].addEventListener('click', function(e) {
                    setShowDeleteModal({
                        isShow: true,
                        debt_id: props.debtListSelf[i].debt_id
                    });
                });
        }
    },[]);

    return (
        typeof props.debtListSelf == "object" &&
        <div className="table-responsive">
            <table id="paidDebtSelf" className="display">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Account Number</th>
                    <th>Amount</th>
                    <th>Create Date</th>
                    <th>Status</th>
                    <th></th>
                </tr>
                </thead>

                <tbody>
                </tbody>
            </table>
            <Modal onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Canceling Debt</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Reason (*)</Form.Label>
                            <Form.Control as="textarea" rows={3} onChange={handleOnChangeReason}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmitDeleteModal}>
                        Submit
                    </Button>
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

    )
}

export default TableDebtListSelf