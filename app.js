const path = require("path")
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require('cors');

const { authenticateToken } = require("./middleware/check-auth");
const { upload, imageUploader } = require("./helpers/image-uploader");


const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const linkRoute = require("./routes/link");
const enumeRoute = require("./routes/enumeration");
const sponsorRoute = require("./routes/sponsor");
const partnerRoute = require("./routes/partner");
const informationRoute = require("./routes/information");
const certificateRoute = require("./routes/certification");
const categoryRoute = require("./routes/category")


const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", userRoute);
app.use("/api", productRoute);
app.use("/api", linkRoute);
app.use("/api", certificateRoute);
app.use("/api", categoryRoute);
app.use("/api", enumeRoute);
app.use("/api", sponsorRoute);
app.use("/api", partnerRoute);
app.use("/api", informationRoute);


//* Helpers
app.post("/api/upload-file", authenticateToken, upload.single("file"), imageUploader);


module.exports = app;