import React, {useState} from 'react'
import SidebarHeader from "../src/components/layout/SidebarHeader.jsx";
import { Outlet  } from "react-router-dom";
import SideBarEmployee from "../src/components/layout/employee_layout/SideBarEmployee.jsx";
import {useSelector} from "react-redux";
function EmployeeTemplate(){
    const {tab_id} = useSelector(state => state.counter)
    return (
        <div className="page-wrapper">
            <SidebarHeader/>
            <div className="page-body-wrapper">
                <SideBarEmployee active={tab_id}/>
                <Outlet/>
            </div>
        </div>
    )
}

export default EmployeeTemplate