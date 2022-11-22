import express from "express";
import Routes from "./router/route.js";
import cors from "cors";
import connectDB from "./database/db.js";
import multer from "multer";
import fs from "fs";
import path from "path";
import timeout from "connect-timeout";
import muiltiImagesModal from "./modal/muiltipleImages.js";
const __dirname = path.resolve();
const url ="";
const app = express();
connectDB(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
// dotenv.config();
app.use(timeout("60000s"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./build"));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
app.use("/upload", express.static("./upload"));
// .......start route update of profile pic.........
app.post("/uploadimg", upload.array("files"), async (req, res, next) => {
  try {
    const filesArray = [];
    req.files?.map((items) => {
      return filesArray.push({
        img: items.originalname,
        id: Math.random().toString(36),
      });
    });
    const { email, password } = req.body;
    if (filesArray?.length !== 0 && email !== "" && password !== "") {
      const userInfo = { email, password, image: filesArray };
      const newImage = await new muiltiImagesModal(userInfo);
      newImage.save();
      if (newImage) {
        res.status(202).json({
          status: "ok",
          success: true,
          message: "Update successfully",
        });
      } else {
        res.status(202).json({
          status: "error",
          success: false,
          message: "Not successfully",
        });
      }
    } else {
      res.status(202).json({
        status: "error",
        success: false,
        message: "Not successfully",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

////////////Update muiltiply images//////////
app.post("/updateuser", upload.single("file"), async (req, res) => {
  try {
    console.log(req.body, "Body Data");
    const { email, id, img, imgID } = req.body;
    const _id = id;
    const previous = await muiltiImagesModal.findById({ _id: id });
    const updatedata = await muiltiImagesModal.updateOne(
      { _id: id },
      {
        $pull: { image: { id: imgID } },
      },
      { multi: true }
    );
    ///////////////Unlink file from upload folder/////////////////
    if (updatedata.acknowledged) {
      fs.stat("./upload/" + img, function (err, stats) {
        console.log(stats);
        if (err) {
          return console.error(err);
        }
        fs.unlink("./upload/" + img, function (err) {
          if (err) return console.log(err);
          console.log("file deleted successfully");
        });
      });
      /////////////////Unlink file code//////////////////
      const data = await muiltiImagesModal.findByIdAndUpdate(_id, {
        email,
      });
      if (req.file?.filename !== undefined) {
        const addImage = await muiltiImagesModal.updateOne(
          { _id: id },
          {
            $push: {
              image: {
                id: Math.random().toString(36),
                img: req.file.filename,
              },
            },
          }
        );
        console.log(addImage, ":addImage");
      }
      if (data) {
        res.json({ Status: "ok", message: "update succesfully" });
      }
    }
  } catch (error) {
    console.log("update error", error);
  }
});

//////////////Close muiltply images updates///////

app.use(Routes);
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ status: false, data: error });
});
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "./build/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(process.env.PORT || 8080, function () {
  console.log("Server Start at live");
});
