import { Card, Checkbox } from "@material-ui/core";
import React from "react";
import '../community habits/user_habit_card.css'
const UserHabitCard = () => {
  return (
    
      <Card className="userhabitcard">
        <p className="title">Yoga</p>
        <p className="title">Have You Achieved It Today </p>
        <Checkbox></Checkbox>
      </Card>
    
  );
};

export default UserHabitCard;
