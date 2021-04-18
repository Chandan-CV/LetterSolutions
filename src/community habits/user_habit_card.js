import { Card, Checkbox } from "@material-ui/core";
import { CheckBox } from "@material-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import "../community habits/user_habit_card.css";
import { db } from "../Fire";
import firebase from "firebase";
import { useParams } from "react-router";
import { Context } from "../App";
import { reload } from "./community_habits";

const UserHabitCard = () => {
  const params = useParams().fieldvalue;
  const user = useContext(Context);
  const [habits, setHabit] = useState([]);
  useEffect(async () => {
    await db
      .collection("classrooms")
      .doc(params)
      .collection("habits")
      .get()
      .then((resp) => {
        setHabit(
          resp.docs.map((doc) => {
            return doc.data();
          })
        );
      });
  }, []);
  return (
    <div>
      {habits.map((item) => (
        <div>
          {(() => {
            if (item.incomplete.indexOf(user.displayName) > -1) {
              return (
                <div className="userhabitcard">
                  <p className="title">{item.habit_name}</p>
                  <p className="subtitle">Did You Achieved It Today</p>
                  <Checkbox
                    onChange={async () => {
                      await db
                        .collection("classrooms")
                        .doc(params)
                        .collection("habits")
                        .doc(item.id)
                        .update({
                          completed: firebase.firestore.FieldValue.arrayUnion(
                            user.displayName
                          ),
                          incomplete: firebase.firestore.FieldValue.arrayRemove(
                            user.displayName
                          ),
                        }).then(()=>{reload()});
                    }}
                  ></Checkbox>
                </div>
              );
            } else {
              return <p></p>;
            }
          })()}
        </div>
      ))}
    </div>
  );
};

export default UserHabitCard;
