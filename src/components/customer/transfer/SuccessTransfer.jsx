import _ from 'lodash'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function SuccessTransfer() {
    const infoTransaction = useSelector(state => state.transferReducer.infoTransaction)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(()=>{
        if(_.isEmpty(infoTransaction)){
            navigate("/")
        }
    },[])

    return (
        <div className='page-body'>
            <div className="card text-left p-5">
                <h2 style={{ fontFamily: "Jost" }}><i className="fa fa-check-circle mr-1" style={{color:"green"}}/>Success Transfer</h2>
                <div className="card-body">
                    <h4 className="card-title" style={{ fontFamily: "Jost"}}>Information Transaction</h4>
                    <p className="card-text" style={{ fontFamily: "Jost",fontSize:20 }}>Information Recipient:{infoTransaction.full_name}</p>
                    <p className="card-text" style={{ fontFamily: "Jost",fontSize:20 }}>Bank:{infoTransaction.bank}</p>
                    <p className="card-text" style={{ fontFamily: "Jost",fontSize:20 }}>Account Number:{infoTransaction.des_account_number}</p>
                    <p className="card-text" style={{ fontFamily: "Jost",fontSize:20 }}>Trasaction Amount:{infoTransaction.transaction_amount}</p>
                    <p className="card-text" style={{ fontFamily: "Jost",fontSize:20 }}>Trasaction Message:{infoTransaction.transaction_message}</p>
                    <p className="card-text" style={{ fontFamily: "Jost",fontSize:20 }}>Trasaction Fee:{infoTransaction.transaction_fee}</p>
                    <p className="card-text" style={{ fontFamily: "Jost",fontSize:20 }}>Total:{infoTransaction.total}</p>
                </div>
                <div className='form-group'>
                    <button className='btn btn-danger p-3'>Save Information Transaction</button>
                    <button className='btn btn-outline-primary ml-3 p-3'>Cancel</button>
                </div>
            </div>
        </div>
    )
}

