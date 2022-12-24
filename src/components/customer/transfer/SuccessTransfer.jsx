import React from 'react'

export default function SuccessTransfer() {
    return (
        <div className='page-body'>
            <div className="card text-left p-5">
                <h2 style={{ fontFamily: "Jost" }}><i className="fa fa-check-circle mr-1" style={{color:"green"}}/>Success Transfer</h2>
                <div className="card-body">
                    <h4 className="card-title" style={{ fontFamily: "Jost"}}>Information Transaction</h4>
                    <p className="card-text" style={{ fontFamily: "Jost",fontSize:20 }}>Information Recipient:</p>
                    <p className="card-text" style={{ fontFamily: "Jost",fontSize:20 }}>Bank:</p>
                    <p className="card-text" style={{ fontFamily: "Jost",fontSize:20 }}>Account Number:</p>
                    <p className="card-text" style={{ fontFamily: "Jost",fontSize:20 }}>Trasaction Amount:</p>
                    <p className="card-text" style={{ fontFamily: "Jost",fontSize:20 }}>Trasaction Message:</p>
                    <p className="card-text" style={{ fontFamily: "Jost",fontSize:20 }}>Trasaction Fee:</p>
                    <p className="card-text" style={{ fontFamily: "Jost",fontSize:20 }}>Total:</p>
                </div>
                <div className='form-group'>
                    <button className='btn btn-danger p-3'>Save Information Transaction</button>
                    <button className='btn btn-outline-primary ml-3 p-3'>Cancel</button>
                </div>
            </div>
        </div>
    )
}

