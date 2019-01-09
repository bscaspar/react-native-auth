import React, { Component } from "react";
import { SafeAreaView, View } from "react-native";
import firebase from "firebase";

import { Header, Button, CardSection, Spinner } from "./components/common";
import LoginForm from "./components/LoginForm";

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyC8IJzDmucqf4fUNCQI39lbgThnQQAJrqg",
      authDomain: "auth-8012e.firebaseapp.com",
      databaseURL: "https://auth-8012e.firebaseio.com",
      projectId: "auth-8012e",
      storageBucket: "auth-8012e.appspot.com",
      messagingSenderId: "603374446061"
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>Log out</Button>
          </CardSection>
        );
      case false:
        return <LoginForm />;
      default:
        return (
          <CardSection>
            <Spinner size="large" />
          </CardSection>
        );
    }
  }

  render() {
    return (
      <SafeAreaView>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </SafeAreaView>
    );
  }
}

export default App;
