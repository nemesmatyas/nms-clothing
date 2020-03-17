import React, { Component } from 'react';
import './App.css';

import { Switch, Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { setCurrentUser } from './redux/user/user-actions';
import { selectCurrentUser } from './redux/user/user-selectors';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shoppage/shoppage.component';
import AccountPage from './pages/accountpage/accountpage.component';
import CheckoutPage from './pages/checkoutpage/checkoutpage.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';


class App extends Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // Check if there's a user currently logged in, and create a new reference if it does
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          setCurrentUser({
              id: snapshot.id,
              ...snapshot.data()
            });
        })
      } 
      // If there's no userAuth, nobody is logged in
      else {
        setCurrentUser(null)
      }
    })

    // From the collection items, we only need the title and the items
    //addCollectionAndDocuments('collections', collectionsArr.map(({ title, items }) => ({ title, items })));
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/signin" render={() => this.props.currentUser ? <Redirect to="/" /> : <AccountPage />} />
          <Route exact path="/checkout" component={CheckoutPage} />
        </Switch>
      </div>
    );
  }
}

/**
 * Dispatch the setCurrentUser action to the store
 * Triggers state change
 */

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
  //collectionsArr: selectCollectionsForPreview
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})


export default connect(mapStateToProps, mapDispatchToProps)(App);
