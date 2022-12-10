import React, {useState} from 'react'
import SidebarHeader from "../src/components/layout/SidebarHeader.jsx";
import SideBarCustomer from "../src/components/layout/customer_layout/SideBarCustomer.jsx";
import { Outlet  } from "react-router-dom";
import {useSelector} from "react-redux";
function CustomerTemplate(){
    const {tab_id} = useSelector(state => state.counter)
    const isCustomer = true
    return (
        <div className="page-wrapper">
            <SidebarHeader isCustomer={isCustomer}/>
            <div className="page-body-wrapper">
                <SideBarCustomer active={tab_id}/>
                <Outlet/>
            </div>
        </div>
    )
}

export default CustomerTemplate