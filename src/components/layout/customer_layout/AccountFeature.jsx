import {Link} from "react-router-dom";

function CustomerFeature(props){
    const logoutHandler = function() {
        delete localStorage.solarBanking_accessToken;
        delete localStorage.solarBanking_refreshToken;
        delete localStorage.solarBanking_userId;
        delete localStorage.solarBanking_username;
        delete localStorage.solarBanking_userRole;
    }

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
                    <Link to='/account/changePassword' style={{fontFamily: "Jost"}}>
                        <i className="icon-lock"></i>Change password
                    </Link>
                </li>
                <li>
                    <Link to='/' onClick={logoutHandler} style={{fontFamily: "Jost"}}>
                        <i className="icon-power-off"></i>
                        Logout
                    </Link>
                </li>
            </ul>
        </li>
    );
}

export default CustomerFeature;