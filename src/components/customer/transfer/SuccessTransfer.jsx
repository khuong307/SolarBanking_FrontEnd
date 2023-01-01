import _ from 'lodash'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { formatMoney } from "../../redux/helper_functions";

export default function SuccessTransfer() {
    const infoTransaction = useSelector(state => state.transferReducer.infoTransaction)
    const infoDesAccount = useSelector(state => state.transferReducer.infoDesAccount)
    console.log(infoDesAccount)
    const dispatch = useDispatch()
    
    const navigate = useNavigate()

    useEffect(() => {
        if (_.isEmpty(infoTransaction)) {
            navigate("/", { replace: true })
        }
    }, [])

    return (
        <div className='page-body'>
            <div className="container-fluid mt-lg-5">
                <div className="row mt-lg-5">
                    <div className="col-lg-12 mt-lg-5">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title" style={{ fontFamily: "Jost", textAlign: "center" }}>Information Transaction <i className="fa fa-check-circle-o" style={{ color: "green" }}></i></h4>
                                <div className="col-lg-12 d-flex justify-content-center">
                                    <div className="col-lg-6">
                                        <p className="card-text" style={{ fontFamily: "Jost", fontSize: 15 }}><i className="fa fa-user mr-2"></i>Recipient: {infoTransaction.full_name}</p>
                                        <p className="card-text" style={{ fontFamily: "Jost", fontSize: 15 }}><i className="fa fa-bank mr-2"></i>Bank: {infoTransaction.bank}</p>
                                        <p className="card-text" style={{ fontFamily: "Jost", fontSize: 15 }}><i className="fa fa-credit-card mr-2"></i>Account Number: {infoTransaction.des_account_number}</p>
                                        <p className="card-text" style={{ fontFamily: "Jost", fontSize: 15 }}><i className="icofont icofont-money mr-2"></i>Trasaction Amount: {formatMoney(infoTransaction.transaction_amount)} VND</p>
                                        <p className="card-text" style={{ fontFamily: "Jost", fontSize: 15 }}><i className="fa fa-comment mr-2"></i>Trasaction Message: {infoTransaction.transaction_message}</p>
                                        <p className="card-text" style={{ fontFamily: "Jost", fontSize: 15 }}><i className="fa fa-reply mr-2"></i>Trasaction Fee: {formatMoney(infoTransaction.transaction_fee)} VND</p>
                                        <p className="card-text" style={{ fontFamily: "Jost", fontSize: 15 }}><i className="fa fa-money mr-2"></i>Total: {formatMoney(infoTransaction.total)} VND</p>
                                        <div className='form-group' style={{ fontFamily: "Jost" }}>
                                            {infoTransaction?.isSavedRecipientTable ? "" :
                                                <button className='btn btnLogin mr-4' onClick={() => navigate("/customer/transfer/save")}><i className="fa fa-bookmark mr-2"></i>Save Transaction</button>
                                            }
                                            <button className='btn btn-light' onClick={() => navigate("/customer")}>Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

