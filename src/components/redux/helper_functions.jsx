import {useDispatch} from "react-redux";
import {changeByID} from "./counter.jsx";
export default function setTabID(id){
    const dispatch = useDispatch()
    dispatch(changeByID(id))
}