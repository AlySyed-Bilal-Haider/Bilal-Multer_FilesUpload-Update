import React, { useState } from "react";
import UserRecord from "./Table";
import axios from "axios";
function MuiltipleImage() {
  const [files, setMultipleState] = useState("");
  const [emailstate, setEmailstate] = useState("");
  const [passwordstate, setPasswordstate] = useState("");
  const muiltiplyFilesHandle = (e) => {
    setMultipleState(e.target.files);
  };
  const URL = "http://localhost:8080/uploadimg";
  const saveMuiltipleFiles = async () => {
    const formData = new FormData();
    Array.from(files).map((items) => {
      formData.append("files", items);
    });
    try {
      formData.append("email", emailstate);
      formData.append("password", passwordstate);
      const { data } = await axios.post(URL, formData);

      data.status == "ok" && alert("add user successfully");
      setMultipleState("");
    } catch (error) {
      console.log("error:", error);
    }
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "50%",
            minHeight: "100px",
            margin: "20px",
            padding: "20px",
            borderRadius: "5px",
            boxShadow: "5px 5px 5px lightgray,-5px -5px 5px lightgray",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <input
            type="email"
            multiple
            onChange={(e) => {
              setEmailstate(e.target.value);
            }}
            style={{ margin: "10px", width: "80%" }}
          />
          <input
            type="password"
            multiple
            onChange={(e) => {
              setPasswordstate(e.target.value);
            }}
            style={{ margin: "10px", width: "80%" }}
          />

          <input
            type="file"
            multiple
            onChange={muiltiplyFilesHandle}
            style={{
              margin: "10px",
              marginLeft: "10%",
              width: "80%",
              alignSelf: "flex-start",
            }}
          />

          <br />
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              saveMuiltipleFiles();
            }}
          >
            {" "}
            Submit
          </button>
        </div>
      </div>
      <UserRecord />
    </>
  );
}

export default MuiltipleImage;
