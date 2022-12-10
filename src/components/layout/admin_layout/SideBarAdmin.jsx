import SidebarMenuAdmin from "./SidebarMenuAdmin.jsx";
function SideBarAdmin(props){
    const username = "Nguyen Vu Duy Khuong"
    const menuList=[
        { id: 1, title: 'EMPLOYEE MANAGEMENT', icon: 'fa fa-users', path: '/admin/employeeList'},
        { id: 2, title: 'DASHBOARD', icon: 'fa fa-pie-chart', path: '/admin/dashboard'},
    ]
    return (
        <div className="page-sidebar" style={{backgroundColor: "#000A61", color: "white"}}>
            <SidebarMenuAdmin menuList={menuList} tab={props.active}/>
            <div style={{bottom: 0, width: "100%", position: "absolute"}}>
                <ul style={{bottom: 0, textAlign: "center"}}>
                    <i className="icofont icofont-copyright" ></i><span style={{fontFamily: "Jost"}}> Solar Banking 2022</span>
                </ul>
            </div>
        </div>
    )
}
export default SideBarAdmin
