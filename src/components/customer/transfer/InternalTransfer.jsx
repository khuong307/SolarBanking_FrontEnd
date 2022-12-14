import React from 'react'
import { useNavigate } from 'react-router-dom'
import converter from "number-to-words"
import * as Yup from "yup"
import { useFormik } from 'formik'

export default function InternalTransfer() {
    const navigate = useNavigate()

    const toCurrency = (number) => {
        return new Intl.NumberFormat('en-US').format(number);
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            accountTransfer: "",
            typeTransfer: "Paid Sender",
            moneyNumber: 0,
            accountReceive: "",
            bank: "ACB",
            content: "",
        },
        validationSchema: Yup.object().shape({
            accountTransfer: Yup.string().min(15, "Must be exactly 15 digits").max(15, "Must be exactly 15 digits")
                .required("Required").matches(/^[0-9]+$/, "Must be only digits"),

            moneyNumber: Yup.number().required("Required").positive("Must be positive number").integer(),

            accountReceive: Yup.string().min(15, "Must be exactly 15 digits").max(15, "Must be exactly 15 digits")
                .required("Required").matches(/^[0-9]+$/, "Must be only digits"),
        }),
        onSubmit: values => {
            console.log(values)
        }
    })



    return (
        <div className="page-body">
            <div className="row">
                <div className="col-lg-12 mt-2" style={{ fontFamily: "Jost" }}>
                    <h3 className="text-center">INTERNAL TRANSFER</h3>
                </div>
            </div>

            <div className="container mt-3">
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                        <label>Account Transfer</label>
                        <input name='accountTransfer' type="text" className="form-control" onChange={formik.handleChange} />
                        {formik.touched.accountTransfer && formik.errors.accountTransfer ? <div className='text-danger'>{formik.errors.accountTransfer}</div> : null}
                    </div>
                    <div className="form-group">
                        <label>Type transfer</label>
                        <select name='typeTransfer' className="form-control" onChange={formik.handleChange}>
                            <option value="SRC">Paid Sender</option>
                            <option value="DES">Paid Recipient</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Money by number (VND)</label>
                        <input name="moneyNumber" type="number" className="form-control" onChange={formik.handleChange}/>
                        {formik.touched.moneyNumber && formik.errors.moneyNumber ? <div className='text-danger'>{formik.errors.moneyNumber}</div> : null}
                    </div>
                    <div className="form-group">
                        <label >Money in words</label>
                        <textarea name="moneyWord" disabled className="form-control" rows={3} value={converter.toWords(Number(formik.values.moneyNumber)).toUpperCase() + " VND"} />
                    </div>

                    <div className="form-group">
                        <label>Account Receiver</label>
                        <input name='accountReceive' type="text" className="form-control" onChange={formik.handleChange} />
                        {formik.touched.accountReceive && formik.errors.accountReceive ? <div className='text-danger'>{formik.errors.accountReceive}</div> : null}
                    </div>
                    <div className="form-group">
                        <label>Bank</label>
                        <select name='bank' className="form-control" onChange={formik.handleChange}>
                            <option value="ACB">ACB</option>
                            <option value="Techcombank">Techcombank</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Content</label>
                        <textarea name='content' className="form-control" rows={3} defaultValue={""} onChange={formik.handleChange} />
                    </div>
                    <div className="row justify-content-center p-5">
                        <button type='submit' className="btn btn-danger pr-5 pl-5 pt-3 pb-3" onClick={formik.handleSubmit}>CONTINUE</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
