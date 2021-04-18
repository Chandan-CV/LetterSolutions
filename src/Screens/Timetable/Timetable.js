import { Button, Dialog, DialogTitle, TextField } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";


import { Context } from "../../App";
import Navbar from "../../Components/navbar/Navbar";
import { db } from "../../Fire";
import "../Timetable/Timetable.css";
function Timetable() {
    const user = useContext(Context);
  const [stat, setStat] = useState([]);
  const [marks, setMarks] = useState(null);
  const [sleep, setSleep] = useState(null);
  const [time, setTime] = useState(null);
  const [open, setOpen] = useState(false);
  const [desiredScore,setDesiredScore] = useState(null);
  const[predictedDuration, setPredictedDuration] = useState();
  useEffect(async()=>{
      if(user)
await db.collection("Users").doc(user.uid).onSnapshot((snap)=>{
        var val = snap.data();
        setStat(val.stats?val.stats:[]);
})
  },[user])
    const AddStat=async()=>{
        db.collection("Users").doc(user.uid).update({

            
           stats: [...stat,{
                marks:marks,
                sleep:sleep,
                duration:time,
                index:stat.length
            }]
        }
        
            ).then(()=>setOpen(false))
        }
        
        const Predict = ()=>{
          if(desiredScore>0&&desiredScore<=100){

          }
          else{
            alert("please mention a right score")
          }
        }

  return (
    <div>
      <Navbar />
      <center>
        <h1>Stats</h1>
      </center>

      <div className="StatsOutercontainer">
        {/*left hand side */}
        <div className="MarksDiv">
          {/* TODO: add the feature to take input of marks and time taken */}
            {stat.map((element)=>{
                return <div style={{display:"flex", flexDirection:"row",justifyContent:"space-between",width:"100%"}}>
                <p>{element.marks}%</p>
                <p>{element.duration}hrs study</p>
                <p>{element.sleep}hrs sleep</p>
                </div>
            })}
          <div
            className="addicon"
            onClick={() => {
              setOpen(true);
            }}
          >
            <Add />
          </div>
        </div>

        {/* Right hand side */}
        <div className="rightHandSide">
          <Line
          data={{
            labels: stat.map((element)=>element.index),
            datasets: [
              {
                label: 'marks',
                data: stat.map((element)=>element.marks),
                borderWidth: 1,
                backgroundColor: 'rgb(255, 139, 139)',
                        borderColor: 'red',
              },
       
            ],
          }}
          height={2}
          width={4}
         
        />
          {/* TODO: add the projected marks and give out the predicted time*/}
          <div className="predict">
          <p>please enter the predicted score, our AI will give you the predicted sleep and study duration</p>
          <TextField
          variant="outlined"
          label="enter desired score"
          type="number"
          value={desiredScore}
          onChange={(e)=>{setDesiredScore(e.target.value)}}
          />
          <Button 
          variant="outlined"
          onClick={()=>{Predict()}}
          >
          pridict the durations
          </Button>
          <p>predicted durations : {JSON.stringify(predictedDuration)}</p>
          </div>

        </div>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add the information</DialogTitle>
        <TextField
          style={{
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 10,
          }}
          type="number"
          variant="outlined"
          label="percentage marks"
          value={marks}
          onChange={(e)=>{setMarks(e.target.value)}}
        />
        <TextField
          style={{
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 10,
          }}
          type="number"
          variant="outlined"
          label="time studied"
          value={time}
          onChange={(e)=>{setTime(e.target.value)}}
        />

        <TextField
          style={{
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 10,
          }}
          type="number"
          variant="outlined"
          label="time slept"
          value={sleep}
          onChange={(e)=>{setSleep(e.target.value)}}
        />
        <Button variant="contained" onClick={()=>{AddStat()}}>Add</Button>
      </Dialog>
    </div>
  );
}

export default Timetable;
