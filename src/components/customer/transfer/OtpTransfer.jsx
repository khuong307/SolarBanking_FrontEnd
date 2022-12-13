import React from 'react'
import { NavLink } from 'react-router-dom'

export default function OtpTransfer() {
    return (
        <div className="page-body">
            <div className="container d-flex justify-content-center align-items-center">
                <div className="card text-center">
                    <div className="card-header p-5">
                        <h1 className="mb-2">OTP VERIFICATION</h1>
                        <div>
                            <h3>code has been send to ******1258</h3>
                        </div>
                    </div>
                    <div className="input-container d-flex flex-row justify-content-center mt-2">
                        <input type="text" className="m-1 text-center form-control rounded" style={{fontSize:30}} maxLength={1} />
                        <input type="text" className="m-1 text-center form-control rounded " style={{fontSize:30}}  maxLength={1} />
                        <input type="text" className="m-1 text-center form-control rounded " style={{fontSize:30}}  maxLength={1} />
                        <input type="text" className="m-1 text-center form-control rounded" style={{fontSize:30}}  maxLength={1} />
                        <input type="text" className="m-1 text-center form-control rounded" style={{fontSize:30}}  maxLength={1} />
                    </div>
                    <div>
                        <h5>
                            Didn't get the OTP
                            <a href="#" className="ml-2 text-decoration-none">Resend</a>
                        </h5>
                    </div>
                    <div className="row justify-content-center p-5">
                            <NavLink to="/customer/transfer/otp" className="btn btn-danger pr-5 pl-5 pt-3 pb-3">CONFIRM</NavLink>
                        </div>
                </div>
            </div>
        </div>
    )
}
