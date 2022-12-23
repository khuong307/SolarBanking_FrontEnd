import {useState} from "react";
import TableAccountList from "./tableAccountList.jsx";
import Axios from "axios";
import React from "react";
import axiosInstance from "../../../utils/axiosConfig.js";

function AddMultiModal(props){
    const [csvFile, setCSVFile] = useState('')
    const [multiClick, setMultiClick] = useState(false)
    const [csvArray, setCSVArray] = useState([])
    const processCSV = (str, delim=",") =>{
        setCSVArray([])
        const headers = str.slice(0, str.indexOf('\n')).split(delim)
        const rows = str.slice(str.indexOf('\n')+1).split('\n')
        const newArray = rows.map(row =>{
            const value = row.split(delim)
            const eachObject = headers.reduce
            (
                (obj, header, i) => {
                    obj[header.replaceAll('\r','')] = value[i].replaceAll('\r','')
                    return obj
                }, {}
            )
            return eachObject
        })
        setCSVArray(newArray)
    }
    const submit = function(){
        const file = csvFile
        const reader = new FileReader()

        reader.onload = function(e){
            setMultiClick(true)
            const text = e.target.result
            processCSV(text)
        }
        reader.readAsText(file)
    }
    function createMany(){
        axiosInstance.post(`/employee/customers`, csvArray).then((result)=>{
            $('#addMultiModal').modal('hide');
            $('#statusMultiModal').modal('show');
            setCSVArray([])
            setMultiClick(false)
            props.updateFail(result.data.fail_array)
            props.updateSucess(result.data.success_array)
        })
        .catch((err)=>{
            alert("Internal Server Error")
        })
    }
    return (
        <div id="addMultiModal" className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="addMultiModalLabel" style={{fontFamily: "Jost"}}
             aria-hidden="true">
            <div className="modal-dialog" style={{maxWidth: "70%"}}>
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="modal-title" id="addMultiModalLabel">IMPORT CSV FILE</div>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true"><i className="fa fa-times-circle-o" style={{color: "rgb(0, 10, 97)", fontSize: "30px"}}></i></span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form className="d-flex align-content-center align-items-center justify-content-center">
                            <div className="col-lg-6">
                                <input type="file" accept=".csv" className="form-control" style={{width: "100%"}} onChange={(e)=>{setCSVFile(e.target.files[0])}}/>
                            </div>
                            <button type="submit" className="btn btnLogin" onClick={
                                (e)=>{
                                    e.preventDefault()
                                    if (csvFile)
                                        submit()
                                }
                            }>Submit</button>
                        </form>
                        <TableAccountList accountList={csvArray} click={multiClick}/>
                        </div>

                    {
                        multiClick &&
                        <div className="modal-footer">
                            <button type="button" className="btn btnLogin" onClick={createMany}>Confirm</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default AddMultiModal