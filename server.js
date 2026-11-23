import express from "express";
import pg from "pg";

const app = express();
const port = 3000;


const db = new pg.Clent({
    user: "postgres",
    password: "HyperGreninja24$",
    port: 5432,
    database: "Customers"
});

db.connect();

app.set("view engine", "ejs");
//Mind you this is a work in progress
app.use(express.static("public"));


app.get("/", (req, res) => {
    res.render("index");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});