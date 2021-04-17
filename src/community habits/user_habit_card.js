import { Card, Checkbox } from "@material-ui/core";
import { CheckBox } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import "../community habits/user_habit_card.css";
import { db } from "../Fire";
import firebase from "firebase";

const UserHabitCard = () => {
  const [habits, setHabit] = useState([]);
  useEffect(async () => {
    await db
      .collection("classrooms")
      .doc("N6UITxdvjwLVUsNFTLNL")
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
            if (item.incomplete.indexOf("Ram") > -1) {
              return (
                <div className="userhabitcard">
                  <p className="title">{item.habit_name}</p>
                  <p className="subtitle">Did You Achieved It Today</p>
                  <Checkbox
                    onChange={async () => {
                      await db
                        .collection("classrooms")
                        .doc("N6UITxdvjwLVUsNFTLNL")
                        .collection("habits")
                        .doc(item.id)
                        .update({
                          completed: firebase.firestore.FieldValue.arrayUnion(
                            "Ram"
                          ),
                          incomplete: firebase.firestore.FieldValue.arrayRemove(
                            "Ram"
                          ),
                        });
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
