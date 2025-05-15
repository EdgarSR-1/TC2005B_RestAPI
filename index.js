import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import indexRoutes from "./routes/index.routes.js";
import userRoutes from "./routes/users.routes.js";
// comandos para users controllers
// import { pool } from "./db/db.js";

// // console.log(process.env.HOST);
// // para hacer prueba de que funciona el .env

// pool.query('select * from users', (error, results) => {
//     if (error) throw error;
//     console.log("The solution is: ", results);
// });



const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());



app.use(indexRoutes)
app.use(userRoutes)

const PORT = 5000;
app.listen(PORT,console.log("http://localhost:"+PORT))