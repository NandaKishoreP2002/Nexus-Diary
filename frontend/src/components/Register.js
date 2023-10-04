import { useState } from 'react';
import axios from 'axios';
import './Register.css';
import bcrypt from 'bcryptjs';
import { useHistory } from 'react-router-dom'
import url from './../configurl/url';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';


function Register(...props) {
    //let url1 = '/signup';                   // for deployment

    let url1 = url + '/signup';          //for static website
    const history = useHistory();
    //console.log(props[0].login);
    const [username, setusername] = useState('');
    const [name, setname] = useState('');
    const [diary, setdiary] = useState('');
    const [password, setpassword] = useState('');
    const [repassword, setrepassword] = useState('');
    async function register() {
        if (password === repassword) {
            const hashedPassword = await bcrypt.hash(password, 10)
            axios.post(url1, {
                usrname: username,
                name: name,
                diaryname: diary,
                password: hashedPassword
            }).then(function (response) {
                // console.log(response);
                if (response.status === 201) {
                    alert('Account successfully created , You can login now')
                    history.push('/login')
                }
            }).catch(err => {
                if (err.response.status === 409) {
                    alert('username taken')

                }
            })
        }
        else {
            alert("Passwords don't match");
        }
    }
    return (
        <>
            <div className="register">
                <input className="register-username-input" onChange={event => { setusername(event.target.value) }} placeholder="Username"></input><br></br>
                <input className="register-name-input" onChange={event => { setname(event.target.value) }} placeholder="Name"></input><br></br>
                <input className="register-diaryname-input" onChange={event => { setdiary(event.target.value) }} placeholder="Diary Name"></input><br></br>
                <input className="register-password-input" type="password" onChange={event => { setpassword(event.target.value) }} placeholder="Password"></input><br></br>
                <input className="register-repassword-input" type="password" onChange={event => { setrepassword(event.target.value) }} placeholder="Re-enter Password"></input><br></br>
                <button className="register-button" onClick={register}>
                    <FontAwesomeIcon icon={faUserPlus} className="my-user-plus-icon" />
                </button>
            </div>
        </>
    )
}
export default Register;