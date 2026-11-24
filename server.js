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
  try{
    const customersCount = await db.query("SELECT count(*) FROM customers");

    const customersResult = await db.query(`SELECT * FROM customers ORDER BY id LIMIT $1 OFFSET $2`, [10, 0]);

    const revenueResult = await db.query("SELECT sum(saleamount) FROM sales ");
    
    res.render("index", {
        customersCount: customersCount.rows[0].count,
        customers: customersResult.rows,
        revenue: revenueResult.rows[0].sum
    });
  }catch(err){
    res.status(500).json({
        error: "Internal server error",
        message: err.message
    });
  }  
    
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});