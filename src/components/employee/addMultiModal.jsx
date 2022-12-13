import {useState} from "react";
import TableAccountList from "./tableAccountList.jsx";
import '/src/assets/css/datatables.css'
import '/src/assets/css/datatable-extension.css'
import '/src/assets/css/data-table.css'

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
    return (
        <div id="addMultiModal" className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
             aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="modal-title" id="myLargeModalLabel">IMPORT CSV FILE</div>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form className="d-flex align-content-center align-items-center justify-content-center" style={{fontFamily: "Jost"}}>
                            <div className="col-lg-6">
                                <input type="file" accept=".csv" className="form-control" style={{fontFamily: "Jost", width: "100%"}} onChange={(e)=>{setCSVFile(e.target.files[0])}}/>
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
                </div>
            </div>
        </div>
    )
}

export default AddMultiModal