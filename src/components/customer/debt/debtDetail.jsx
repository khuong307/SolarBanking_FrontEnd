import React,{useState,useEffect} from "react";
import axiosInstance from '../../../utils/axiosConfig.js';
import {useNavigate,useParams} from "react-router-dom";
import {formateDateTime, formatMoney} from "../../redux/helper_functions.jsx";
import {Button, Modal} from "antd";
import numeral from "numeral";
import ErrorMessage from "../../common/ErrorMessage.jsx";

function debtDetail(){
    const {id} = useParams();
    const userId = localStorage.solarBanking_userId;
    const navigate = useNavigate();
    const [invalidOtp, setInvalidOtp] = useState({
        isSuccess: true,
        message: ''
    });
    const [minutes, setMinutes] = useState(5);
    const [seconds, setSeconds] = useState(0);
    const [inputOtp,setInputOtp] = useState("");
    const [isPaid,setIsPaid] = useState(false);
    const [colorStatus,setColorStatus] = useState("");
    const [statusPayment,setStatusPayment] = useState("");
    const [debtDetail,setDebtDetail] = useState({});
    const [confirmModal,setConfirmModal] = useState(false);
    const [successModal,setSuccessModal] = useState(false);
    const [paymentModal,setPaymentModal] = useState({
        isShow: false,
        debt_id:null
    });
    const handleChangeOtp = (e)=>{
        e.preventDefault();
        setInputOtp(e.target.value);
    }
    const handleCloseConfirmModal = ()=>{
        setConfirmModal(false);
    }
    const handleCloseSuccessModal = ()=>{
        setSuccessModal(false);
    }
    const handleOpenConfirmModal = ()=>{
        setConfirmModal(true);
    }
    const changeInvalidOtpToDefault = function() {
        setInvalidOtp({
            isSuccess: true,
            message: ''
        });
    }
    const resendOtpClickedHandler = function() {
        axiosInstance.post('/debtList/re-sendOtp', { email })
            .then((res) => {
                setMinutes(4);
                setSeconds(59);
            })
            .catch((err) => {
                setInvalidOtp({
                    isSuccess: false,
                    message: err.response.data.message
                });
            });
    }
    const handleSubmitConfirmModal = ()=>{
        setConfirmModal(false);
        setPaymentModal({
            isShow: true,
            debt_id: debtDetail.debt_id
        });
        axiosInstance.post(`/debtList/sendOtp`,{
            debt_id: parseInt(id),
            user_id: parseInt(userId)
        })
            .then((res)=>{
                if (res.data.isSuccess){
                    setMinutes(4);
                    setSeconds(59);
                }
                else{
                    console.log(res.data.message);
                }
            })
            .catch((err)=>{
                setInvalidOtp({
                    isSuccess: false,
                    message: err.response.data.message
                });
            })
    }
    const handleVerifiedOtp = ()=>{
        axiosInstance.post(`/debtList/internal/verified-payment`,{
            debt_id: parseInt(id),
            user_id : parseInt(userId),
            otp: inputOtp
        })
            .then((res)=>{
                if (res.data.isSuccess){
                    handleClosePaymentModal();
                    setSuccessModal(true);
                    setStatusPayment(res.data.status);
                    setColorStatus("green");
                    setIsPaid(true);
                }
                else{
                    console.log(res.data.message);
                }
            })
            .catch((err)=>{
                setInvalidOtp({
                    isSuccess: false,
                    message: err.response.data.message
                });
            })
    }

    const handleClosePaymentModal = ()=>{
        setPaymentModal({
            isShow: false,
            debt_id: null
        });
    }
    const handleCallBackPage = ()=>{
        navigate("/customer/debtList");
    }
    useEffect(function (){
        axiosInstance.get(`/debtList/${id}`)
            .then((res)=>{
                if (res.data.isSuccess){
                    console.log(res.data.objDebt);
                    setDebtDetail({...res.data.objDebt});
                    const txtStatus = res.data.objDebt.debt_status;
                    setStatusPayment(res.data.objDebt.debt_status);
                    console.log(txtStatus);
                    if (txtStatus === "PAID"){
                        setColorStatus("green");
                        setIsPaid(true);
                    }
                    else if (txtStatus === "NOT PAID"){
                        setColorStatus("red");
                        setIsPaid(false);
                    }
                    else{
                        setColorStatus("black");
                    }
                }
            })
            .catch((err)=>{
                console.log(err.message);
            })
    },[]);

    useEffect(() => {
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

    return(
        <div className="page-body">
            <div className="row">
                <div className="col-lg-12 mt-2" style={{fontFamily: "Jost"}}>
                    <div className="d-flex justify-content-between mt-2">
                        <div className="title">
                            <h4>Debt Details</h4>
                            <small style={{fontFamily: "Jost", fontSize: "15px", color: "gray"}}>Solar Banking Debt Detail</small>
                        </div>
                        <div className="direction">
                            <div className="float-right mr-3 mb-3">
                                <button className="btn btn-light" onClick={handleCallBackPage}>Back to list</button>
                            </div>
                        </div>
                    </div>

                    <div className="card-body">
                        <div className="row">
                            <div className="form-group col-md-12 d-flex flex-row align-items-center">
                                <label className="col-form-label">Debt Account Number:</label>
                                <p className="card-text ml-3 f-16">{debtDetail.debt_account_number}</p>
                            </div>
                            <div className="form-group col-md-12 d-flex flex-row align-items-center">
                                <label className="col-form-label">Amount:</label>
                                <p className="card-text ml-3 f-16">{numeral(debtDetail.debt_amount).format('0,0') + " VNĐ"}</p>
                            </div>
                            <div className="form-group col-md-12 d-flex flex-row align-items-center">
                                <label className="col-form-label">Status:</label>
                                <p className="card-text ml-3 f-16" style={{color: colorStatus,fontWeight:"bold"}}>{statusPayment}</p>
                            </div>
                            <div className="form-group col-md-12 d-flex flex-row align-items-center">
                                <label className="col-form-label">Date:</label>
                                <p className="card-text ml-3 f-16">{formateDateTime(debtDetail.debt_created_at)}</p>
                            </div>
                            <div className="form-group col-md-12 d-flex flex-row align-items-center">
                                <label className="col-form-label">Message:</label>
                                <p className="card-text ml-3 f-16">{debtDetail.debt_message}</p>
                            </div>
                            <div className="form-group col-md-12 d-flex flex-row align-items-center">
                                <label className="col-form-label">Cancel Message:</label>
                                <p className="card-text ml-3 f-16">{debtDetail.debt_cancel_message}</p>
                            </div>
                            <div className="form-group col-md-12">
                                {!isPaid && <button className="btn btn-success mr-2" onClick={handleOpenConfirmModal}>Payment</button>}

                            </div>
                        </div>
                    </div>
                    <Modal title="Verify OTP" style={{fontFamily: "Jost"}}
                           centered
                           open={paymentModal.isShow}
                           onOk={handleClosePaymentModal}
                           onCancel={handleClosePaymentModal}
                           footer={[
                               <Button key="back" onClick={handleClosePaymentModal} style={{fontFamily: "Jost"}}>
                                   Cancel
                               </Button>,
                               <Button key="submit" onClick={handleVerifiedOtp} className="btnLogin" style={{fontFamily: "Jost"}} type="primary">
                                   Verified
                               </Button>,
                           ]}
                    >
                        <div className="form-group d-flex flex-column">
                            <p className="modal-message">OTP has been sent to your email</p>
                            <input className="form-control" maxLength={6} type="text" onChange={handleChangeOtp}  style={{fontFamily: "Jost"}} placeholder="Enter OTP"/>
                            <div className="d-flex justify-content-between mt-2">
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
                                {seconds > 0 || minutes > 0 ? (
                                    <div className="resend-otp-link-disabled">
                                        <span>Resend OTP?</span>
                                    </div>
                                ) : (
                                    <div className="resend-otp-link-active">
                                        <span onClick={resendOtpClickedHandler}>Resend OTP?</span>
                                    </div>
                                )}
                            </div>
                            {!invalidOtp.isSuccess &&
                                <ErrorMessage error={invalidOtp.message} resetState={changeInvalidOtpToDefault} />}
                        </div>
                    </Modal>
                    <Modal title="Notification" style={{fontFamily: "Jost"}}
                           centered
                           open={confirmModal}
                           onOk={handleCloseConfirmModal}
                           onCancel={handleCloseConfirmModal}
                           footer={[
                               <Button key="back" onClick={handleCloseConfirmModal} style={{fontFamily: "Jost"}}>
                                   Cancel
                               </Button>,
                               <Button key="submit" onClick={handleSubmitConfirmModal} className="btnLogin" style={{fontFamily: "Jost"}} type="primary">
                                   Ok
                               </Button>,
                           ]}
                    >
                        <div className="form-group d-flex align-items-center align-content-center">
                            <p className="modal-message">Do you want to pay off this debt?</p>
                        </div>
                    </Modal>
                    <Modal title="Notification" style={{fontFamily: "Jost"}}
                           centered
                           open={successModal}
                           onOk={handleCloseSuccessModal}
                           onCancel={handleCloseSuccessModal}
                           footer={[
                               <Button key="submit" onClick={handleCloseSuccessModal} className="btnLogin" style={{fontFamily: "Jost"}} type="primary">
                                   Ok
                               </Button>,
                           ]}
                    >
                        <div className="form-group d-flex align-items-center align-content-center">
                            <p className="modal-message">Payment success!</p>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default debtDetail