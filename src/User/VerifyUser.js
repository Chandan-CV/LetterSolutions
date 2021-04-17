import { Button } from "@material-ui/core";
import React from "react";
import { auth } from "../Fire";

function VerifyUser() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          borderRadius: 5,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          width: "max-content",
          padding: 20,
          border: 1,
          borderStyle: "solid",
          borderColor: "black",
        }}
      >
        <h3>Please verify your email address</h3>
        <p>verification email has been sent to your email address</p>
        <p style={{ marginBottom: 30 }}>
          if you havent received it,{" "}
          <a
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => {
              auth.currentUser
                .sendEmailVerification()
                .then(() => alert("email sent"))
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            click here
          </a>{" "}
          to resend
        </p>
        <Button
          variant="outlined"
          onClick={() => {
            window.location.reload();
          }}
        >
          Click here after verification
        </Button>

        <p>OR</p>
        <Button
          variant="outlined"
          onClick={() => {
            auth.signOut();
            window.location.reload();
          }}
        >
          logout
        </Button>
      </div>
    </div>
  );
}

export default VerifyUser;
