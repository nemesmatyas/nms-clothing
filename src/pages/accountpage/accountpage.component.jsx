import React from 'react';

import './accountpage.styles.scss';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

const AccountPage = () => {
    return(
        <div className="account-page">
            <SignIn />
            <SignUp />
        </div>
    )
}
export default AccountPage;