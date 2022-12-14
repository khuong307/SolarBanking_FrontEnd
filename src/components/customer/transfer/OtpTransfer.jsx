import { useFormik } from 'formik';
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup"
import { getValidOtpApi, getValidOtpInterApi } from '../../redux/reducer/transferReducer';
import axiosInstance from "../../../utils/axiosConfig.js";
import Swal from 'sweetalert2'

export default function OtpTransfer() {
    const transactionId = useSelector(state => state.transferReducer.transactionId)
    const transactionType = useSelector(state => state.transferReducer.transactionType)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [minutes, setMinutes] = useState(5);
    const [seconds, setSeconds] = useState(0);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            otpCode: "",
        },
        validationSchema: Yup.object().shape({
            otpCode: Yup.string().matches(/^[0-9]+$/, "Must be only digits")
                .min(6, "Must be exactly 6 Digits").max(6, "Must be exactly 6 Digits")
                .required("Required"),
        }),
        onSubmit: values => {
            const otpInfo = { ...values, created_at: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss") }
            if(transactionType === 1){
                dispatch(getValidOtpApi(transactionId, otpInfo, navigate))
            }else{
                dispatch(getValidOtpInterApi(transactionId, otpInfo, navigate))
            }
            
        }
    })

    const resendOtpClickedHandler = function () {
        axiosInstance.post(`/customers/transaction/${transactionId}/otp`)
            .then((res) => {
                setMinutes(4);
                setSeconds(59);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your OTP has been resent',
                    showConfirmButton: false,
                    timer: 1500
                  })
            })
            .catch((err) => {
                console.log(err)
                Swal.fire({
                    title: 'ERROR !',
                    html:`<h3 class="text-danger">OTP can't be resent</h3>`,
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            });
    }

    useEffect(() => {
        if (transactionId === -1) {
            navigate("/", { replace: true })
        }

        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }

            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                } else {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                }
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [seconds]);

    return (
        <div className="page-body mt-lg-5">
            <div className="container-fluid mt-lg-5">
                <div className="row mt-5">
                    <div className="col-lg-12 mt-lg-5">
                        <div className="card mt-lg-5">
                            <div className="card-header" >
                                <h5 style={{ fontFamily: "Jost" }}>OTP Required (*)</h5>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title" style={{ fontFamily: "Jost" }}>Kindly enter the OTP code which sent to your provided email.</h5>
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="form-group">
                                        <input type="text" name='otpCode' className="form-control" placeholder="OTP Code" onChange={formik.handleChange}  style={{fontFamily: "Jost"}}/>
                                        {formik.errors.otpCode ? <div className='text-danger'>{formik.errors.otpCode}</div> : null}
                                    </div>
                                    <div className="form-group">
                                        <div className="d-flex justify-content-between ml-4">
                                            {seconds > 0 || minutes > 0 ? (
                                                <p className="time-remaining">
                                                    Time Remaining:
                                                    <span className="time-counter">
                                            {minutes < 10 ? ` 0${minutes}` : minutes}:
                                                        {seconds < 10 ? `0${seconds}` : seconds}
                                        </span>
                                                </p>
                                            ) : (
                                                <p className="time-remaining">Didn't receive code?</p>
                                            )}
                                            <div className="resend-otp-link-active mr-5">
                                                <span onClick={resendOtpClickedHandler}>Resend OTP?</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btnLogin d-flex justify-content-center align-content-center align-items-center" onClick={formik.handleSubmit} style={{fontFamily: "Jost"}}>CONFIRM <i className="fa fa-chevron-circle-right ml-2"></i></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



