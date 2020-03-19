import React, { useState } from 'react';

import './sign-in.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

const SignIn = () => {
    const [credentials, setCredentials] = useState({ name: '', password: ''});
    const { email, password } = credentials;

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            
            auth.signInWithEmailAndPassword(email, password);
            

        } catch (err) {
            console.error(err);
        }

        setCredentials({ name: '', password: ''});
    }

    const handleChange = e => {
        const { value, name } = e.target;

        setCredentials({...credentials, [name]: value });
    }

    return(
        <div className="sign-in">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput type="email" name="email" value={email} handleChange={handleChange} required label="email" />                   
                <FormInput type="password" name="password" value={password} handleChange={handleChange} required label="password" />
                
                <div className="buttons-container">
                    <CustomButton type="submit">Sign In</CustomButton>
                    <CustomButton onClick={signInWithGoogle} googleSignIn>Sign In With Google</CustomButton>
                </div>
                
            </form>
        </div>
    )
}
export default SignIn;