import React from "react";
function NotFound(props){
    return (
       props.isFound === false && (
           <div className="col-lg-12 d-flex align-content-center align-items-center justify-content-center mt-lg-5">
               <img className="img-fluid img-80" src="/src/assets/img/not_found.png"/>
               <div style={{fontFamily: "Jost", fontSize: "20px"}}>Not found this customer!</div>
           </div>
       )
    )
}
export default NotFound