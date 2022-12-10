import {set, useForm} from "react-hook-form";
import {useState} from "react";
import ReCAPTCHA from "react-google-recaptcha";

function LoginForm(){
    const { register, handleSubmit, formState: { errors }} = useForm()
    const onSubmit = (data) => {alert(JSON.stringify(data));}

    const [verified, setVerified] = useState(false)
    const captchaChanged = function (){
        setVerified(!verified)
    }

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(!passwordShown);
    };
    return (
        <div>
            <div className="row mt-2">
                <div className="col-lg-12 d-inline-flex justify-content-center">
                    <img className="rounded-circle img-fluid img-100" src="/src/assets/img/solar_logo.png"/>
                </div>
                <div className="col-lg-12 text-center">
                    <div style={{fontFamily: "iCielBCCubano", fontSize: "40px", color: "#FFB800"}}>
                        SOLAR BANKING
                    </div>
                    <p style={{fontFamily: "Jost", color: "gray"}}>
                        Your first choice for monetary needs.
                    </p>
                </div>
            </div>
            <div style={{fontFamily: "Jost", fontSize: "30px", textAlign: "center"}}>
                LOGIN
            </div>
            <div className="col-lg-12 d-flex justify-content-center container-fluid">
                <div className="p-0 width-100">
                    <div className="auth-innerright">
                        <div className="authentication-box">
                            <div className="mt-2 mb-2">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mr-lg-5 form-group d-flex align-items-center align-content-center">
                                        <i className="fa fa-user mr-2" style={{fontSize: "20px"}}></i>
                                        <input className="form-control" placeholder="example@gmail.com" type="text" style={{width: "100%", fontFamily:"Jost"}}
                                               {...register("username", {
                                                   required: true,
                                               })}
                                        />
                                    </div>
                                    {errors?.username?.type === "required" &&
                                        <p style={{fontFamily: "Jost", color: "#FFB800"}}><i className="fa fa-warning mr-2"></i>Username is required!</p>
                                    }
                                    <div className="mr-lg-5 form-group d-flex align-items-center align-content-center" style={{position: "relative"}}>
                                        <i className="fa fa-lock mr-2" style={{fontSize: "20px"}}></i>
                                        <input className="form-control" style={{width: "100%", fontFamily:"Jost"}} type = {passwordShown ? "text" : "password"}
                                               {...register("password", {
                                                   required: true,
                                               })}
                                        />

                                        {
                                            passwordShown == true?
                                                <i className="fa fa-eye" style={{color: "#FFB800", position: "absolute", bottom: "12px", right: "2%"}} onClick={togglePasswordVisiblity}></i>:
                                                <i className="fa fa-eye-slash" style={{color: "#FFB800", position: "absolute", bottom: "12px", right: "2%"}} onClick={togglePasswordVisiblity}></i>
                                        }
                                    </div>
                                    {errors?.password?.type === "required" &&
                                        <p style={{fontFamily: "Jost", color: "#FFB800"}}><i className="fa fa-warning mr-2"></i>Password is required!</p>
                                    }
                                    <div className="mr-lg-5 d-flex justify-content-between align-content-center align-items-center" style={{marginLeft: "20px", fontFamily: "Jost"}}>
                                        <ReCAPTCHA style={{fontFamily: "Jost", backgroundColor: "transparent"}}
                                            sitekey="6Le_MWAjAAAAAHhbtRVfhQtGdrOz7M0HiYfqCyU1" onChange = {captchaChanged}
                                        />
                                        <a style={{textDecoration: "underline"}}>
                                            Forget password?
                                        </a>
                                    </div>
                                    <div className="mr-lg-5 d-flex justify-content-between align-content-center align-items-center">
                                        <button type="submit" disabled={!verified} className="btn btnLogin mt-2" style={{marginLeft: "20px", width: "100%", fontFamily: "Jost"}}>
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
    )
}
export default LoginForm