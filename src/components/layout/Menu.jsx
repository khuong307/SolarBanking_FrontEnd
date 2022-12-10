import React from 'react';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {changeByID} from "../redux/counter.jsx";
function Menu(props) {
    const non_active = "sidebar-header d-flex align-content-center align-items-center"
    const active = "sidebar-header d-flex align-content-center align-items-center activeTab"
    const dispatch = useDispatch()
  return (
    <li>
      <Link to={props.menu.path} className={props.menu.id == props.tab? active: non_active} onClick = {() => dispatch(changeByID(props.menu.id)) }>
        <i id={props.menu.id} className={props.menu.icon} style={{fontSize: "30px"}}></i><span style={{fontSize: "13px"}}>{props.menu.title}</span>
      </Link>
    </li>
  );
}

export default Menu;