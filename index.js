const express = require("express");
require("dotenv").config();
const cors = require("cors")
const multer = require("multer");
const path = require("path")

const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const carPostRoute = require("./routes/carPost");
const housePostRoute = require("./routes/housePost");
const userRoute = require("./routes/users.js");


const connectDB = require("./config/db");
connectDB();




const app = express();

// middleware
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute);
app.use("/api/users", userRoute);
app.use("/api/carpost", carPostRoute);
app.use("/api/housepost", housePostRoute)

// upload files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});
const upload = multer({storage: storage});
app.post("/api/upload", upload.array("file", 9), (req, res) => {
    res.status(200).json({message: "File has been uploaded"})
})

app.get("/", (req, res) => {
    res.json({message: "api running..."})

})

app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`))