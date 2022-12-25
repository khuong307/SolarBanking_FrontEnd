import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from "../../../utils/axiosConfig.js";
import { SOLAR_BANK } from '../../../utils/constants.js';

const initialState = {
    src_account:{},
    banks: [
        {
            value: 'Techcombank',
            label: 'Techcombank',
        },
        {
            value: 'Agribank',
            label: 'Agribank',
        },
        {
            value: 'VPBank',
            label: 'VPBank',
        },
    ],
    recipients: [],
    defaultRecipients: [],
    infoTransaction:{},
    transactionId:-1,
}

const transferReducer = createSlice({
    name: "transferReducer",
    initialState,
    reducers: {
        getUserBankAccount:(state,action)=>{
            state.src_account = action.payload
        },
        getRecipientList:(state,action) => {
            state.recipients = action.payload
            state.defaultRecipients = action.payload
        },
        getRecipientListBySolarBank : (state,action)=>{
            const recipients = action.payload
            state.recipients = recipients.filter(item=>item.bank_name===SOLAR_BANK)
            state.defaultRecipients = recipients.filter(item=>item.bank_name===SOLAR_BANK)
        },
        searchReceiver: (state,action)=>{
            const textSearch= action.payload
            if(textSearch === ""){
                state.recipients = state.defaultRecipients
            }else{
                state.recipients = state.recipients.filter(item => item.account_number.trim().toLowerCase().includes(textSearch.trim().toLowerCase()))
            }
        },
        getInfoTransaction:(state,action)=>{
            state.infoTransaction = action.payload
        },
        confirmTransaction:(state,action)=>{
            state.transactionId = action.payload
        }
    }
});

export const {searchReceiver,getUserBankAccount,getRecipientList,getRecipientListBySolarBank,getInfoTransaction,confirmTransaction } = transferReducer.actions

export default transferReducer.reducer



// ----------- THUNK ----------------------
export const getUserBankAccountApi = (userId) => {
    return async dispatch => {
        try{
            const result = await axiosInstance.get(`/customers/${userId}/bankaccount`)
            if(result.status === 200){
                dispatch(getUserBankAccount(result.data.bankAccount))
            }
        }catch(err){
            console.log(err)
            alert("Can not get account_number")
        }
    }
}

export const getRecipientListApi = (userId) => {
    return async dispatch => {
        try{
            const result = await axiosInstance.get(`/users/${userId}/recipients`)
            dispatch(getRecipientListBySolarBank(result.data))
        }catch(err){
            console.log(err)
            alert("Can not get recipient list")
        }
    }
}

export const getValidTransactionApi = (userId,infoTransaction,navigate) => {
    return async dispatch => {
        try{
            const result = await axiosInstance.post(`/customers/${userId}/intratransaction`,infoTransaction)
            if(result.status!==200){
                alert("Invalid Transaction Info")
            }else{
                dispatch(getInfoTransaction(result.data.infoTransaction))
                navigate("/customer/transfer/confirm")
            }
        }catch(err){    
            console.log(err)
            alert("Invalid Transaction Info")
        }
    }
}

export const confirmTransactionApi = (userId,infoTransaction,navigate) => {
    return async dispatch => {
        try{
            const result = await axiosInstance.post(`/customers/${userId}/intratransaction/confirm`,infoTransaction)
            if(result.status===201){
                dispatch(confirmTransaction(result.data.transactionId))
                navigate("/customer/transfer/otp")
            }else{
                alert("Invalid Transaction Info")
            }
        }catch(err){    
            console.log(err)
            alert("Invalid Transaction Info")
        }
    }
}

export const getValidOtpApi = (transactionId,otpInfo,navigate) => {
    return async dispatch => {
        try{
            const result = await axiosInstance.post(`/customers/intratransaction/${transactionId}`,otpInfo)
            console.log(result)
            if(result.status===200){
                
                dispatch(getInfoTransaction(result.data.infoTransaction))
                navigate("/customer/transfer/success")
            }else{
                alert("Invalid OTP Code or OTP Code expired")
            }
        }catch(err){    
            console.log(err)
            alert("Invalid OTP Code or OTP Code expired")
        }
    }
}