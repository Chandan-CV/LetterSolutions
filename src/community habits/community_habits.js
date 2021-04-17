import React from "react";
import UserHabitCard from "../community habits/user_habit_card";
import "../community habits/community_habits.css";
import HabitsCard from "./habits_card";

const Community_habits = () => {
  return (
    <div className="header">
      <center>
        <UserHabitCard />
        <UserHabitCard />
        <UserHabitCard />
        <HabitsCard/>
      </center>
    </div>
  );
};

export default Community_habits;
