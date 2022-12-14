import React from 'react'
import { NavLink } from 'react-router-dom'
import converter from "number-to-words"

export default function ConfirmTransfer() {
    return (
        <div className="page-body">
            <div className="row">
                <div className="col-lg-12 mt-2" style={{ fontFamily: "Jost" }}>
                    <h3 className="text-center">INFORMATION TRANSFER</h3>
                </div>

                <div className="container mt-3">
                    <form>
                        <div className="form-group">
                            <label>Account Transfer</label>
                            <input disabled type="email" className="form-control" value="09242552226" />
                        </div>
                        <div className="form-group">
                            <label >Type transfer</label>
                            <input disabled type="email" className="form-control" value={"Paid Sender"} />
                        </div>
                        <div className="form-group">
                            <label>Money by number (VND)</label>
                            <input disabled type="email" className="form-control" value="9242552226" />
                        </div>
                        <div className="form-group">
                            <label >Money in words</label>
                            <textarea disabled className="form-control" rows={3} value={converter.toWords(9000000).toUpperCase()+ " VND"} />
                        </div>

                        <div className="form-group">
                            <label >Account Receiver</label>
                            <input disabled type="email" className="form-control"  value="08242522626"/>
                        </div>
                        <div className='form-group'>
                            <label >Receiver's Full Name</label>
                            <input disabled type="email" className="form-control" value="Nguyen Van A"/>
                        </div>
                        <div className="form-group">
                            <label>Bank</label>
                            <input disabled type="email" className="form-control" value="ACB"/>
                        </div>
                        <div className="form-group">
                            <label>Content</label>
                            <textarea disabled className="form-control"  rows={3} defaultValue={"Money transfer"} />
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
