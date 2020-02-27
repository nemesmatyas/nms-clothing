import React from 'react';

import './accountpage.styles.scss';

import SignIn from '../../components/sign-in/sign-in.component';

const AccountPage = () => {
    return(
        <div className="account-page">
            <SignIn />
        </div>
    )
}
export default AccountPage;