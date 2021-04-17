import { Card, Checkbox } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "../community habits/habits_card.css";
const HabitsCard = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData([
      {
        id: "1",
        habit_name: "Workout",
        status: "Done",
        user_names: "Arjun",
      },
    ]);
  }, []);
  return (
    <div className="habitCard">
      {data.map((item) => (
        <table className="table" key={item.id}>
        <div style={{display:"flex", justifyContent:"space-between"}}>
        <thead>
        <tr>
        <th>{item.habit_name}</th>
        <th>Status</th>
        </tr>
        </thead>
        <tbody>
        <tr >
        <td>{item.user_names}</td>
        <td>{item.status}</td>
        <td />
        </tr>
        </tbody>
        </div>
        </table>
        ))}
        </div>
  );
};

export default HabitsCard;
