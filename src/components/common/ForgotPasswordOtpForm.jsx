import {useForm} from "react-hook-form";
import {useLocation, useNavigate} from "react-router-dom";
import ErrorMessage from "./ErrorMessage.jsx";
import {useState, useEffect} from "react";
import axiosInstance from "../../utils/axiosConfig.js";

function ForgotPasswordOtpForm(){
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }} = useForm();
    const { state } = useLocation();
    const { email, userId } = state;
    const [invalidOtp, setInvalidOtp] = useState({
        isSuccess: true,
        message: ''
    });
    const [minutes, setMinutes] = useState(5);
    const [seconds, setSeconds] = useState(0);

    const onSubmit = function(data) {
        axiosInstance.post('/accounts/password/validation/otp', {
            otp: data.otp,
            user_id: userId
        })
            .then((res) => {
                navigate('/forgotPassword/confirm', {
                    state: {
                        resetPasswordToken: res.data.reset_password_token,
                        userId: res.data.user_id
                    }
                });
            })
            .catch((err) => {
                setInvalidOtp({
                    isSuccess: false,
                    message: err.response.data.message
                });
            });
    }

    const changeInvalidOtpToDefault = function() {
        setInvalidOtp({
            isSuccess: true,
            message: ''
        });
    }

    const resendOtpClickedHandler = function() {
        axiosInstance.post('/accounts/password/otp', { email })
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

    return (
        <div style={{backgroundImage: `url(/src/assets/img/background_login.png)`, backgroundSize: "cover", height: "100vh"}}>
            <div className="row">
                <div className="col-lg-12 d-inline-flex justify-content-center mt-2">
                    <img className="rounded-circle img-fluid img-100" src="/src/assets/img/solar_logo.png"/>
                </div>
                <div className="col-lg-12 text-center">
                    <div className="logo-heading">
                        SOLAR BANKING
                    </div>
                    <p className="logo-description">
                        Your first choice for monetary needs.
                    </p>
                </div>
            </div>
            <div className="login-page-title mb-4" style={{color: "white"}}>
                FORGOT PASSWORD
            </div>
            <div className="col-lg-12 d-flex justify-content-center container-fluid">
                <div className="p-0 width-100">
                    <div className="auth-innerright">
                        <div className="authentication-box">
                            <div className="mt-2" style={{marginBottom: "100px"}}>
                                <p className="forgot-password-label ml-4" style={{color: "white"}}>Kindly enter the OTP code which sent to your provided email:</p>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mr-lg-5 form-group d-flex align-items-center align-content-center">
                                        <input className="form-control otp-input ml-4" placeholder="Enter OTP code" type="text"
                                               {...register("otp", {
                                                   required: true,
                                               })}
                                        />
                                    </div>
                                    {errors?.otp?.type === "required" &&
                                        <p className="error-input"><i className="fa fa-warning mr-2 ml-4"></i>OTP code is required!</p>
                                    }
                                    <div className="d-flex justify-content-between ml-4">
                                        {seconds > 0 || minutes > 0 ? (
                                            <p className="time-remaining" style={{color: "white"}}>
                                                Time Remaining:
                                                <span className="time-counter" style={{color: "#FFB800"}}>
                                                    {minutes < 10 ? ` 0${minutes}` : minutes}:
                                                    {seconds < 10 ? `0${seconds}` : seconds}
                                                </span>
                                            </p>
                                        ) : (
                                            <p className="time-remaining">Didn't receive code?</p>
                                        )}
                                        {seconds > 0 || minutes > 0 ? (
                                            <div className="resend-otp-link-disabled mr-5">
                                                <span>Resend OTP?</span>
                                            </div>
                                        ) : (
                                            <div className="resend-otp-link-active mr-5">
                                                <span onClick={resendOtpClickedHandler}>Resend OTP?</span>
                                            </div>
                                        )}
                                    </div>
                                    {!invalidOtp.isSuccess &&
                                        <ErrorMessage error={invalidOtp.message} resetState={changeInvalidOtpToDefault} />}
                                    <div className="ml-1 mr-lg-5 mt-3 d-flex justify-content-between align-content-center align-items-center">
                                        <button type="submit" className="btn btnLogin2 mt-3 verify-otp-btn">
                                            Verify
                                            <i className="fa fa-arrow-right ml-2"></i>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPasswordOtpForm;