import SidebarMenuEmployee from "./SidebarMenuEmployee.jsx";
function SideBarEmployee(props){
    const username = "Nguyen Vu Duy Khuong"
    const menuList=[
        { id: 1, title: 'New Customer', icon: 'fa fa-plus-circle', path: '/employee/addNewCustomer'},
        { id: 2, title: 'Charge Money', icon: 'icofont icofont-money-bag', path: '/employee/chargeMoney'},
        { id: 3, title: 'Customer Transaction', icon: 'icofont icofont-book-mark', path: '/employee/customerTransaction'}
    ]
    return (
        <div className="page-sidebar" style={{backgroundColor: "#000A61", color: "white"}}>
            <SidebarMenuEmployee menuList={menuList} tab={props.active}/>
            <div style={{bottom: 0, width: "100%", position: "absolute"}}>
                <ul style={{bottom: 0, textAlign: "center"}}>
                    <i className="icofont icofont-copyright" ></i><span style={{fontFamily: "Jost"}}> Solar Banking 2022</span>
                </ul>
            </div>
        </div>
    )
}
export default SideBarEmployee
