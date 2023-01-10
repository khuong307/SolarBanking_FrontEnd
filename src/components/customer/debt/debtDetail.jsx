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
    const [payMessage,setPayMessage] = useState('');
    const [reqPayment,setReqPayment] = useState('Do you want to pay off this debt?');
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
    //send otp and check balance
    const handleSubmitConfirmModal = ()=>{
        //check balance
        const debt_amount = parseInt(debtDetail.debt_amount);
        axiosInstance.get(`/debtList/${userId}/checkBalance?amount=${debt_amount}`)
            .then((res)=>{
                if (res.data.isEnough === true){
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
                                setInvalidOtp({
                                    isSuccess: false,
                                    message: res.data.message
                                });
                            }
                        })
                        .catch((err)=>{
                            setInvalidOtp({
                                isSuccess: false,
                                message: err.response.data.message
                            });
                        })
                }
                else{
                    setReqPayment(res.data.message);
                }
            })
            .catch((err)=>{
                setReqPayment(err.message);
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
                    setPayMessage("Payment Successful!");
                }
                else{
                    setInvalidOtp({
                        isSuccess: false,
                        message: res.data.message
                    });
                    setPayMessage(res.data.message);
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
                    setDebtDetail({...res.data.objDebt});
                    const txtStatus = res.data.objDebt.debt_status;
                    setStatusPayment(res.data.objDebt.debt_status);
                    if (parseInt(userId) === parseInt(res.data.objDebt.user_id)){
                        setIsPaid(true);
                        if (txtStatus === "PAID"){
                            setColorStatus("green");
                        }
                        else if (txtStatus === "NOT PAID"){
                            setColorStatus("red");
                        }
                        else{
                            setColorStatus("black");
                        }
                    }
                    else{
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
                            setIsPaid(true);
                        }
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
                    <div className="card">
                        <div className="text-center mt-4">
                            <h5><i className="fa fa-info-circle mr-1"></i>Debt Information</h5>
                        </div>
                        <div className="row card-body">
                            <div className="col-lg-12 d-flex justify-content-center align-content-center align-items-center">
                                <div className="col-lg-4">
                                    <label className="col-form-label">Code:</label>
                                    <input className="form-control" value={debtDetail.debt_id} readOnly="true" style={{width: "fit-content"}}/>
                                </div>
                                <div className="col-lg-4">
                                    <label className="col-form-label">Debt Account Number:</label>
                                    <input className="form-control" value={debtDetail.debt_account_number} readOnly="true" style={{width: "fit-content"}}/>
                                </div>
                            </div>
                            <div className="col-lg-12 d-flex justify-content-center align-content-center align-items-center">
                                <div className="col-lg-4">
                                    <label className="col-form-label">Amount:</label>
                                    <input className="form-control" value={numeral(debtDetail.debt_amount).format('0,0') + " VND"} readOnly="true" style={{width: "fit-content"}}/>
                                </div>
                                <div className="col-lg-4">
                                    <label className="col-form-label">Status:</label>
                                    <input className="form-control" value={statusPayment} style={{width: "fit-content"}} readOnly="true"/>
                                </div>
                            </div>
                            <div className="col-lg-12 d-flex justify-content-center align-content-center align-items-center">
                                <div className="col-lg-4">
                                    <label className="col-form-label">Date & Time:</label>
                                    <input className="form-control" value={formateDateTime(debtDetail.debt_created_at)} readOnly="true" style={{width: "fit-content"}}/>
                                </div>
                                <div className="col-lg-4">
                                    <label className="col-form-label">Message:</label>
                                    <input className="form-control" value={debtDetail.debt_message} style={{width: "fit-content"}} readOnly="true"/>
                                </div>
                            </div>
                            {
                                debtDetail.debt_cancel_message != "" &&
                                <div className="col-lg-12 mt-2 d-flex justify-content-center align-content-center align-items-center">
                                    <div className="col-lg-4">
                                        <label className="col-form-label">Reason To Cancel:</label>
                                        <input className="form-control" value={debtDetail.debt_cancel_message} readOnly="true" style={{width: "fit-content"}}/>
                                    </div>
                                </div>
                            }
                            <div className="col-lg-12 d-flex justify-content-center mt-4">
                                {!isPaid && <button className="btn mr-2 btnLogin" onClick={handleOpenConfirmModal}><i className="fa fa-check-circle-o mr-1"></i>Pay Debt</button>}
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
                            <p className="modal-message">{reqPayment}</p>
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
                            <p className="modal-message">{payMessage}</p>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default debtDetail