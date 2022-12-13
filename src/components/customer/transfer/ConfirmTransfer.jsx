import React from 'react'
import { NavLink } from 'react-router-dom'

export default function ConfirmTransfer() {
    return (
        <div className="page-body">
            <div className="row">
                <div className="col-lg-12 mt-2" style={{ fontFamily: "Jost" }}>
                    <h3 className="text-center">INFORMATION TRANSFER</h3>
                </div>

                <div className="container mt-3">
                    <form>
                        <h5 className="p-3" style={{ fontFamily: "Jost", backgroundColor: "red", width: "max-content" }}>INFORMATION TRANSFER</h5>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Account Transfer</label>
                            <input disabled type="email" className="form-control" id="exampleFormControlInput1" value="09242552226" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlSelect1">Type transfer</label>
                            <input disabled type="email" className="form-control" id="exampleFormControlInput1" value={"Paid Sender"} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Money by number (VND)</label>
                            <input disabled type="email" className="form-control" id="exampleFormControlInput1" value="9242552226" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1">Money in words</label>
                            <textarea disabled className="form-control" id="exampleFormControlTextarea1" rows={3} defaultValue={"9 million VND"} />
                        </div>


                        <h5 className="p-3" style={{ fontFamily: "Jost", backgroundColor: "red", width: "max-content" }}>INFORMATION RECIPIENT</h5>

                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Account Receiver</label>
                            <input disabled type="email" className="form-control" id="exampleFormControlInput1" value="08242522626"/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="exampleFormControlInput1">Receiver's Full Name</label>
                            <input disabled type="email" className="form-control" id="exampleFormControlInput1" value="Nguyen Van A"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlSelect1">Bank</label>
                            <input disabled type="email" className="form-control" id="exampleFormControlInput1" value="ACB"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1">Content</label>
                            <textarea disabled className="form-control" id="exampleFormControlTextarea1" rows={3} defaultValue={"Money transfer"} />
                        </div>
                        <div className="row justify-content-center p-5">
                            <NavLink to="/customer/transfer/otp" className="btn btn-danger pr-5 pl-5 pt-3 pb-3">CONFIRM</NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
