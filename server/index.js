const express = require("express");
const dotenvFlow = require("dotenv-flow");
const todoRoutes = require("./routes/todoRoutes");
const cors = require("cors");
const mongoose = require("mongoose");
const { baseRoot } = require("./controllers/todoController");


dotenvFlow.config();


const app = express();


app.use(
cors({
origin: "*",
methods: "GET,POST,PUT,DELETE",
allowedHeaders: "Content-Type,Authorization",
})
);


app.use(express.json());


const source = process.env.MONGODB_ATLAS_CONNECTION || process.env.MONGO_URI;


mongoose
.connect(source)
.then(() => console.log("DB Connected Successfully"))
.catch((error) => console.log("DB Connection Error:", error));


app.get("/", baseRoot);


app.use("/api", todoRoutes);


const path = require('path');
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('*', (req, res) => {
res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});