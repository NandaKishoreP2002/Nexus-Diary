import './Viewentry.css';
import axios from 'axios';
import { useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import moment from 'moment';
//import url from './../configurl/url';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPencil } from '@fortawesome/free-solid-svg-icons';


function Viewentry(...props) {      
    console.log("viewentry starting");
    //const url1 = url + '/diary/'
    let { id } = useParams();
    const history = useHistory();
    console.log(id);
    let len=props[0].data.data.diaryentry.length;
    if(id<len) {
        let tit=props[0].data.data.diaryentry[id].title;
        let ent=props[0].data.data.diaryentry[id].entry;
        let ind=id;
        let username=props[0].data.data.usrname;
        
        function handleClick() {
            let username = props[0].data.data.usrname;
            let title=props[0].data.data.diaryentry[id].title;
            let ind=id;
            let entry=props[0].data.data.diaryentry[id];
            let data = {
                username,
                title,
                entry
            }
            //let url1 = url+'/delete/'+ ind; //for static website
            let url1='/delete/'+ind;  //for deployment
            //console.log(url);
            axios.post(url1, data).then(function (response) {
                console.log("delete side");
                console.log(response);
                if (response.status === 201) {
                    //console.log(props[0]);
                    console.log(response.data.diaryentry.length);
                    props[0].login(response);
                    console.log("okay");
                    history.push('/view');
                }
            })
        
        }
        return (
            <div>

                <div className="viewentry">
                    {console.log("viewentry")}
                    {console.log(id)}
                    <div className="view-title">{props[0].data.data.diaryentry[id].title}</div>
                    <div className="view-date">{moment(props[0].data.data.diaryentry[id].date).format("dddd, MMMM Do YYYY, h:mm:ss a")}</div>
                    <div className="view-data">{props[0].data.data.diaryentry[id].entry}</div>
                    <div className="button-container">
                        <button className="view-button">
                            <Link 
                                to={{
                                pathname: '/edit',
                                state: { tit, ent, ind, username }
                                }}
                                style={{ color: 'white', textDecoration: 'none' }}
                            >
                                <FontAwesomeIcon icon={faPencil} className="my-pencil-icon" />
                            </Link>
                        </button>
                        <button className="view-button" onClick={handleClick}>
                            <FontAwesomeIcon icon={faTrashCan} className="my-icon" />
                        </button>
                    </div>
                    
                    
                </div>
            </div>
        )
    }
    
}
export default Viewentry;