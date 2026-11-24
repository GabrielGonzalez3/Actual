import express from "express";
import pg from "pg";

const app = express();
const port = 3000;


const db = new pg.Client({
    user: "postgres",
    password: "HyperGreninja24$",
    port: 5432,
    database: "Random"
});

db.connect();

app.set("view engine", "ejs");
//Mind you this is a work in progress
app.use(express.static("public"));


app.get("/", async (req, res) => {
    
    const customersCount = await db.query("SELECT count(*) FROM customers");
    
    res.render("index", {
        customersCount: customersCount.rows[0].count
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});