import React from 'react';
import axios from 'axios';

import isEmpty from '../utils/isEmpty';

import './RegistrationPopUp.css';

function Form({ option, setShowDetails, showDetails, userDetails, setUserDetails, formDetails, setFormDetails, setIsRegistered, showRegistrationMsg }) {

    return (
        <form className='account-form' onSubmit={(evt) => submitForm(evt, option, setShowDetails, setUserDetails, formDetails, setIsRegistered)}>
            <div className={'account-form-fields ' + (option === 1 ? 'sign-in' : 'sign-up')}>
                <input id='email' type='email' placeholder='E-mail' required onChange={(e) => setForm('email', e.target.value, formDetails, setFormDetails)} />
                {
                    option === 2 ?
                        <>
                            <input id='name' type="text" placeholder='Name' required onChange={(e) => setForm('name', e.target.value, formDetails, setFormDetails)} />
                            <input id='age' type='number' placeholder='Age' required onChange={(e) => setForm('age', e.target.value, formDetails, setFormDetails)} />
                            <input id='occupation' name='occupation' type='text' placeholder='Occupation' required onChange={(e) => setForm('occupation', e.target.value, formDetails, setFormDetails)} />
                        </>
                        : null
                }
            </div>
            {<button className='btn-submit-form' type='submit'>
                {option === 1 ? 'Search' : 'Register'}
            </button>}

            {
                option === 2 && showRegistrationMsg ? <p> {showRegistrationMsg}</p> : null
            }
            {
                option === 1 && showDetails ?
                    isEmpty(userDetails) ? <p className='error'> NO USER FOUND</p> :
                        <div className="user-details success">
                            <h2>Registered User Details</h2>
                            <li id='name'> Name: {userDetails.name}</li>
                            <li id='email'> Email: {userDetails.email}</li>
                            <li id='age'> Age: {userDetails.age}</li>
                            <li id='occupation'> Occupation: {userDetails.occupation}</li>
                        </div> : null
            }
        </form>
    )
}

const submitForm = (evt, option, setShowDetails, setUserDetails, formDetails, setIsRegistered) => {
    evt.preventDefault();
    setShowDetails(false);
    setUserDetails(null);
    setIsRegistered(false);

    const email = formDetails.email;
    const serverUrl = process.env.REACT_APP_SERVER_URL;

    if (option === 1) {
        axios
            .get(`${serverUrl}/api/registration/fetch?email=${email}`)
            .then(res => {
                setShowDetails(true);
                setUserDetails(res.data);
            })
            .catch(err => {
                setShowDetails(true);
                console.log(err);
            })
    }
    else {
        console.log("formDetails", formDetails);
        let userDetails = JSON.stringify(formDetails);
        axios
            .get(`${serverUrl}/api/registration/save?email=${email}&userdetails=${userDetails}`)
            .then(res => {
                setIsRegistered(res.data.msg);
            })
            .catch(err => {
                console.log(err);
                setIsRegistered('Error occurs while registering. Please try again after some time');
            })
    }
}

const setForm = (key, value, formDetails, setFormDetails) => {
    if (isEmpty(formDetails)) {
        formDetails = {}
    }
    formDetails[key] = value;
    setFormDetails(formDetails);
}

export default function RegistrationPopUp() {
    const [option, setOption] = React.useState(1);
    const [showDetails, setShowDetails] = React.useState(false);
    const [userDetails, setUserDetails] = React.useState(null);
    const [formDetails, setFormDetails] = React.useState(null);
    const [showRegistrationMsg, setIsRegistered] = React.useState(false);

    return (
        <div className="container">

            <header>
                <div className={'header-headings ' + (option === 1 ? 'sign-up' : 'sign-in')}>
                    <span>Register For Web App</span>
                    <span>Show Registered User Details</span>
                </div>
            </header>
            <ul className='options'>
                <li className={option === 1 ? 'active' : ''} onClick={() => setOption(1)}>Show Registered Details</li>
                <li className={option === 2 ? 'active' : ''} onClick={() => setOption(2)}>Register</li>
            </ul>
            <Form
                option={option} showDetails={showDetails}
                setShowDetails={setShowDetails}
                setIsRegistered={setIsRegistered} showRegistrationMsg={showRegistrationMsg}
                userDetails={userDetails} setUserDetails={setUserDetails}
                formDetails={formDetails} setFormDetails={setFormDetails} />
            <footer>
                <a href='https://github.com/Nishant-panwar' target='_blank' rel="noreferrer" >Design by Nishant Panwar</a>
            </footer>
        </div>
    )
}
