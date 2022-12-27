import React,{useState,useEffect} from "react";
import axiosInstance from '../../../utils/axiosConfig.js';
import {useNavigate} from "react-router-dom";
import {formateDateTime, formatMoney} from "../../redux/helper_functions.jsx";

function debtDetail(){
    const navigate = useNavigate();
    const [debtDetail,setDebtDetail] = useState(null);
    const [paymentModal,setPaymentModal] = useState({
        isShow: false,
        debt_id:null
    });
    let account_number = "";
    let amount = "";
    let status = "";
    let date = "";
    let message = "";
    let message_cancel = "";

    const handleClosePaymentModal = ()=>{
        setPaymentModal({
            isShow: false,
            debt_id: null
        })
    }
    const handleOpenPaymentModal = ()=>{
        setPaymentModal({
            isShow: true,
            debt_id: debtDetail.debt_id
        })
    }
    const handleCallBackPage = ()=>{
        navigate("/debtList");
    }

    useEffect(function (){
        const debt_id = 0;
        axiosInstance.get(`/debtList/${debt_id}`)
            .then((res)=>{
                if (res.data.isSuccess){
                    account_number = res.data.objDebt.debt_account_number;
                    amount = formatMoney(res.data.objDebt.debt_amount) + " VND";
                    status = res.data.objDebt.debt_status;
                    date = formateDateTime(res.data.objDebt.debt_created_at);
                    message = res.data.objDebt.debt_message;
                    message_cancel = res.data.objDebt.debt_cancel_message;
                }
            })
            .catch((err)=>{
                console.log(err.message());
            })
    },null)
    return(
        <div className="page-body">
            <div className="row">
                <div className="col-lg-12 mt-2" style={{fontFamily: "Jost"}}>
                    <h4>Debt Details</h4>
                    <small style={{fontFamily: "Jost", fontSize: "15px", color: "gray"}}>Solar Banking Debt Detail</small>
                    <div className="card-body">
                        <div className="row">
                            <div className="form-group col-md-12">
                                <label className="col-form-label">Account Number</label>
                                <p className="card-text">{account_number}</p>
                            </div>
                            <div className="form-group col-md-12">
                                <label className="col-form-label">Amount</label>
                                <p className="card-text">{amount}</p>
                            </div>
                            <div className="form-group col-md-12">
                                <label className="col-form-label">Status</label>
                                <p className="card-text">{status}</p>
                            </div>
                            <div className="form-group col-md-12">
                                <label className="col-form-label">Date</label>
                                <p className="card-text">{date}</p>
                            </div>
                            <div className="form-group col-md-12">
                                <label className="col-form-label">Message</label>
                                <p className="card-text">{message}</p>
                            </div>
                            <div className="form-group col-md-12">
                                <label className="col-form-label">Cancel Message</label>
                                <p className="card-text">{message_cancel}</p>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-primary" onClick={handleOpenPaymentModal}>Payment</button>
                        <button className="btn btn-secondary" onClick={handleCallBackPage}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default debtDetail