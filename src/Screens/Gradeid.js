import { Button, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { auth, db } from '../Fire';

function Gradeid() {
        const history = useHistory();
        const [FV, setFV]= useState("");
    const handlesubmit = async()=>{
        await db.collection("classrooms").doc(FV).get().then((res)=>{
                if(res.exists){
                    history.push(`/${FV}`);
             }
             else{
                 alert("sorry the given classroom does not exist. Please check the id again")
             }
        })
    }
    return (
        <div style={{display:"flex", justifyContent:"center", height:"100vh", alignItems:"center"}}>
         <div style={{borderWidth:1, borderColor:"black", borderStyle:"solid", padding: 40, borderRadius:20, display:"flex", flexDirection:"column"}}>
         
         <TextField
         variant="outlined"
         label="enter grade id"
         type="id"
         value={FV}
         onChange={(e)=>{setFV(e.target.value)}}
         />

         <Button
          variant="outlined"
          style={{marginTop:20}}
            onClick={()=>{handlesubmit()}}
         >submit</Button>
         
         <div>
         <Button
         onClick={()=>{auth.signOut().then(()=>{history.push("/"); window.location.reload()});}}
         >
         logout
         </Button>
         </div>

         
         </div>   
        </div>
    )
}

export default Gradeid
