import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { auth, db } from "../Fire";

export const reload = () => {
  window.location.reload();
};

function Gradeid() {
  const history = useHistory();
  const [FV, setFV] = useState("");
  const [add, setadd] = useState(false);
  const [newName, setName] = useState("");
  const handlesubmit = async () => {
    await db
      .collection("classrooms")
      .doc(FV)
      .get()
      .then((res) => {
        if (res.exists) {
          history.push(`/${FV}`);
        } else {
          alert(
            "sorry the given classroom does not exist. Please check the id again"
          );
        }
      });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
      }}
    >
      <div
        style={{
          borderWidth: 1,
          borderColor: "black",
          borderStyle: "solid",
          padding: 40,
          borderRadius: 20,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          variant="outlined"
          label="Enter Class ID"
          type="id"
          value={FV}
          onChange={(e) => {
            setFV(e.target.value);
          }}
        />

        <Button
          variant="outlined"
          style={{ marginTop: 20 }}
          onClick={() => {
            handlesubmit();
          }}
        >
          submit
        </Button>

        <Button
          variant="outlined"
          style={{ marginTop: 20 }}
          onClick={() => {
            setadd(true);
          }}
        >
          Create A New Class
        </Button>

        <div>
          <center>
            <Button
              onClick={() => {
                auth.signOut().then(() => {
                  history.push("/");
                  window.location.reload();
                });
              }}
            >
              logout
            </Button>
          </center>
        </div>
      </div>
      <Dialog open={add} onClose={() => setadd(false)}>
        <DialogTitle>Add A New Class </DialogTitle>
        <DialogContent>
          <TextField
            variant="outlined"
            label="Name of the Class"
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
              .add({
                name: newName,
              }).then( function(ele) {
                  setFV(ele.id)
              }).then(() => setadd(false))
          }}
        >
          Create
        </Button>
      </Dialog>
    </div>
  );
}

export default Gradeid;
