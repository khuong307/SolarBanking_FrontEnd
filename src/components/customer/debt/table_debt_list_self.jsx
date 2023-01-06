import React,{useState,useEffect} from "react";
import numeral from "numeral";
import {Helmet} from "react-helmet";
import { Modal, Button } from 'antd';
import {useNavigate} from "react-router-dom";
import {formateDateTime, formatMoney} from "../../redux/helper_functions.jsx";
import axiosInstance from "../../../utils/axiosConfig.js";

import '/src/assets/css/datatables.css';
import '/src/assets/css/datatable-extension.css';
import '/src/assets/css/data-table.css';

function TableDebtListSelf(props){
    const navigate = useNavigate();
    const debtListSelf = props.debtListSelf;
    const userId = localStorage.solarBanking_userId;
    const [reasonCancel,setReasonCancel] = useState("");
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
                //setDebtListSelf(debtListSelf.filter(debt => debt.debt_id !== showDeleteModal.debt_id))
                handleCloseDeleteModal();
            })
            .catch((err)=>{
                console.log(err);
            })
    }
    function loadData(){
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

        if (Array.isArray(debtListSelf)) {
            if (debtListSelf.length > 0) {
                $("#paidDebtSelf").DataTable().rows().remove().draw();
                debtListSelf.forEach((debt, debtIdx) => {
                    const ans = [];
                    ans.push(debtIdx + 1)
                    ans.push(debt.debtor_fullname)
                    ans.push(debt.debt_account_number)
                    ans.push(formatMoney(debt.debt_amount) + " VND")
                    ans.push(formateDateTime(debt.debt_created_at))
                    ans.push(debt.debt_status)
                    ans.push(buttonComponent)
                    $("#paidDebtSelf").DataTable().row.add(ans).draw(false);
                });
                const deleteBtnArr = document.getElementsByClassName('btn-delete');
                for (let i = 0; i < deleteBtnArr.length; i++)
                    deleteBtnArr[i].addEventListener('click', function(e) {
                        setShowDeleteModal({
                            isShow: true,
                            debt_id: props.debtListSelf[i].debt_id
                        });
                    });
                const detailBtnArr = document.getElementsByClassName('btn-edit');
                for (let i = 0; i < detailBtnArr.length; i++)
                    detailBtnArr[i].addEventListener('click', function(e) {
                        navigate(`details/${props.debtListSelf[i].debt_id}`)
                    });
            }
        }
    }
    setTimeout(loadData, 500)

    return (
        <div className="table-responsive">
            <table id="paidDebtSelf" className="display">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Debtor</th>
                    <th scope="col">Debt Account Number</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Create Date</th>
                    <th scope="col">Status</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
            <Modal title="Cancel Debt" style={{fontFamily: "Jost"}}
                   centered
                   open={showDeleteModal.isShow}
                   onOk={handleCloseDeleteModal}
                   onCancel={handleCloseDeleteModal}
                   footer={[
                       <Button key="back" onClick={handleCloseDeleteModal} style={{fontFamily: "Jost"}}>
                           Cancel
                       </Button>,
                       <Button key="submit" className="btnLogin" style={{fontFamily: "Jost"}} type="primary" onClick={handleSubmitDeleteModal}>
                           Submit
                       </Button>,
                   ]}
            >
                <div className="form-group d-flex flex-column">
                    <label className="col-form-label" style={{fontFamily: "Jost"}}>Reason </label>
                    <input onChange={handleOnChangeReason} placeholder="Enter reason" className="form-control" value={reasonCancel} type="text"  style={{fontFamily: "Jost"}} />
                </div>
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