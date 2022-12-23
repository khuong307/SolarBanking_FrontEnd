import React, {useEffect, useState} from 'react'
import {useForm} from "react-hook-form";
import Axios from "axios";
import TableTransferList from "./table_transfer_list";
import TableChargeSLBList from "./table_chargeSLB_list.jsx";
import "/src/assets/js/datatables/jquery.dataTables.min.js"
import {formateDateTime, formatMoney} from "../../redux/helper_functions.jsx";
import TabelReceiveOthersList from "./table_receivedOthers_list";
import TablePaidDebtList from "./table_paid_debt_list";
import TableReceiveDebtList from "./table_receive_debt_list.jsx";
import axiosInstance from "../../../utils/axiosConfig.js";

function HistoryTransaction(){
    const [transferList, setTransferList] = useState('')
    const [receiveOthersList, setReceiveOthersList] = useState('')
    const [chargeSLBList, setchargeSLBList] = useState('')
    const [paidDebtList, setPaidDebtList] = useState('')
    const [receiveDebtList, setReceiveDebtList] = useState('')
    function  getTransactionList (){
        const user_id = localStorage.getItem("solarBanking_userId")
        axiosInstance.get(`/users/${user_id}/history`).then((result)=> {
            if (result.data.isFound == true){
                setchargeSLBList(result.data.charge_by_SLB)
                setTransferList(result.data.transfer_list_by_customer)
                setReceiveOthersList(result.data.received_from_others)
                setPaidDebtList(result.data.paid_debt_list)
                setReceiveDebtList(result.data.recevied_debt_list)
            }
            else{
                alert("User ID is invalid!")
            }
        }).catch((err)=>{
            alert(err)
        })
    }
    useEffect(getTransactionList,[])

    const preventSpace = function (e) {
        if(e.code === 'Space') e.preventDefault()
    }

    return (
        <div className="page-body">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12 mt-2" style={{fontFamily: "Jost"}}>
                        <h4>HISTORY TRANSACTION</h4>
                        <small style={{fontFamily: "Jost", fontSize: "15px", color: "gray"}}>Solar Banking Customer Panel</small>
                    </div>
                </div>
                <div className="card height-equal mt-4" style={{fontFamily: "Jost"}}>
                        <div className="card-body">
                            <ul className="nav nav-pills nav-warning" id="pills-icontab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="pills-iconhome-tab" data-toggle="pill"
                                       href="#pills-iconhome" role="tab" aria-controls="pills-iconhome" style={{fontSize: "15px"}}
                                       aria-selected="true"><i className="fa fa-line-chart"></i>Transfer Transactions</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="pills-iconprofile-tab" data-toggle="pill"
                                       href="#pills-iconprofile" role="tab" aria-controls="pills-iconprofile" style={{fontSize: "15px"}}
                                       aria-selected="false">
                                        <i className="icofont icofont-coins"></i> Debt Transactions</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="pills-chargeslb-tab" data-toggle="pill"
                                       href="#pills-chargeslb" role="tab" aria-controls="pills-chargeslb" style={{fontSize: "15px"}}
                                       aria-selected="false"><i className="fa fa-money"></i>Charge By Solar Banking</a>
                                </li>
                            </ul>
                            <div className="tab-content" id="pills-icontabContent">
                                <div className="tab-pane fade show active" id="pills-iconhome" role="tabpanel"
                                     aria-labelledby="pills-iconhome-tab">
                                    <div className="card-body">
                                        <ul className="nav nav-tabs border-tab nav-secondary nav-left" id="danger-tab"
                                            role="tablist">
                                            <li className="nav-item">
                                                <a className="nav-link active" id="transfer-tab" data-toggle="tab" style={{fontSize: "15px"}}
                                                   href="#transfer" role="tab" aria-controls="transfer"
                                                   aria-selected="true">
                                                    <i className="fa fa-arrow-circle-down"></i>Transfered By You</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" id="receive-tab" data-toggle="tab" style={{fontSize: "15px"}}
                                                   href="#receive" role="tab" aria-controls="receive"
                                                   aria-selected="false"><i className="fa fa-arrow-circle-o-up"></i>Received By Others</a>
                                            </li>
                                        </ul>
                                        <div className="tab-content" id="tabContent">
                                            <div className="tab-pane fade show active" id="transfer" role="tabpanel"
                                                 aria-labelledby="transfer-tab">
                                                <TableTransferList transferList={transferList}/>
                                            </div>
                                            <div className="tab-pane fade" id="receive" role="tabpanel"
                                                 aria-labelledby="receive-tab">
                                                <TabelReceiveOthersList receiveOthersList={receiveOthersList}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="pills-iconprofile" role="tabpanel"
                                     aria-labelledby="pills-iconprofile-tab">
                                    <div className="card-body">
                                        <ul className="nav nav-tabs border-tab nav-secondary nav-left"
                                            role="tablist">
                                            <li className="nav-item">
                                                <a className="nav-link active" id="paid-debt-tab" data-toggle="tab" style={{fontSize: "15px"}}
                                                   href="#paid-debt" role="tab" aria-controls="transfer"
                                                   aria-selected="true">
                                                    <i className="fa fa-minus-circle"></i>Paid By You</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" id="receive-debt-tab" data-toggle="tab" style={{fontSize: "15px"}}
                                                   href="#receive-debt" role="tab" aria-controls="receive-debt"
                                                   aria-selected="false"><i className="fa fa-check-circle-o"></i>Collected From Others</a>
                                            </li>
                                        </ul>
                                        <div className="tab-content" id="tabContent">
                                            <div className="tab-pane fade show active" id="paid-debt" role="tabpanel"
                                                 aria-labelledby="paid-debt-tab">
                                                <TablePaidDebtList paidDebtList={paidDebtList}/>
                                            </div>
                                            <div className="tab-pane fade" id="receive-debt" role="tabpanel"
                                                 aria-labelledby="receive-debt-tab">
                                                <TableReceiveDebtList receiveDebtList={receiveDebtList}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="pills-chargeslb" role="tabpanel"
                                     aria-labelledby="pills-chargeslb-tab">
                                    <TableChargeSLBList chargeSLBList={chargeSLBList}/>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}
export default HistoryTransaction
