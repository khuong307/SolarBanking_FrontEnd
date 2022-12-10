import React, {useState} from 'react'
import SidebarHeader from "../src/components/layout/SidebarHeader.jsx";
import { Outlet  } from "react-router-dom";
import {useSelector} from "react-redux";
import SideBarAdmin from "../src/components/layout/admin_layout/SideBarAdmin.jsx";
function AdminTemplate(){
    const {tab_id} = useSelector(state => state.counter)
    return (
        <div className="page-wrapper">
            <SidebarHeader/>
            <div className="page-body-wrapper">
                <SideBarAdmin active={tab_id}/>
                <Outlet/>
            </div>
        </div>
    )
}

export default AdminTemplate