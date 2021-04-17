import React from "react";
import UserHabitCard from "../community habits/user_habit_card";
import "../community habits/community_habits.css";
import HabitsCard from "./habits_card";
import { useParams } from "react-router";

const Community_habits = () => {
  const params = useParams().fieldvalue;
  return (
  <div style={{display:"flex",
flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
<p>{JSON.stringify(params)}</p>
  <UserHabitCard/>
  <HabitsCard/>
  </div>
  );
};

export default Community_habits;
