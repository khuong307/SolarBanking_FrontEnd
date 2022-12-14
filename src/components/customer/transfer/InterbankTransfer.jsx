import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import converter from "number-to-words"
import * as Yup from "yup"
import { useFormik } from 'formik'
import { NumericFormat } from 'react-number-format';
import { AutoComplete, Select } from 'antd'
import { useSelector } from 'react-redux'

export default function InterbankTransfer() {
    const navigate = useNavigate()

    const banks = useSelector(state => state.transferReducer.banks)
    const receiver = useSelector(state => state.transferReducer.receiver)

    const [value, setValue] = useState('');
    const [options, setOptions] = useState(receiver);
    const onSearch = (searchText) => {
      
    };
    const onSelect = (data) => {
      console.log('onSelect', data);
    };

    const onChange = (value) => {
        console.log(`selected ${value}`);
        formik.setFieldValue("bank", value)
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            accountTransfer: "092422526673773",
            typeTransfer: "Paid Sender",
            moneyNumber: "",
            accountReceive: "",
            bank: "ACB",
            content: "",
        },
        validationSchema: Yup.object().shape({
            moneyNumber: Yup.string().min(5, "Must be lowest 5 digits")
                .required("Required"),

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
                    <h3 className="text-center">INTERBANK TRANSFER</h3>
                </div>
            </div>

            <div className="container mt-3">
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                        <label>Account Transfer</label>
                        <input disabled name='accountTransfer' type="text" className="form-control" value={formik.values.accountTransfer} />
                        {formik.errors.accountTransfer ? <div className='text-danger'>{formik.errors.accountTransfer}</div> : null}
                    </div>
                    <div className="form-group">
                        <label>Type transfer</label>
                        <select name='typeTransfer' className="form-control" onChange={formik.handleChange}>
                            <option value="SRC">Paid Sender</option>
                            <option value="DES">Paid Recipient</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Money in number (VND)</label>
                        <NumericFormat name='moneyNumber' className='form-control' thousandSeparator="," onChange={formik.handleChange} />
                        {formik.errors.moneyNumber ? <div className='text-danger'>{formik.errors.moneyNumber}</div> : null}
                    </div>
                    <div className="form-group">
                        <label >Money in words</label>
                        <textarea name="moneyWord" disabled className="form-control" rows={3}
                            value={
                                formik.values.moneyNumber === "" ? "0 VND" :
                                    converter.toWords(Number(formik.values.moneyNumber.replace(/,/g, ""))).toUpperCase() + " VND"
                            } />
                    </div>

                    <div className="form-group">
                        <label>Account Receiver</label>
                        <AutoComplete
                            options={options}
                            name="accountReceive"
                            className="form-control"
                            onSelect={onSelect}
                            onSearch={onSearch}
                            placeholder="input here"
                        />
                        {formik.errors.accountReceive ? <div className='text-danger'>{formik.errors.accountReceive}</div> : null}
                    </div>

                    <div className="form-group">
                        <label>Bank</label>
                        <Select
                            className='form-control'
                            showSearch
                            placeholder="Select a bank"
                            optionFilterProp="children"
                            name="bank"
                            onChange={onChange}
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={banks}
                        />
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
