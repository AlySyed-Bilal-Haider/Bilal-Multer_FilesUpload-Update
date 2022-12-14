import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import TextInput from "./Inputstyle";
import {
  Typography,
  Dialog,
  DialogContent,
  Slide,
  Box,
  Button,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const StyledModal = withStyles((theme) => ({
  root: {
    "& .MuiDialog-paper": {
      width: "350px !important",
    },
    "& .MuiDialog-root": {
      zIndex: "1301 !important",
      height: "100% !important",
    },
    "&.MuiDialog-container": {
      overflowY: "hidden !important",
    },
    "& .MuiDialogContent-root": {
      padding: "15px 0px !important",
    },
    "& .MuiDialog-paperScrollPaper": {
      backgroundColor: `lightgray !important`,
      boxShadow: "#B6CAE8 0px 0px 5px 1px",
      borderRadius: 0,
    },
    "& .dialoge__content__section": {
      background: "#123B53",
    },
  },
}))(Dialog);

function Editeprofile({ open, func, userInfo }) {
  const [userstate, setUserstate] = React.useState({
    id: "",
    email: "",
    image: "",
    imgID: "",
  });
  const [file, setUserfile] = useState("");
  useEffect(() => {
    setUserstate({
      ...userstate,
      id: userInfo?._id,
      email: userInfo?.email,
      image: userInfo?.image,
      imgID: userInfo?.imgID,
    });
  }, [userInfo]);

  //input filed change handler;
  const changeHandler = (e) => {
    setUserstate({ ...userstate, [e.target.name]: e.target.value });
  };
  const handleClose = () => {
    func(false);
  };

  //Submit form, after filling the user form;
  const profilehandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    try {
      formData.append("file", file);
      if (userstate.email !== "") {
        formData.append("email", userstate.email);
        formData.append("id", userstate.id);
        formData.append("img", userstate.image);
        formData.append("imgID", userstate.imgID);
        const { data } = await axios.post(
          `http://localhost:8080/updateuser`,
          formData
        );

        if (data.status === "ok") {
          toast.success(data.message);
          handleClose();
        } else if (data.status === "error") {
          toast.error(data.message);
        }
      } else {
        toast.error("Please fill form !");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log("Update error:");
    }
  };
  // image upload from server
  const handleFile = async (event) => {
    let files = event.target.files[0];
    setUserfile(files);
  };

  return (
    <>
      <StyledModal
        open={open}
        keepMounted
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent className="dialoge__content__section">
          <Box sx={{ float: "right", p: 1, cursor: "pointer" }}>
            <CloseIcon sx={{ color: "#fff" }} onClick={handleClose} />
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              align: "center",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Typography
                variant="body1"
                sx={{
                  textAlign: "center",
                  fontSize: "20px",
                  fontWeight: 700,
                  fontFamily: "Maven Pro",
                  paddingBottom: "10px",
                  color: "#fff",
                }}
              >
                Update user profile
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  padding: "15px 25px",
                  backgroundColor: "formscheme.main",
                }}
              >
                <TextInput
                  fullWidth
                  type="email"
                  value={userstate.email || ""}
                  onChange={changeHandler}
                  placeholder="Email"
                  name="email"
                  autoComplete="off"
                />

                <TextInput
                  fullWidth
                  type="file"
                  placeholder="file"
                  name="userfile"
                  autoComplete="off"
                  accept="image/*"
                  onChange={handleFile}
                />

                <Button
                  onClick={profilehandler}
                  type="submit"
                  sx={{
                    width: "100%",
                    borderRadius: 0,
                    my: 1.5,
                    py: 1.5,
                    color: "white",
                    background: `linear-gradient(90deg, rgba(57,87,166,1) 0%, rgba(242,150,191,1) 84%)`,
                    "&:hover": {
                      background: `linear-gradient(90deg, rgba(57,87,166,1) 0%, rgba(242,150,191,1) 84%)`,
                    },
                  }}
                  value="submit"
                >
                  Edit
                </Button>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </StyledModal>
    </>
  );
}

export default Editeprofile;
