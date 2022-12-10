import Menu from "../Menu.jsx";
function SidebarMenuAdmin(props){
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
export default SidebarMenuAdmin