import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import converter from "number-to-words"
import * as Yup from "yup"
import { useFormik } from 'formik'
import { NumericFormat } from 'react-number-format';
import { AutoComplete } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {  getRecipientListBySolarBankApi, getUserBankAccountApi, getValidTransactionApi, searchReceiverIntra } from '../../redux/reducer/transferReducer'

export default function IntrabankTransfer() {
    const userId = localStorage.getItem("solarBanking_userId")
    const navigate = useNavigate()

    const src_account = useSelector(state => state.transferReducer.src_account)
    const recipientsSolarBank = useSelector(state => state.transferReducer.recipientsSolarBank)

    const dispatch = useDispatch()

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            src_account_number: src_account?.account_number,
            pay_transaction_fee: "SRC",
            transaction_amount: "",
            des_account_number: "",
            bank_code: "SLB",
            transaction_message: "Transfer Money",
        },
        validationSchema: Yup.object().shape({
            transaction_amount: Yup.string().min(5, "Must be lowest 10000")
                .required("Required"),

            des_account_number: Yup.string().max(15, "Maximum 15 digits")
                .required("Required").matches(/^[0-9]+$/, "Must be only digits"),
        }),
        onSubmit: values => {
            let transaction_amount = values.transaction_amount
            transaction_amount = Number(transaction_amount.replaceAll(",",""))
            if(transaction_amount < 10000 || isNaN(transaction_amount) || transaction_amount > 30000000){
                alert("Amount of Money must be lowest 10.000 and maximum 30.000.000")
            }else{
                values={...values,transaction_amount}
                dispatch(getValidTransactionApi(userId,values,navigate))
            }
        }
    })

    useEffect(()=>{
        dispatch(getUserBankAccountApi(userId))
        dispatch(getRecipientListBySolarBankApi(userId))
    },[])


    return (
        <div className="container mt-3">
            <form onSubmit={formik.handleSubmit}>
                <div className='row'>
                    <div className='col-4'>
                        <div className="form-group">
                            <label style={{fontFamily:"Jost"}}>Choose Account (*):</label>
                            <input disabled name='src_account_number' type="text" className="form-control" value={formik.values.src_account_number || ""} />
                            {formik.errors.accountTransfer ? <div className='text-danger'>{formik.errors.src_account_number}</div> : null}
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-4'>
                        <div className="form-group">
                            <label style={{fontFamily:"Jost"}}>Bank</label>
                            <input name='bank_code' disabled className='form-control' value="Solar Bank" />
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className="form-group">
                            <label style={{fontFamily:"Jost"}}>Receiver Account Number (*):</label>
                            <AutoComplete
                                options={recipientsSolarBank?.map((user) => {
                                    return { label: user.account_number + " - " + user.nick_name, value: user.account_number }
                                })}
                                name="des_account_number"
                                style={{ width: "100%", height: "100%", fontFamily: "Jost" }}
                                onSelect={(value, option) => {
                                    console.log(option)
                                    formik.setFieldValue("des_account_number", value)
                                }}
                                onSearch={(text) => {
                                    dispatch(searchReceiverIntra(text))
                                }}
                                onChange={(data) => {
                                    formik.handleChange
                                    formik.setFieldValue("des_account_number", data)
                                }}
                                placeholder="input here"
                            />
                            {formik.errors.des_account_number ? <div className='text-danger' style={{fontFamily: "Jost"}}>{formik.errors.des_account_number}</div> : null}
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-4'>
                        <div className="form-group">
                            <label style={{fontFamily:"Jost"}}>Amount of money (*):</label>
                            <NumericFormat name='transaction_amount' className='form-control' thousandSeparator="," onChange={formik.handleChange} />
                            {formik.errors.transaction_amount ? <div className='text-danger'>{formik.errors.transaction_amount}</div> : null}
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className="form-group">
                            <label style={{fontFamily:"Jost"}}>Money in words</label>
                            <textarea name="moneyWord" disabled className="form-control" rows={1}
                                value={
                                    formik.values.transaction_amount === "" ? "0 VND" :
                                        converter.toWords(Number(formik.values.transaction_amount.replace(/,/g, ""))).toUpperCase() + " VND"
                                } />
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-8'>
                        <div className="form-group">
                            <label style={{fontFamily:"Jost"}}>Message:</label>
                            <textarea name='transaction_message' className="form-control" rows={3} defaultValue={"Transfer Money"} onChange={formik.handleChange} />
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-8'>
                        <label style={{fontFamily:"Jost"}}>Charge for remittance (15,000 VND):</label>
                        <div className='form-group'>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="pay_transaction_fee" defaultChecked defaultValue="SRC" onChange={formik.handleChange} />
                                <label className="form-check-label" style={{fontFamily:"Jost"}}>Paid By Sender</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="pay_transaction_fee" defaultValue="DES" onChange={formik.handleChange} />
                                <label className="form-check-label" style={{fontFamily:"Jost"}}>Paid By Recipient</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-lg-2'>
                        <button type='submit' className="btn btnLogin d-flex justify-content-between align-content-center align-items-center" onClick={formik.handleSubmit}>CONTINUE<i className="fa fa-chevron-circle-right ml-2"></i></button>
                    </div>
                </div>
            </form>
        </div>
    )
}