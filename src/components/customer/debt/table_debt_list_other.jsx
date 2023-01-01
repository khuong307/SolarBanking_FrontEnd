import React,{useState,useEffect} from "react";
import numeral from "numeral";
import {Helmet} from "react-helmet";
import {Modal,Button} from "antd";
import {formateDateTime, formatMoney} from "../../redux/helper_functions.jsx";
import axiosInstance from "../../../utils/axiosConfig.js";

import '/src/assets/css/datatables.css'
import '/src/assets/css/datatable-extension.css'
import '/src/assets/css/data-table.css'

function TableDebtListOther(props){
    const userId = localStorage.solarBanking_userId;
    const [reasonCancel,setReasonCancel] = useState("");
    const [debtListOther,setDebtListOther] = useState([]);
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
                //setDebtListOther(debtListOther.filter(debt => debt.debt_id !== showDeleteModal.debt_id))
                handleCloseDeleteModal();
            })
            .catch((err)=>{
                console.log(err);
            })
    }

    useEffect(function (){
        setDebtListOther(props.debtListOther);
    },[])

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
        if (debtListOther.length !==0){
            $("#paidDebtOther").DataTable().rows().remove().draw();
            for (const c of debtListOther) {
                const ans = [];
                ans.push(c.id)
                ans.push(c.debt_account_number)
                ans.push(formatMoney(c.debt_amount) + " VND")
                ans.push(formateDateTime(c.debt_created_at))
                ans.push(c.debt_status)
                ans.push(buttonComponent)
                $("#paidDebtOther").DataTable().rows.add(ans).draw(false);
            }
        }
        const deleteBtnArr = document.getElementsByClassName('btn-delete');
        for (let i = 0; i < deleteBtnArr.length; i++)
            deleteBtnArr[i].addEventListener('click', function(e) {
                setShowDeleteModal({
                    isShow: true,
                    debt_id: debtListOther[i].debt_id
                });
            });
    },[debtListOther]);


    return (
        typeof props.debtListOther == "object" &&
        <div className="table-responsive">
            <table id="paidDebtOther" className="display">
                <thead>
                <tr>
                    <th>#</th>
                    <th>User Id</th>
                    <th>Amount</th>
                    <th>Create Date</th>
                    <th>Status</th>
                    <th></th>
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
                <div className="form-group d-flex align-items-center align-content-center">
                    <i className="fa fa-user mr-3 user-icon"></i>
                    <input onChange={handleOnChangeReason} className="form-control" value={reasonCancel} type="text"  style={{fontFamily: "Jost"}} />
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

export default TableDebtListOther