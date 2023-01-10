import React from 'react'
import {useEffect, useState} from 'react'
import TableTransactionList from "./transactionList/table_transaction_list";
import axiosInstance from "../../utils/axiosConfig.js";
import "/src/assets/js/datatables/jquery.dataTables.min.js"
import Form from 'react-bootstrap/Form';
import { getBankListExSLBApi } from '../redux/reducer/transferReducer'
import { useDispatch, useSelector } from 'react-redux'
import { DatePicker, Select } from 'antd'
import {formatMoney} from "../redux/helper_functions";

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
        if (e.target.id === "external-transaction-tab") {
            setIsExternal(true);
        } else {
            setIsExternal(false);
        }
    }
    async function getTransactionList (){
        await axiosInstance.get(`/admin/transactions`, {
            headers: {
                access_token: localStorage.getItem("solarBanking_accessToken"),
                refresh_token: localStorage.getItem("solarBanking_refreshToken"),
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
        },[isExternal, startDate, endDate, selectedBank])
    useEffect(() => {
        dispatch(getBankListExSLBApi())
        },[])
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
                                aria-selected="true"><i className="fa fa-line-chart"></i>Inter-Bank Transactions</a>
                        </li>
                        <li className="nav-item" onClick={setTypeOfTransaction}>
                            <a className="nav-link" id="internal-transaction-tab" data-toggle="tab" style={{fontSize: "15px"}}
                                href="#internalTransaction" role="tab" aria-controls="internalTransaction" 
                                aria-selected="false">
                                <i className="icofont icofont-coins"></i> Intra-Bank Transactions</a>
                        </li>
                    </ul>
                    <div className="row list-choice-form d-flex pt-2 pl-2">
                        <div className='col-6 col-md-3 start-date-form pt-2'>
                            <Form.Label> From: </Form.Label>
                            <div>
                                <DatePicker
                                    selected={startDate}
                                    dateFormat='yyyy/MM/dd'
                                    onChange={(date)=>{setStartDate(date)}}
                                />
                            </div>
                        </div>
                        <div className='col-6 col-md-3 end-date-form pt-2'>
                            <Form.Label>To:</Form.Label>
                            <div>
                                <DatePicker
                                    selected={endDate}
                                    dateFormat='yyyy/MM/dd'
                                    onChange={(date)=>{setEndDate(date)}}
                                />
                            </div>
                        </div>
                        <div className='col-6 col-md-3 selected-bank-form pt-2'>
                            <Form.Label>Select Bank:</Form.Label>
                            <div>
                                <Select
                                    defaultValue=""
                                    placeholder="Select a bank"
                                    style={{ width:150, height: "100" }}
                                    value={selectedBank}
                                    onChange={(value, option) => {
                                        setSelectedBank(value)
                                    }}
                                    options={[{
                                        value: '',
                                        label: 'All',
                                      },...banks]}
                                />
                            </div>
                        </div>
                        <div className='col-6 col-md-3 total-transaction-amount-field pt-2'>
                            <Form.Label>Total Transaction Amount:</Form.Label>
                            <div>{formatMoney(totalTransactionAmount)} VND</div>
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
