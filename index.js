import express from "express";
import indexRoutes from "./routes/index.routes.js"

const app = express();

app.use(indexRoutes)

const PORT = 5000;
app.listen(PORT,console.log("http://localhost:"+PORT))