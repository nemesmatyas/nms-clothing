import React, { Component } from 'react';
import './App.css';

import { Switch, Route } from 'react-router-dom';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shoppage/shoppage.component';
import AccountPage from './pages/accountpage/accountpage.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // Check if there's a user currently logged in, and create a new reference if it does
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          });
        })
      } 
      // If there's no userAuth, nobody is logged in
      else {
        this.setState({
          currentUser: null
        })
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className="App">
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/signin" component={AccountPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
