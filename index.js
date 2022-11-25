const express = require("express");
const app = express();
const router = require("./routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const dotenv = require("dotenv");

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use("/api", router);

// listen on port
app.listen(PORT, () => console.log("Server running at http://localhost:", PORT));
