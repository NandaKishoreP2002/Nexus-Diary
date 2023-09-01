import { NavLink } from 'react-router-dom';
import moment from 'moment';
import './Viewmenu.css'

function Menuitem(...props) {
    let id = props[0].id;
    let viewid = "/view/" + id;
    return (
        <div>
            <NavLink className="navlink-menu" to={viewid}>
                <div className="menu-item">
                    <div className="menu-title">{props[0].data.diaryentry[id].title}</div>
                    <div className="menu-date">{moment(props[0].data.diaryentry[id].date).fromNow()}</div>
                </div>
            </NavLink>
        </div>
    )
}

function Viewmenu(...props) {
    let data = props[0].data.data;
    let items = [];
    console.log("viewmenu");
    console.log(data.diaryentry.length);
    for (let i = 0; i < data.diaryentry.length; i++) {
        console.log(data.diaryentry[i].title);
        items.push(<Menuitem id={i} data={data} ></Menuitem>)
        
    }
    return (
        <div className="viewmenu">
            <div className="menu">
                {items}
            </div>
        </div>
    )
}


export default Viewmenu;