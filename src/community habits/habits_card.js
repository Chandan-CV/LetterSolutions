import { Card, Checkbox } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "../community habits/habits_card.css";
import { db } from "../Fire";
const HabitsCard = () => {
  const [data, setData] = useState([]);
  useEffect(async() => {
    await db.collection('classrooms').doc('N6UITxdvjwLVUsNFTLNL').collection('habits').get().then((resp)=>{
      setData(resp.docs.map((doc)=> {
        return doc.data();
      }))
    })
  }, []);
  return (
    <div>
      {data.map((item) => (
        <div className="habitCard">
          <div className="register user">
            <p className="habit-header">{item.habit_name}</p>
            <ul>
              {item.completed.map((value, index) => {
                return <p key={index}>{value}</p>;
              })}
            </ul>
            <ul>
              {item.incomplete.map((value, index) => {
                return <p key={index}>{value}</p>;
              })}
            </ul>
          </div>
          <div className="register user">
            <p className="habit-header">Status</p>
            <ul>
              {item.completed.map((value, index) => {
                return <p key={index}>Succesfully Acheived Today's Goal</p>;
              })}
            </ul>
            <ul>
              {item.incomplete.map((value, index) => {
                return <p key={index}>Not Achieved Yet</p>;
              })}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HabitsCard;
