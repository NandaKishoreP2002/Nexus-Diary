import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
//import url from './../configurl/url';
import { useLocation } from 'react-router-dom';
import './Edit.css';

function Edit(...props) {
    const history = useHistory();
    const location = useLocation();
    const { tit, ent, ind , username} = location.state;
    //console.log(ind);
    // console.log(ent);
    const [title, setTitle]=useState(tit);
    const [entry, setEntry]=useState(ent);
    //const url1=url+'/update/'+ind;      //for static website
    const url1='/update/'+ind;      //for deployment
    function handleSaveClick() {
        //const opt="edit";
        let data = {
            username,
            title,
            entry,
            tit
        }
        axios.patch(url1, data).then(function (response) {
            //console.log(response);
            if (response.status === 200) {
                //console.log("done");
                props[0].login(response);
                history.push('/view');
            }
        })
    }

    return (
        <div className="newentry">
            <div className="newentry-title">
                <h1>Edit your entry</h1>
            </div>
            <input type="text" value={title} className="txt-title" onChange={event => {setTitle(event.target.value) }} ></input><br></br>
            <textarea value={entry} className="txt-area" onChange={event => {setEntry(event.target.value) }} ></textarea><br></br>
            <button type="submit" className="btn-submit1" onClick={handleSaveClick}>Save Changes</button>
            
        </div>
    )
}


export default Edit;