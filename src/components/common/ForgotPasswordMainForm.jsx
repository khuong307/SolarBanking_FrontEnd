import {useForm} from "react-hook-form";
import {useLocation, useNavigate} from "react-router-dom";
import ErrorMessage from "./ErrorMessage.jsx";
import {useState} from "react";
import axiosInstance from "../../utils/axiosConfig.js";

function ForgotPasswordMainForm(){
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }} = useForm();
    const { state } = useLocation();
    const { resetPasswordToken, userId } = state;
    const [resetFailed, setResetFailed] = useState({
        isSuccess: true,
        message: ''
    });

    const onSubmit = function(data) {
        if (data.newPassword !== data.verifiedPassword) {
            setResetFailed({
               isSuccess: false,
               message: 'The password and verified password do not match!'
            });
        }
        else {
            axiosInstance.post('/accounts/password', {
                password: data.newPassword,
                reset_password_token: resetPasswordToken,
                user_id: userId
            })
                .then((res) => {
                    navigate('/');
                })
                .catch((err) => {
                    setResetFailed({
                        isSuccess: false,
                        message: err.response.data.message
                    });
                });
        }
    }

    const changeResetFailedToDefault = function() {
        setResetFailed({
            isSuccess: true,
            message: ''
        });
    }

    return (
        <div style={{backgroundImage: `url(/src/assets/img/background_login.png)`, backgroundSize: "cover"}}>
            <div className="row mt-2">
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
                                <p className="forgot-password-label ml-4" style={{color: "white"}}>Updating your new password:</p>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mr-lg-5 form-group d-flex align-items-center align-content-center">
                                        <input className="form-control password-input ml-4" placeholder="Enter new password" type="password"
                                               {...register("newPassword", {
                                                   required: true,
                                               })}
                                        />
                                    </div>
                                    {errors?.newPassword?.type === "required" &&
                                        <p className="error-input"><i className="fa fa-warning mr-2 ml-4"></i>New password is required!</p>
                                    }
                                    <div className="mr-lg-5 form-group d-flex align-items-center align-content-center">
                                        <input className="form-control password-input ml-4" placeholder="Enter verified password" type="password"
                                               {...register("verifiedPassword", {
                                                   required: true,
                                               })}
                                        />
                                    </div>
                                    {errors?.verifiedPassword?.type === "required" &&
                                        <p className="error-input"><i className="fa fa-warning mr-2 ml-4"></i>Verified password is required!</p>
                                    }
                                    {!resetFailed.isSuccess &&
                                        <ErrorMessage error={resetFailed.message} resetState={changeResetFailedToDefault} />}
                                    <div className="ml-1 mr-lg-5 mt-3 d-flex justify-content-between align-content-center align-items-center">
                                        <button type="submit" className="btn btnLogin2 mt-3 submit-password-btn">
                                            Submit
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

export default ForgotPasswordMainForm;