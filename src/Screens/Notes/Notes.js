import {
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  Input,
  LinearProgress,
  TextField,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Context } from "../../App";
import Navbar from "../../Components/navbar/Navbar";
import { db, storage } from "../../Fire";
import "./Notes.css";
import ShowNotes from "./ShowNotes/ShowNotes";
import firebase from "firebase";
function Notes() {
  const user = useContext(Context);
  const history = useHistory();
  const params = useParams();
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState(null);
  const [image, setimage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [tags, setTags] = useState("");
  useEffect(async () => {
    await db
      .collection("classrooms")
      .doc(params.fieldvalue)
      .get()
      .then((res) => {
        if (res.exists) {
          setData(res.data());
        } else {
          history.push("/");
        }
      });
  }, []);

  const HandleSubmit = async () => {
    if (image) {
      const random =
        JSON.stringify(Math.floor(Math.random() * 100)) +
        JSON.stringify(Math.floor(Math.random() * 100));

      const uploadTask = storage
        .ref(`notes/${params.fieldvalue}/${random}/${image.name}`)
        .put(image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          //progress function
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
          alert(error.message);
        },
        () => {
          storage
            .ref(`notes/${params.fieldvalue}/${random}`)
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              db.collection("classrooms")
                .doc(params.fieldvalue)
                .collection("notes")
                .doc(random)
                .set({
                  user: user.displayName,
                  name: image.name,
                  base: url,
                  id: random,
                  classId: params.fieldvalue,
                  TOC: firebase.firestore.FieldValue.serverTimestamp(),
                  tags: tags.split(",").map((item) => item.trim()),
                });

              setProgress(0);
              setimage(null);
              setOpen(false);
            });
        }
      );
    } else {
      alert("please select an image");
    }
  };

  const postIt = async () => {
    await fetch({
      method: "POST",
      url: "http://nikhiljsh12.pythonanywhere.com/notes/post",
      headers: {
        "X-CSRFToken": document.cookie.split("=")[1],
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
      },
      data: {check:"hello this is chandan here"},
    }).then((res) => setResponse(res.json()));
  };

  useEffect(async () => {
    await fetch("http://nikhiljsh12.pythonanywhere.com/notes/data/").then(
      (response) => {
        console.log(response.json());
      }
    );
    await postIt();
  }, []);

  return (
    <div>
      <Navbar />

      {/* this is the forst part giving the options */}
      
      <div>
        <center>
          <h1>Notes</h1>
          <h3>{data ? data.name : null}</h3>
        </center>
      </div>
      <div>
        <center>
          <Button variant="outlined" onClick={() => setOpen(true)}>
            Upload Notes
          </Button>
        </center>
      </div>
      <ShowNotes />

      {/* this is the dialog box for uploading stuff */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Choose the PDF file</DialogTitle>
        <DialogContent>
          choose the pdf file from your computer it will get uploaded and will
          also get converted to text by our Machine learning algorithm
        </DialogContent>
        <Input
          placeholder="enter the file"
          type="file"
          onChange={(e) => {
            setimage(e.target.files[0]);
          }}
        ></Input>
        <TextField
          variant="outlined"
          label="tags separated by a comma"
          multiline={true}
          value={tags}
          onChange={(e) => {
            setTags(e.target.value);
          }}
        />
        <div>
          <LinearProgress
            value={progress}
            variant="determinate"
            style={{ width: "100%", height: 2 }}
          />
        </div>

        <Button
          variant="outlined"
          onClick={() => {
            HandleSubmit();
          }}
        >
          Upload it
        </Button>
      </Dialog>
    </div>
  );
}

export default Notes;
