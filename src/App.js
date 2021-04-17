import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { auth } from "./Fire";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Notes from "./Screens/Notes/Notes";
import LoginScreen from "./AuthProcess/LoginScreen";
import SignUpScreen from "./AuthProcess/SignUpScreen";
import VerifyUser from './User/VerifyUser'
export const Context = React.createContext();
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);


  
  const HomeStuff = () => {
    if (user) {
      if (user.emailVerified) {
        return <Notes />;
      } else {
        return <VerifyUser />;
      }
    } else {
      return <Notes />;
    }
  };


  return (
    <Context.Provider value={user}>
      <Router>
        <Switch>
        <Route path="/login">
        <LoginScreen/>
        </Route>  
        <Route path="/signup">
        <SignUpScreen/>
        </Route>
        
        <Route path="/">
          {user?<HomeStuff/>:<LoginScreen/>}
          </Route>


        </Switch>
      </Router>
    </Context.Provider>
  );
}

export default App;
