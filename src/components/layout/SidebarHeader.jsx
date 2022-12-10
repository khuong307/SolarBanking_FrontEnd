import Notification from "./Notification.jsx"
import AccountFeature from "./customer_layout/AccountFeature.jsx";
function SidebarHeader(props){
    const username = "Nguyen Vu Duy Khuong"
    return (
        <div className="page-main-header">
            <div className="main-header-left mb-2" style={{justifyContent: "center"}}>
                <div className="container-fluid">
                    <a className="d-flex justify-content-between align-content-center align-items-center" style={{fontFamily: "iCielBCCubano"}}>
                        <img src="/src/assets/img/solar_logo.png" className="img-fluid img-60" alt=""/> <span style={{color: "#FFB800", fontSize: "16px"}}>SOLAR BANKING</span>
                    </a>
                </div>
            </div>
            <div className="main-header-right">
                <div className="nav-right col">
                    <ul className="nav-menus">
                        {props.isCustomer && <Notification/>}
                        <AccountFeature username={username}/>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SidebarHeader