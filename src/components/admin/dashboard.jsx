import React from 'react'
import {useEffect, useState} from 'react'
import TableTransactionList from "./transactionList/table_transaction_list";
import axiosInstance from "../../utils/axiosConfig.js";
import "/src/assets/js/datatables/jquery.dataTables.min.js"
import Form from 'react-bootstrap/Form';
import 'react-datepicker/dist/react-datepicker.css'
import { getBankListExSLBApi } from '../redux/reducer/transferReducer'
import { useDispatch, useSelector } from 'react-redux'
import { DatePicker, Select } from 'antd'

function Dashboard(){
    const banks = useSelector(state => state.transferReducer.banks)
    const dispatch = useDispatch()

    const [isExternal, setIsExternal] = useState(true)
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("")
    const [selectedBank, setSelectedBank] = useState("")
    const [transactionList, setTransactionList] = useState('')
    const [totalTransactionAmount, settotalTransactionAmount] = useState('')
    function setTypeOfTransaction (e) {
        console.log(banks)
        if (e.target.id === "external-transaction-tab") {
            setIsExternal(true);
        } else {
            setIsExternal(false);
        }
    }
    function getTransactionList (){
        
        axiosInstance.get(`/admin/transactions`, {
            headers: {
                is_external: isExternal.toString(),
                start_date: startDate,
                end_date: endDate,
                selected_bank: selectedBank
            }
        }).then((result)=> {
            if (result.data.isSuccess == true){
                setTransactionList(result.data.transactionList)
                settotalTransactionAmount(result.data.totalTransactionAmount)
            }
            else{
                alert("Can not get transaction list")
            }
        }).catch((err)=>{
            alert(err)
        })
    }
    useEffect(() => {
        getTransactionList()
        dispatch(getBankListExSLBApi())
        },[isExternal, startDate, endDate, selectedBank])

    return (
        <div className="page-body">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12 mt-2" style={{fontFamily: "Jost"}}>
                        <h4>DASHBOARD</h4>
                        <small style={{fontFamily: "Jost", fontSize: "15px", color: "gray"}}>Solar Banking Admin Panel</small>
                    </div>
                </div>
            </div>
            <div className="card height-equal mt-4" style={{fontFamily: "Jost"}}>
                <div className="card-body">
                    <ul className="nav nav-pills nav-warning" id="pills-icontab" role="tablist">
                        <li className="nav-item"  onClick={setTypeOfTransaction}>
                            <a className="nav-link active" id="external-transaction-tab" data-toggle="tab" style={{fontSize: "15px"}}
                                href="#externalTransaction" role="tab" aria-controls="externalTransaction" 
                                aria-selected="true"><i className="fa fa-line-chart"></i>External Transactions</a>
                        </li>
                        <li className="nav-item" onClick={setTypeOfTransaction}>
                            <a className="nav-link" id="internal-transaction-tab" data-toggle="tab" style={{fontSize: "15px"}}
                                href="#internalTransaction" role="tab" aria-controls="internalTransaction" 
                                aria-selected="false">
                                <i className="icofont icofont-coins"></i> Internal Transactions</a>
                        </li>
                    </ul>
                    <div className="list-choice-form d-flex pt-2">
                        <div className='start-date-form pl-4'>
                            <Form.Label> Start Date </Form.Label>
                            <div>
                                <DatePicker
                                    selected={startDate}
                                    dateFormat='yyyy/MM/dd'
                                    onChange={(date)=>{setStartDate(date)}}
                                />
                            </div>
                        </div>
                        <div className='end-date-form pl-5'>
                            <Form.Label>End Date</Form.Label>
                            <div>
                                <DatePicker
                                    selected={endDate}
                                    dateFormat='yyyy/MM/dd'
                                    onChange={(date)=>{setEndDate(date)}}
                                />
                            </div>
                        </div>
                        <div className='selected-bank-form pl-5'>
                            <Form.Label>Select Bank</Form.Label>
                            <div>
                                <Select
                                    placeholder="Select a bank"
                                    style={{ width:150, height: "100" }}
                                    value={selectedBank}
                                    onChange={(value, option) => {
                                        setSelectedBank(value)
                                    }}
                                    options={banks}
                                />
                            </div>
                        </div>
                        <div className='total-transaction-amount-field pl-5'>
                            <Form.Label>Total Transaction Amount:</Form.Label>
                            <div>{totalTransactionAmount}</div>
                        </div>
                    </div>
                    <div className="tab-content" id="pills-icontabContent">
                        <div className="tab-pane fade show active" id="externalTransaction" role="tabpanel"
                                aria-labelledby="external-transaction-tab">
                            <TableTransactionList transactionList={transactionList}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}
export default Dashboard
