import { useFormik } from 'formik'
import React from 'react'
import { NavLink } from 'react-router-dom'

export default function OtpTransfer() {
    const formik = useFormik({
        enableReinitialize:true,
        initialValues:{
            code1:"",
            code2:"",
            code3:"",
            code4:"",
            code5:"",
            code6:""
        },
        onSubmit: values => {
            let otpCode = ""
            for(const data in values) {
                otpCode +=values[data]
            }
            console.log(otpCode)
        }
    })

    return (
        <div className="page-body">
            <div className="container d-flex justify-content-center align-items-center">
                <div className="card text-center">
                    <div className="card-header p-5">
                        <h1 className="mb-2">OTP VERIFICATION</h1>
                        <div>
                            <h3>code has been send to ******1258</h3>
                            <img src="/src/assets/img/phone.png" style={{height:300}}  alt="phone.png" />
                        </div>
                    </div>
                    <div className="input-container d-flex flex-row justify-content-center mt-2">
                        <input type="text" name="code1" className="m-1 text-center form-control rounded" style={{fontSize:30}} 
                        maxLength={1} onChange={formik.handleChange}/>
                        <input type="text" name='code2' className="m-1 text-center form-control rounded " style={{fontSize:30}}  
                        maxLength={1} onChange={formik.handleChange}/>
                        <input type="text"  name='code3' className="m-1 text-center form-control rounded " style={{fontSize:30}}  
                        maxLength={1} onChange={formik.handleChange}/>
                        <input type="text"  name='code4' className="m-1 text-center form-control rounded" style={{fontSize:30}} 
                         maxLength={1} onChange={formik.handleChange}/>
                        <input type="text"  name='code5' className="m-1 text-center form-control rounded" style={{fontSize:30}}  
                        maxLength={1} onChange={formik.handleChange}/>
                        <input type="text"  name='code6' className="m-1 text-center form-control rounded" style={{fontSize:30}} 
                        maxLength={1} onChange={formik.handleChange}/>
                    </div>
                    <div>
                        <h5>
                            Didn't get the OTP
                            <NavLink to="#" className="ml-2 text-decoration-none">Resend</NavLink>
                        </h5>
                    </div>
                    <div className="row justify-content-center p-5">
                            <button type='submit' className="btn btn-danger pr-5 pl-5 pt-3 pb-3" onClick={formik.handleSubmit}>CONFIRM</button>
                        </div>
                </div>
            </div>
        </div>
    )
}
