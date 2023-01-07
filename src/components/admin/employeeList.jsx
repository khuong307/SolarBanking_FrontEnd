import React from 'react'
import {useEffect, useState} from 'react'
import TableEmployeeList from "./employeeList/table_employee_list";
import AddEmployeeTab from "./employeeList/add_employee_tab";
import axiosInstance from "../../utils/axiosConfig.js";

function EmployeeList(){
    const [employeeList, setEmployeeList] = useState("")
    const [counterTab, setCounterTab] = useState(1)
    function setTab (e) {
        if (e.target.id === "employee-list-tab") {
            setCounterTab(1);
        } else if (e.target.id === "add-employee-tab"){
            setCounterTab(2);
        } else {
            setCounterTab(3);
        }
    }
    async function getEmployeeList (){
        await axiosInstance.get(`/admin/employees`, {
            headers: {
                access_token: localStorage.getItem("solarBanking_accessToken"),
                refresh_token: localStorage.getItem("solarBanking_refreshToken"),
            }
        }).then((result)=> {
            if (result.data.isSuccess == true){
                setEmployeeList(result.data.employeeList)
            }
            else{
                alert(result.data.message)
            }
        }).catch((err)=>{
            alert(err)
        })
    }
    useEffect(() => {
        getEmployeeList()
    },[counterTab])

    return (
        <div className="page-body">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12 mt-2" style={{fontFamily: "Jost"}}>
                        <h4>EMPLOYEE MANAGEMENT</h4>
                        <small style={{fontFamily: "Jost", fontSize: "15px", color: "gray"}}>Solar Banking Admin Panel</small>
                    </div>
                </div>
            </div>
            <div className="card height-equal mt-4" style={{fontFamily: "Jost"}}>
                <div className="card-body">
                    <ul className="nav nav-pills nav-warning" id="pills-icontab" role="tablist">
                        <li className="nav-item" onClick={setTab}>
                            <a className="nav-link active" id="employee-list-tab" data-toggle="tab" style={{fontSize: "15px"}}
                                href="#employeeList" role="tab" aria-controls="employeeList" 
                                aria-selected="true"><i className="icofont icofont-address-book"></i>Employee List</a>
                        </li>
                        <li className="nav-item" onClick={setTab}>
                            <a className="nav-link" id="add-employee-tab" data-toggle="tab" style={{fontSize: "15px"}}
                                href="#addEmployee" role="tab" aria-controls="addEmployee" 
                                aria-selected="false">
                                <i className="icofont icofont-contact-add"></i>Add Employee</a>
                        </li>
                    </ul>
                    <div className="tab-content" id="pills-icontabContent">
                        <div className="tab-pane fade show active" id="employeeList" role="tabpanel"
                                aria-labelledby="employee-list-tab">
                            {counterTab == 1 && <TableEmployeeList 
                                employeeList={employeeList} getEmployeeList={getEmployeeList} 
                               />}
                        </div>
                        <div className="tab-pane fade show" id="addEmployee" role="tabpanel"
                                aria-labelledby="add-employee-tab">
                            {counterTab == 2 && <AddEmployeeTab/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeList