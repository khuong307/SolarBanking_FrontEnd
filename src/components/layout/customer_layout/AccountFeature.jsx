function CustomerFeature(props){
    return (
        <li className="onhover-dropdown">
            <div className="media align-items-center">
                <div className="media">
                    <p className="m-0 txt-dark f-16" style={{fontFamily: "Jost", color: "black"}}>
                        {props.username}
                        <i className="fa fa-angle-down pull-right ml-2"></i>
                    </p>
                </div>
            </div>
            <ul className="profile-dropdown onhover-show-div p-10" style={{width: "120%"}}>
                <li>
                    <a style={{fontFamily: "Jost"}}>
                        <i className="icon-lock"></i> Change password
                    </a>
                </li>
                <li>
                    <a style={{fontFamily: "Jost"}}>
                        <i className="icon-power-off"></i>
                        Logout
                    </a>
                </li>
            </ul>
        </li>
    )
}
export default CustomerFeature