import React from 'react'
import { NavLink } from 'react-router-dom'

export default function InternalTransfer() {
    return (
        <div className="page-body">
            <div className="row">
                <div className="col-lg-12 mt-2" style={{ fontFamily: "Jost" }}>
                    <h3 className="text-center">INTERNAL TRANSFER</h3>
                </div>
            </div>

            <div className="container mt-3">
                <form>
                    <h5 className="p-3" style={{ fontFamily: "Jost", backgroundColor: "red", width: "max-content" }}>INFORMATION TRANSFER</h5>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Account Transfer</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect1">Type transfer</label>
                        <select className="form-control" id="exampleFormControlSelect1">
                            <option>Paid Sender</option>
                            <option>Paid Recipient</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Money by number (VND)</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Money in words</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} defaultValue={""} />
                    </div>


                    <h5 className="p-3" style={{ fontFamily: "Jost", backgroundColor: "red", width: "max-content" }}>INFORMATION RECIPIENT</h5>

                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Account Receiver</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect1">Bank</label>
                        <select className="form-control" id="exampleFormControlSelect1">
                            <option>ACB</option>
                            <option>Techcombank</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Content</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} defaultValue={""} />
                    </div>
                    <div className="row justify-content-center p-5">
                        <NavLink to="/customer/transfer/confirm" className="btn btn-danger pr-5 pl-5 pt-3 pb-3">Continue</NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}
