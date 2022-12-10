import SidebarMenuCustomer from "./SidebarMenuCustomer.jsx";
function SideBarCustomer(props){
    const username = "Nguyen Vu Duy Khuong"
    const menuList=[
        { id: 1, title: 'Card List', icon: 'icofont icofont-credit-card', path: '/customer/cardList'},
        { id: 2, title: 'Tranfers', icon: 'icofont icofont-bank-transfer-alt', path: '/customer/transfer'},
        { id: 3, title: 'Contacts', icon: 'icofont icofont-contacts', path: '/customer/contacts'},
        { id: 4, title: 'Debt List', icon: 'icofont icofont-pay', path: '/customer/debtList'},
        { id: 5, title: 'History Transaction', icon: 'icofont icofont-bank-transfer-alt', path: '/customer/transaction'},
    ]
    return (
        <div className="page-sidebar" style={{backgroundColor: "#000A61", color: "white"}}>
            <SidebarMenuCustomer menuList={menuList} tab={props.active}/>
            <div style={{bottom: 0, width: "100%", position: "absolute"}}>
                <ul style={{bottom: 0, textAlign: "center"}}>
                    <i className="icofont icofont-copyright" ></i><span style={{fontFamily: "Jost"}}> Solar Banking 2022</span>
                </ul>
            </div>
        </div>
    )
}
export default SideBarCustomer
