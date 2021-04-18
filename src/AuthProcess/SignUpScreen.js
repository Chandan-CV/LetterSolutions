import React,{useContext, useState} from 'react'
import { Button, TextField } from "@material-ui/core";
import "./LoginScreen.css";
import { auth, db, signInWithGoogle,firebase } from "../Fire";
import { useHistory } from "react-router";

function SignUpScreen() {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [pass, setPass] = useState("")
    const [ConfirmPass, setConfirmPass] = useState("")
    const history = useHistory();
    const signIn = ()=>{

        if (pass===ConfirmPass){
            auth.createUserWithEmailAndPassword(email,pass).then((user)=>{
            db.doc(`Users/${user.user.uid}`).set(
                {
                  name: name,
                  email:email,
                  timeOfCreation: firebase.firestore.FieldValue.serverTimestamp(),
                  id: user.user.uid
               
                }
            ).then(()=>
            user.user.updateProfile({displayName:name})
            )
                auth.currentUser.sendEmailVerification().catch((err)=>{console.log(err)});
                history.push("/")
        
        })
           .catch((err)=>{alert(err.message)})
        }
        else{
            alert("password and confirm password dont match")
        }
    }

    return (
        <div>
        <div className="LoginMain">
          <div className="LoginCard">
            <div className="header">
              <p className="font">Welcome</p>
            </div>
            <div className="input">
            
            <TextField 
              variant="outlined" 
              label="email" 
              type="email" 
              value={email}
              onChange={(val)=>{setEmail(val.target.value)}}
              />
            </div>
  
            <div className="input">
            <TextField 
              variant="outlined" 
              label="name" 
              type="name" 
              value={name}
              onChange={(val)=>{setName(val.target.value)}}
              />
            </div>
  
            <div className="input">
              <TextField 
              variant="outlined" 
              label="password" 
              type="password" 
              value={pass}
              onChange={(val)=>{setPass(val.target.value)}}
              />
            </div> 
            <div className="input">
            <TextField 
            variant="outlined" 
            label="confirm password" 
            type="password" 
            value={ConfirmPass}
            onChange={(val)=>{setConfirmPass(val.target.value)}}
            />
          </div>
  
            <div className="button">
              <Button 
              onClick={()=>{signIn()}}
              variant="outlined"
              >Sign up</Button>
            </div>
            
            <div
            style={{display:"flex",flexDirection:"column"}}
              className="googleLogin"
              onClick={() => {
               history.push("/login")
              }}
            >
            <p>Already a user?</p>
            <p className="signUpText">login</p>
            
            </div>
          </div>
        </div>
      </div>
    )
}

export default SignUpScreen
