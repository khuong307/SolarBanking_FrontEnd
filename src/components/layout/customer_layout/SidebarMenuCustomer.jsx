import Menu from "../Menu.jsx";

function SidebarMenuCustomer(props){
    return (
        <ul className="sidebar-menu" style={{fontFamily: "Jost"}}>
            {
                props.menuList.map(function(item){
                    return (<Menu key={item.id} menu={item} tab={props.tab}/>)
                })
            }
        </ul>
    )
}
export default SidebarMenuCustomer