import React, { useState } from 'react';

import './sign-up.styles.scss';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

const SignUp = () => {

    const [userAccount, setUserAccount] = useState({ displayName: '', email: '', password: '', confirmPassword: ''})
    const { displayName, email, password, confirmPassword } = userAccount;

    const handleSubmit = async e => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords don\'t match');
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);

            await createUserProfileDocument(user,  displayName);

            setUserAccount({ displayName: '', email: '', password: '', confirmPassword: ''})

        } catch (err) {
            console.error(err);
        }
    }

    const handleChange = e => {
        const { name, value } = e.target;

        setUserAccount({...userAccount, [name]: value })
    }
    
    return(
        <div className="sign-up">
            <h2 className="title">I do not have an account</h2>
            <span>Sign up with your email and password</span>
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <FormInput type="text" name="displayName" value={displayName} onChange={handleChange} label="Display Name" required />
                <FormInput type="email" name="email" value={email} onChange={handleChange} label="Email" required />
                <FormInput type="password" name="password" value={password} onChange={handleChange} label="Password" required />
                <FormInput type="password" name="confirmPassword" value={confirmPassword} onChange={handleChange} label="Confirm Password" required />
                <CustomButton type="submit">SIGN UP</CustomButton>
            </form>
        </div>
    );
}
export default SignUp;