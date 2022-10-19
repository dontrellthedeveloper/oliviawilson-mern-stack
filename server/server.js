const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { readdirSync } = require("fs");
require("dotenv").config();

// app
const app = express();



// db
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => console.log("MONGO DB CONNECTED"))
    .catch((err) => console.log("DB CONNECTION ERR", err));

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

// routes
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));






// home route
app.get("/", (req, res) => {
    res.json({
        data: "Node API Running",
    });
});

// port
const port = process.env.PORT || 9000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
