import { useState } from 'react';
import axios from 'axios';
import './Login.css';
import bcrypt from 'bcryptjs';
import url from './../configurl/url';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';


function Login(...props) {
    const [loginid, setloginid] = useState('');
    const [password, setpassword] = useState('');   

    //let url1 = '/login';                   // for deployment
    let url1 = url + '/login';          //for static website 
    // console.log(props[0].login);
    async function login() {
        if (password === '') {
            alert('Please Enter Password');
        }
        else {
            axios.post(url1, {
                usrname: loginid
            }).then(function (response) {
                console.log(response);
                console.log(props[0]);
                if (response.status === 200) {
                    // props[0].login(response);
                    bcrypt.compare(password, response.data.password, function (err, res) {
                        console.log(res);
                        if (res) {
                            props[0].login(response);
                        }
                        else {
                            alert('Incorrect Password')
                        }
                        if (err) {
                            alert('Error we are working on it');
                        }
                    })
                }
            }).catch(err => {
                if (err.response.status === 404) {
                    alert('Login id not found')
                }
                else if (err.response.status === 500) {
                    alert('server error')
                }
                else {
                    alert('Error we are working on it')
                }
            })
        }
    }
    return (
        <div className="login">
            <input className="loginidinput" onChange={event => { setloginid(event.target.value) }} placeholder="Username"></input><br></br>
            <input type="password" className="passwordinput" onChange={event => { setpassword(event.target.value) }} placeholder="Password"></input><br></br>
            <button className="login-button" onClick={login}>
                <FontAwesomeIcon icon={faRightToBracket} />
            </button>
        </div>
    )
}
export default Login;
