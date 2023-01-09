import React,{useState,useEffect} from "react";
import numeral from "numeral";
import {Helmet} from "react-helmet";
import {Modal,Button} from "antd";
import {useNavigate} from "react-router-dom";
import {formateDateTime, formatMoney} from "../../redux/helper_functions.jsx";
import axiosInstance from "../../../utils/axiosConfig.js";

import '/src/assets/css/datatables.css'
import '/src/assets/css/datatable-extension.css'
import '/src/assets/css/data-table.css'

function TableDebtListOther(props){
    const navigate = useNavigate();
    const debtListOther = props.debtListOther;
    const userId = localStorage.solarBanking_userId;
    const [reasonCancel,setReasonCancel] = useState("");
    const [showDeleteModal,setShowDeleteModal] = useState({
        isShow: false,
        debt_id: null
    });
    const [notifyMessage,setNotifyMessage] = useState('');
    const [openNotifyModal,setOpenNotifyModal] = useState(false);

    const handleCloseNotifyModal = ()=>{
        setOpenNotifyModal(false);
    }


    function onLoadEmptyTable(){
        if (debtListOther.length == 0){
            $("#paidDebtOther").DataTable()
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
    const handleSubmitDeleteModal = ()=> {
        console.log(reasonCancel)
        console.log(showDeleteModal.debt_id)
        axiosInstance.put(`/debtList/cancelDebt/${showDeleteModal.debt_id}`, {
            user_id: parseInt(userId),
            debt_cancel_message: reasonCancel,
        })
            .then((res) => {
                props.setDebtListOther(debtListOther.map(debt => {
                    if (debt.debt_id === showDeleteModal.debt_id)
                        return {...debt, debt_status: "CANCEL"};
                    return debt;
                }));
                handleCloseDeleteModal();
                setNotifyMessage('Cancel Successful!');
                setOpenNotifyModal(true);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    function checkIsPaidRemoveButton(debt_status, debt_id){
        if (debt_status === "PAID" || debt_status === "CANCEL"){
            const buttonComponent = `
            <div class="d-flex justify-content-center">
                <button class="btn btnLogin" id="edit-${debt_id}" style="font-size: 12px">
                    <i class="fa fa-eye"></i> Detail
                </button>
            </div>
            `
            return buttonComponent
        }
        else{
            const buttonComponent = `
                <div class="d-flex justify-content-center">
                    <button class="btn btnLogin" id="edit-${debt_id}" style="font-size: 12px">
                        <i class="fa fa-eye"></i> Detail
                    </button>
                    <button class="btn btnLogin2 ml-2" id="cancel-${debt_id}" style="font-size: 12px">
                        <i class="fa fa-times-circle-o"></i> Cancel
                    </button>
                </div>
            `
            return buttonComponent
        }
    }
    function loadData(){
        if (Array.isArray(debtListOther)) {
            if (debtListOther.length > 0) {
                $("#paidDebtOther").DataTable().rows().remove().draw();
                debtListOther.forEach((debt, debtIdx) => {
                    const ans = [];
                    ans.push(formateDateTime(debt.debt_created_at))
                    ans.push(debt.reminder_fullname)
                    ans.push(debt.reminder_accountnumber)
                    ans.push(formatMoney(debt.debt_amount) + " VND")
                    ans.push(debt.debt_status)
                    ans.push(checkIsPaidRemoveButton(debt.debt_status, debt.debt_id))
                    $("#paidDebtOther").DataTable().row.add(ans).draw(false);
                });
                for (const c of props.debtListOther){
                    $("#edit-"+c.debt_id).click(
                        ()=>{
                            navigate(`details/${c.debt_id}`)
                        }
                    )
                    if (c.debt_status != "PAID"){
                        $("#cancel-"+c.debt_id).click(
                            ()=>{
                                setShowDeleteModal({
                                    isShow: true,
                                    debt_id: c.debt_id
                                });
                            }
                        )
                    }
                }
            }
        }
    }
    setTimeout(loadData, 500)

    return (
        <div className="dt-ext table-responsive">
            <table id="paidDebtOther" className="display">
                <thead>
                <tr style={{textAlign: "center"}}>
                    <th scope="col">Create Date</th>
                    <th scope="col">Debt Reminder</th>
                    <th scope="col">Debt Reminder Account</th>
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
            <Modal title="Notification" style={{fontFamily: "Jost"}}
                   centered
                   open={openNotifyModal}
                   onOk={handleCloseNotifyModal}
                   onCancel={handleCloseNotifyModal}
                   footer={[
                       <Button key="submit" onClick={handleCloseNotifyModal} className="btnLogin" style={{fontFamily: "Jost"}} type="primary">
                           Ok
                       </Button>,
                   ]}
            >
                <div className="form-group d-flex align-items-center align-content-center">
                    <p className="modal-message">{notifyMessage}</p>
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