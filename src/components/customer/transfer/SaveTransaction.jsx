import React from 'react'
import { useSelector } from 'react-redux'

export default function SaveTransaction() {
    const infoTransaction = useSelector(state => state.transferReducer.infoTransaction)
    return (
        <div className='page-body'>
            SaveTransaction
        </div>
    )
}
