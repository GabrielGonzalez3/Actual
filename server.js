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

    const customersResult = await db.query("SELECT * FROM customers ORDER BY id LIMIT $1 OFFSET $2", [10, 0]);

    const revenueResult = await db.query("SELECT sum(saleamount) FROM sales");

    const salesResult = await db.query("SELECT products.name, sales.quantity, sales.saleamount FROM sales LEFT JOIN products ON sales.productid = products.id ORDER BY sales.id ASC");
    
    const orderCountResult = await db.query("SELECT count(quantity) FROM orders");

    const issuesCountResult = await db.query("SELECT count(id) FROM alerts WHERE type = 'issues' ");

    const issuesResult = await db.query("SELECT * FROM alerts WHERE type = 'issues'");

    const notificationCountResult = await db.query("SELECT count(id) FROM alerts WHERE type = 'notifications' ");
    
    const notificationResult = await db.query("SELECT * FROM alerts WHERE type = 'notifications'");

    const tasksResult = await db.query("SELECT * FROM alerts WHERE type = 'tasks'");

    res.render("index", {
        customersCount: customersCount.rows[0].count,
        customers: customersResult.rows,
        revenue: revenueResult.rows[0].sum,
        sales: salesResult.rows,
        orderCount: orderCountResult.rows[0].count,
        issueCount: issuesCountResult.rows[0].count,
        issues: issuesResult.rows,
        notificationCount: notificationCountResult.rows[0].count,
        notifications: notificationResult.rows,
        tasks: tasksResult.rows
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

/*
await db.query("");
*/