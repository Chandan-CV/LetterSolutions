import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { auth } from "./Fire";
import { Switch, Route, HashRouter, BrowserRouter as Router } from "react-router-dom";
import Notes from "./Screens/Notes/Notes";
import LoginScreen from "./AuthProcess/LoginScreen";
import SignUpScreen from "./AuthProcess/SignUpScreen";
import VerifyUser from "./User/VerifyUser";
import Gradeid from "./Screens/Gradeid";
import Community_habits from "./community habits/community_habits";
import Timetable from "./Screens/Timetable/Timetable";
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
  const Gradestuff = () => {
    if (user) {
      if (user.emailVerified) {
        return <Gradeid />;
      } else {
        return <VerifyUser />;
      }
    } else {
      return <Gradeid />;
    }
  };

  return (
    <Context.Provider value={user}>
    <Router>
  
    <Switch>
    <Route path="/login">
    <LoginScreen />
    </Route>
    <Route path="/signup">
    <SignUpScreen />
    </Route>
    
    <Route path="/:fieldvalue/communityhabits">
            <Community_habits />
            </Route>
            <Route path="/:fieldvalue/timetable">
            <Timetable />
            </Route>
            
            <Route path="/:fieldvalue">
            {user ? <HomeStuff /> : <LoginScreen />}
            </Route>
            <Route exact path="/">
            {user ? <Gradestuff /> : <LoginScreen />}
            </Route>
            </Switch>
        
            </Router>
            </Context.Provider>
  );
}

export default App;
