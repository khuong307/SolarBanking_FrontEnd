import React, { useEffect } from 'react'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import converter from "number-to-words"
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import { confirmTransactionApi } from '../../redux/reducer/transferReducer'

export default function ConfirmTransfer() {
    const userId = localStorage.getItem("solarBanking_userId")

    const infoTransaction = useSelector(state => state.transferReducer.infoTransaction)
    const infoDesAccount = useSelector(state => state.transferReducer.infoDesAccount)
    console.log(infoDesAccount)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const sendTransaction = {...infoTransaction}
        delete sendTransaction?.full_name
        delete sendTransaction?.bank_code
        delete sendTransaction?.phone
        delete sendTransaction?.email
        dispatch(confirmTransactionApi(userId,sendTransaction,navigate))
    }

    useEffect(() => {
        if (_.isEmpty(infoTransaction)) {
            console.log("Hello")
            navigate("/",{replace:true})
        }
    }, [])

    return (
        <form className='page-body' onSubmit={handleSubmit} >
            <div className='row'>
                <div className="col-lg-12 mt-2" style={{ fontFamily: "Jost" }}>
                    <h3 className="text-center" style={{fontFamily:"Jost"}}>INFORMATION TRANSFER</h3>
                </div>
                <div className="col-lg-12">
                    <div className='card'>
                        <div className="card-body">
                            <div className="container">
                                <div className='row'>
                                    <div className='col-4'>
                                        <div className="form-group">
                                            <label style={{fontFamily:"Jost"}}>Choose Account (*):</label>
                                            <input readOnly type="text" className="form-control" value={infoTransaction?.src_account_number} style={{fontFamily: "Jost"}} />
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-4'>
                                        <div className="form-group">
                                            <label style={{fontFamily:"Jost"}}>Bank</label>
                                            <input readOnly type="text" className="form-control" value={infoTransaction?.bank_code} style={{fontFamily: "Jost"}} />
                                        </div>
                                    </div>
                                    <div className='col-4'>
                                        <div className="form-group">
                                            <label style={{fontFamily:"Jost"}}>Receiver Account Number (*):</label>
                                            <input readOnly type="text" className="form-control" value={infoTransaction?.des_account_number} style={{fontFamily: "Jost"}} />
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-4'>
                                        <label style={{fontFamily:"Jost"}}>Receiver Full Name:</label>
                                        <input readOnly type="text" className="form-control" value={infoTransaction?.full_name}  style={{fontFamily: "Jost"}}/>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-4'>
                                        <div className="form-group">
                                            <label style={{fontFamily:"Jost"}}>Amount of money (*):</label>
                                            <input readOnly type="number" className="form-control" value={infoTransaction?.transaction_amount} style={{fontFamily: "Jost"}} />
                                        </div>
                                    </div>
                                    <div className='col-4'>
                                        <div className="form-group">
                                            <label style={{fontFamily:"Jost"}}>Money in words</label>
                                            <textarea readOnly className="form-control" rows={1}
                                                      value={
                                                          _.isEmpty(infoTransaction) ? "0 VND" :
                                                              converter.toWords(infoTransaction?.transaction_amount).toUpperCase() + " VND"} style={{fontFamily: "Jost"}} />
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-8'>
                                        <div className="form-group">
                                            <label style={{fontFamily:"Jost"}}>Content</label>
                                            <textarea readOnly className="form-control" rows={3} defaultValue={infoTransaction?.transaction_message} />
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-8'>
                                        <label style={{fontFamily:"Jost"}}>Charge for remittance (-15.000):</label>
                                        <div className='form-group'>
                                            <div className="form-check form-check-inline">
                                                <input readOnly className="form-check-input" type="radio"
                                                       name="pay_transaction_fee" defaultValue="SRC" checked={infoTransaction?.pay_transaction_fee === "SRC"} />
                                                <label className="form-check-label" style={{fontFamily:"Jost"}}>Paid By Sender</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input readOnly className="form-check-input" type="radio"
                                                       name="pay_transaction_fee" defaultValue="DES" checked={infoTransaction?.pay_transaction_fee === "DES"} />
                                                <label className="form-check-label" style={{fontFamily:"Jost"}}>Paid By Recipient</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-8'>
                                        <button type='submit' className="btn btnLogin d-flex justify-content-center align-content-center align-items-center" style={{fontFamily: "Jost"}} onClick={handleSubmit}>CONFIRM <i className="fa fa-chevron-circle-right ml-1"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}