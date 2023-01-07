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

    function onLoadEmptyTable(){
        if (props.debtListSelf.length == 0){
            $("#paidDebtSelf").DataTable()
        }
    }
    setTimeout(onLoadEmptyTable, 500)


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

    function checkIsPaidRemoveButton(debt_status){
        if (debt_status == "PAID"){
            const buttonComponent = `
            <div class="d-flex justify-content-center">
                <button class="btn btnLogin btn-edit-self">
                    <i class="fa fa-eye"></i>
                </button>
            </div>
            `
            return buttonComponent
        }
        else{
            const buttonComponent = `
                <div class="d-flex justify-content-center">
                    <button class="btn btnLogin btn-edit-self">
                        <i class="fa fa-eye"></i>
                    </button>
                    <button class="btn btnLogin2 ml-2 btn-delete-self">
                        <i class="fa fa-times-circle-o"></i>
                    </button>
                </div>
            `
            return buttonComponent
        }
    }

    function loadData(){
        if (Array.isArray(debtListSelf)) {
            if (debtListSelf.length > 0) {
                $("#paidDebtSelf").DataTable().rows().remove().draw();
                debtListSelf.forEach((debt, debtIdx) => {
                    const ans = [];
                    ans.push(formateDateTime(debt.debt_created_at))
                    ans.push(debt.debtor_fullname)
                    ans.push(debt.debt_account_number)
                    ans.push(formatMoney(debt.debt_amount) + " VND")
                    ans.push(debt.debt_status)
                    ans.push(checkIsPaidRemoveButton(debt.debt_status))
                    $("#paidDebtSelf").DataTable().row.add(ans).draw(false);
                });
                const deleteBtnArr = document.getElementsByClassName('btn-delete-self');
                console.log(deleteBtnArr)
                for (let i = 0; i < deleteBtnArr.length; i++)
                    deleteBtnArr[i].addEventListener('click', function(e) {
                        setShowDeleteModal({
                            isShow: true,
                            debt_id: props.debtListSelf[i].debt_id
                        });
                    });
                const detailBtnArr = document.getElementsByClassName('btn-edit-self');
                for (let i = 0; i < detailBtnArr.length; i++)
                    detailBtnArr[i].addEventListener('click', function(e) {
                        console.log(props.debtListSelf[i].debt_id)
                        navigate(`details/${props.debtListSelf[i].debt_id}`)
                    });
            }
        }
    }
    setTimeout(loadData, 500)

    return (
        <div className="dt-ext table-responsive">
            <table id="paidDebtSelf" className="display">
                <thead>
                <tr style={{textAlign: "center"}}>
                    <th scope="col">Create Date</th>
                    <th scope="col">Debtor</th>
                    <th scope="col">Debt Account Number</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Status</th>
                    <th scope="col">Features</th>
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