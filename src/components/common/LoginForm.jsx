import {useForm} from "react-hook-form";
import {useState} from "react";
import ReCAPTCHA from "react-google-recaptcha";
import {Link} from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "./ErrorMessage.jsx";

function LoginForm(){
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }} = useForm();
    const [passwordShown, setPasswordShown] = useState(false);
    const [verified, setVerified] = useState(false);
    const [loginFailed, setLoginFailed] = useState({
        isSuccess: true,
        message: ''
    });
    const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
    const ROLE = {
        CUSTOMER: 'Customer',
        EMPLOYEE: 'Employee',
        ADMIN: 'Admin'
    }

    const onSubmit = function(data) {
        axios.post('http://localhost:3030/api/accounts/authentication', data)
            .then((res) => {
                localStorage.solarBanking_accessToken = res.data.access_token;
                localStorage.solarBanking_refreshToken = res.data.refresh_token;
                localStorage.solarBanking_userId = res.data.account.user_id;
                localStorage.solarBanking_username = res.data.account.username;
                localStorage.solarBanking_userRole = res.data.account.role;

                if (res.data.account.role === ROLE.CUSTOMER)
                    navigate('/customer');
                else if (res.data.account.role === ROLE.EMPLOYEE)
                    navigate('/employee');
                else
                    navigate('/admin');
            })
            .catch((err) => {
                setLoginFailed({
                    isSuccess: false,
                    message: err.response.data.message
                });
            });
    }

    const captchaChanged = function() {
        setVerified(!verified);
    };

    const togglePasswordVisibility = function() {
        setPasswordShown(!passwordShown);
    };

    const changeLoginFailedToDefault = function() {
        setLoginFailed({
            isSuccess: true,
            message: ''
        });
    }

    return (
        <div>
            <div className="row mt-2">
                <div className="col-lg-12 d-inline-flex justify-content-center">
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
            <div className="login-page-title">
                LOGIN
            </div>
            <div className="col-lg-12 d-flex justify-content-center container-fluid">
                <div className="p-0 width-100">
                    <div className="auth-innerright">
                        <div className="authentication-box">
                            <div className="mt-2 mb-2">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mr-lg-5 form-group d-flex align-items-center align-content-center">
                                        <i className="fa fa-user mr-2 user-icon"></i>
                                        <input className="form-control username-input" placeholder="Enter username" type="text"
                                               {...register("username", {
                                                   required: true,
                                               })}
                                        />
                                    </div>
                                    {errors?.username?.type === "required" &&
                                        <p className="error-input"><i className="fa fa-warning mr-2"></i>Username is required!</p>
                                    }
                                    <div className="mr-lg-5 form-group d-flex align-items-center align-content-center" style={{position: "relative"}}>
                                        <i className="fa fa-lock mr-2 password-icon"></i>
                                        <input className="form-control password-input" placeholder="Enter password" type={passwordShown ? "text" : "password"}
                                               {...register("password", {
                                                   required: true,
                                               })}
                                        />
                                        {
                                            passwordShown ?
                                                <i className="fa fa-eye eye-icon" onClick={togglePasswordVisibility}></i>:
                                                <i className="fa fa-eye-slash eye-icon" onClick={togglePasswordVisibility}></i>
                                        }
                                    </div>
                                    {errors?.password?.type === "required" &&
                                        <p className="error-input"><i className="fa fa-warning mr-2"></i>Password is required!</p>
                                    }
                                    {!loginFailed.isSuccess &&
                                        <ErrorMessage error={loginFailed.message} resetState={changeLoginFailedToDefault} />}
                                    <div className="mr-lg-5 d-flex justify-content-between align-content-center align-items-center recaptcha-wrapper">
                                        <ReCAPTCHA className="recaptcha" sitekey={RECAPTCHA_SITE_KEY} onChange={captchaChanged} />
                                        <Link to="/forgotPassword/email" className="forget_password_link">
                                            Forget password?
                                        </Link>
                                    </div>
                                    <div className="mr-lg-5 d-flex justify-content-between align-content-center align-items-center">
                                        <button type="submit" disabled={!verified} className="btn btnLogin mt-3 login-btn">
                                            LOGIN
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

export default LoginForm;