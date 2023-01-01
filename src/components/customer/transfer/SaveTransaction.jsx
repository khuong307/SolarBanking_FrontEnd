import { useFormik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup"
import { saveRecipientApi } from '../../redux/reducer/transferReducer'

export default function SaveTransaction() {
    const userId = localStorage.getItem("solarBanking_userId")
    const infoTransaction = useSelector(state => state.transferReducer.infoTransaction)
    const infoDesAccount = useSelector(state => state.transferReducer.infoDesAccount)
    
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            account_number: infoTransaction?.des_account_number,
            nick_name: infoDesAccount?.full_name
        },
        validationSchema: Yup.object().shape({
            nick_name: Yup.string().min(5, "Must be lowest 5 characters").max(15, "Maximum 15 characters")
                .required("Required"),
        }),
        onSubmit: values => {
            console.log("submit: ",values)
            const infoRecipient = {...values,user_id:userId}
            dispatch(saveRecipientApi(infoRecipient,navigate))
        }
    })

    return (
        <div className='page-body'>
            <div className="container-fluid mt-lg-5">
                <div className="row mt-lg-5">
                    <div className="col-lg-12 mt-lg-5">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title" style={{ fontFamily: "Jost", textAlign: "center" }}>Information Recipient</h4>
                                <div className="col-lg-12 d-flex justify-content-center">
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className="form-group">
                                            <label>Account Number</label>
                                            <input type="text" name='account_number' readOnly className="form-control" value={formik.values.account_number || ""}/>
                                        </div>
                                        <div className="form-group">
                                            <label>Nick Name</label>
                                            <input type="text" name='nick_name' className="form-control" value={formik.values.nick_name} onChange={formik.handleChange}/>
                                            {formik.errors.nick_name ? <div className='text-danger'>{formik.errors.nick_name}</div> : null}
                                        </div>
                                        <button type="submit" className="btn btn-primary" onClick={formik.handleSubmit}>Save</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


