import React, { useContext, useEffect, useState } from "react";
import UserHabitCard from "../community habits/user_habit_card";
import "../community habits/community_habits.css";
import HabitsCard from "./habits_card";
import Navbar from "../Components/navbar/Navbar";
import { db, storage } from "../Fire";
import firebase from "firebase";
import { useParams } from "react-router";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Input,
  TextField,
} from "@material-ui/core";
import { Context } from "../App";
import Disqus, { DiscussionEmbed } from "disqus-react";

export const reload =()=>{
  window.location.reload();
}

const Community_habits = () => {
  const [open, setOpen] = useState(false);
  const [open2, setdialog] = useState(false);
  const [add, setadd] = useState(false);
  const [add2, setadd2] = useState(false);
  const [users, setuser] = useState([]);
  const [newName, setName] = useState("");
  const params = useParams().fieldvalue;
  const user = useContext(Context);

  useEffect(async () => {
    await db
      .collection("classrooms")
      .doc(params)
      .collection("habits")
      .get()
      .then((resp) => {
        setuser(
          resp.docs.map((doc) => {
            return doc.data();
          })
        );
      });
  }, []);
  return (
    <div className="community-header">
      <Navbar />
      <center>
        <UserHabitCard />
        <div className="selection">
          <div className="good-title" onClick={() => setOpen(true)}>
            <p>Get Started with a new Habit</p>
          </div>
          <div className="add-button" onClick={() => setdialog(true)}>
            <p>Quit A Bad Habit</p>
          </div>
        </div>
        <HabitsCard />
      </center>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Choose A Good Habit </DialogTitle>
        <DialogContent className="dialogContent">
          {users.map((item) => (
            <div>
              {(() => {
                if (item.type == true) {
                  return (
                    <p
                      className="selection-title"
                      onClick={async () => {
                        await db
                          .collection("classrooms")
                          .doc(params)
                          .collection("habits")
                          .doc(item.id)
                          .update({
                            incomplete: firebase.firestore.FieldValue.arrayUnion(
                             user.displayName
                            ),
                          }).then(()=>{reload()});
                      }}
                    >
                      {item.habit_name}
                    </p>
                  );
                } else {
                  return <p></p>;
                }
              })()}
            </div>
          ))}
        </DialogContent>
        <Button variant="outlined" onClick={() => setadd(true)}>
          Add A New Habit
        </Button>
      </Dialog>
      <Dialog open={open2} onClose={() => setdialog(false)}>
        <DialogTitle>Choose A Bad Habit </DialogTitle>
        <DialogContent className="dialogContent">
          {users.map((item) => (
            <div>
              {(() => {
                if (item.type == false) {
                  return (
                    <p
                      className="selection-title"
                      onClick={async () => {
                        await db
                          .collection("classrooms")
                          .doc(params)
                          .collection("habits")
                          .doc(item.id)
                          .update({
                            incomplete: firebase.firestore.FieldValue.arrayUnion(
                              user.displayName
                            ),
                          }).then(()=>{reload()});
                      }}
                    >
                      {item.habit_name}
                    </p>
                  );
                } else {
                  return <p></p>;
                }
              })()}
            </div>
          ))}
        </DialogContent>
        <Button variant="outlined" onClick={() => setadd2(true)}>
          Add A New Habit
        </Button>
      </Dialog>
      <Dialog open={add} onClose={() => setadd(false)}>
        <DialogTitle>Add A New Habit </DialogTitle>
        <DialogContent className="dialogContent">
          <TextField
            variant="outlined"
            label="Name of the Habit"
            multiline={true}
            value={newName}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </DialogContent>
        <Button
          variant="outlined"
          onClick={async () => {
            await db
              .collection("classrooms")
              .doc(params)
              .collection("habits")
              .add({
                habit_name: newName,
                type: true,
                completed: [],
                incomplete: [user.displayName],
              })
              .then(async function (docRef) {
                await db
                  .collection("classrooms")
                  .doc(params)
                  .collection("habits")
                  .doc(docRef.id)
                  .update({
                    habit_name: newName,
                    type: true,
                    completed: [],
                    incomplete: [user.displayName],
                    id: docRef.id,
                  }).then(()=>reload());
              });
          }}
        >
          Create
        </Button>
      </Dialog>
      <Dialog open={add2} onClose={() => setadd2(false)}>
        <DialogTitle>Add A New Habit </DialogTitle>
        <DialogContent className="dialogContent">
          <TextField
            variant="outlined"
            label="Name of the Habit"
            multiline={true}
            value={newName}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </DialogContent>
        <Button
          variant="outlined"
          onClick={async () => {
            await db
              .collection("classrooms")
              .doc(params)
              .collection("habits")
              .add({
                habit_name: newName,
                type: true,
                completed: [],
                incomplete: [user.displayName],
              })
              .then(async function (docRef) {
                await db
                  .collection("classrooms")
                  .doc(params)
                  .collection("habits")
                  .doc(docRef.id)
                  .update({
                    habit_name: newName,
                    type: false,
                    completed: [],
                    incomplete: [user.displayName],
                    id: docRef.id,
                  }).then(()=>{reload()});
              });
          }}
        >
          Create
        </Button>
      </Dialog>
      


<div style={{marginTop:300}}>
<Disqus.DiscussionEmbed
shortname='lettersolutions'
config={
  {
    url: "http://localhost:3000" ,
    identifier: params,
    title: "habits",	
  }
}
/>
</div>
          


    </div>

  );
};

export default Community_habits;
