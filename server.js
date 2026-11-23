import express from "express";

const app = express();
const port = 3000;

/*
const db = new pg.Clent({
    user: "postgres",
    password: "HyperGreninja24$",
    port: 6432
    database: "Guu",
});
*/

//Mind you this is a work in progress
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index");
})