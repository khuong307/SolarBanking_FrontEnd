import {useForm} from "react-hook-form";

function ForgotPasswordMainForm(){
    const { register, handleSubmit, formState: { errors }} = useForm();

    const onSubmit = function(data) {

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
            <div className="login-page-title mb-4">
                FORGOT PASSWORD
            </div>
            <div className="col-lg-12 d-flex justify-content-center container-fluid">
                <div className="p-0 width-100">
                    <div className="auth-innerright">
                        <div className="authentication-box">
                            <div className="mt-2 mb-2">
                                <p className="forgot-password-label ml-4">Updating your new password:</p>
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
                                    <div className="ml-1 mr-lg-5 mt-3 d-flex justify-content-between align-content-center align-items-center">
                                        <button type="submit" className="btn btnLogin mt-3 submit-password-btn">
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