import {useForm} from "react-hook-form";
import {useState} from "react";
import ReCAPTCHA from "react-google-recaptcha";
import {Link} from "react-router-dom";
import axiosInstance from "../../utils/axiosConfig.js";
import { useNavigate, useLocation } from "react-router-dom";
import ErrorMessage from "./ErrorMessage.jsx";

function LoginForm(){
    const navigate = useNavigate();
    const location = useLocation();
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
        axiosInstance.post(`/accounts/authentication`, {
            username: data.username,
            password: data.password
        }).then((res) => {
                console.log(res)
                let retUrl = '';

                localStorage.solarBanking_accessToken = res.data.accessToken;
                localStorage.solarBanking_refreshToken = res.data.refreshToken;
                localStorage.solarBanking_userId = res.data.account.user_id;
                localStorage.solarBanking_username = res.data.account.username;
                localStorage.solarBanking_userRole = res.data.account.role;

                if (location.state?.from?.pathname === '/account/changePassword') {
                    retUrl = '/account/changePassword';
                    navigate(retUrl);
                    return;
                }

                if (res.data.account.role === ROLE.CUSTOMER) {
                    retUrl = location.state?.from?.pathname || '/customer';
                    retUrl = retUrl.includes('/customer') ? retUrl : '/customer';
                }
                else if (res.data.account.role === ROLE.EMPLOYEE) {
                    retUrl = location.state?.from?.pathname || '/employee';
                    retUrl = retUrl.includes('/employee') ? retUrl : '/employee';
                }
                else {
                    retUrl = location.state?.from?.pathname || '/admin';
                    retUrl = retUrl.includes('/admin') ? retUrl : '/admin';
                }

                navigate(retUrl);
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
        <div style={{backgroundImage: `url(/src/assets/img/background_login.png)`, backgroundSize: "cover", height: "fit-content"}}>
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
            <div className="login-page-title" style={{color: "white"}}>
                LOGIN
            </div>
            <div className="col-lg-12 d-flex justify-content-center container-fluid">
                <div className="p-0 width-100">
                    <div className="auth-innerright">
                        <div className="authentication-box">
                            <div className="mt-2" style={{marginBottom: "100px"}}>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mr-lg-5 form-group d-flex align-items-center align-content-center">
                                        <i className="fa fa-user mr-2 user-icon" style={{color: "#FFB800"}}></i>
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
                                        <i className="fa fa-lock mr-2 password-icon" style={{color: "#FFB800"}} ></i>
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
                                        <Link to="/forgotPassword/email" className="forget_password_link" style={{color: "#FFB800"}}>
                                            Forget password?
                                        </Link>
                                    </div>
                                    <div className="mr-lg-5 d-flex justify-content-between align-content-center align-items-center">
                                        <button type="submit" disabled={!verified} className="btn btnLogin2 mt-3 login-btn">
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