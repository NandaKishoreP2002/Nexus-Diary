import './Newentry.css';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
//import url from './../configurl/url';

function Newentry(...props) {
    //const url1 = url + '/diary/'           //for static website

    const url1 = '/diary/'              //for deployment 
    const history = useHistory();
    const [title, settitle] = useState('');
    const [entry, setentry] = useState('');
    function postdata() {
        let data = {
            title,
            entry
        }
        let username = props[0].data.data.usrname;
        let url = url1 + username;
        axios.post(url, data).then(function (response) {
            console.log(response);
            if (response.status === 201) {
                console.log(props[0]);
                props[0].login(response);
                history.push('/view');
            }
        })
    }

    return (
        <div className="newentry">
            <div className="newentry-title">
                <h1>Today's thoughts: Go!</h1>
            </div>
            <input type="text" className="txt-title" onChange={event => { settitle(event.target.value) }} placeholder="Your diary title ..."></input><br></br>
            <textarea className="txt-area" onChange={event => { setentry(event.target.value) }} placeholder="Your diary entry ..."></textarea><br></br>
            <button onClick={postdata} className="btn-submit1" type="submit">Add</button>
        </div>
    )
}
export default Newentry;