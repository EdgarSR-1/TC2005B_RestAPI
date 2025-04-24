import { pool } from "../db/db.js";



export const getUsers = (req,res) => {
    pool.query('select * from users', (error, results) => {
    if (error) {
        // se puede utilizar tambien throw error
        res.status(500).json({msg: error, users: [] });
        return;
    }
    res.status(200).json({msg: "0k", users: results })
    // console.log("The solution is: ", results);
    });
};
export const getUser = (req,res) => {
    const id = req.params.id;
    pool.execute("select * from users where id = ?", [id], (error, results) => {
        if (error) {
            res.status(500).json({msg: error, users: [] });
            return;
        }
        res.status(200).json({msg: "0k", users: results })
        });
};
export const postUser = (req,res) => {};
export const putUser = (req,res) => {};
export const deleteUser = (req,res) => {};
export const login = (req,res) => {};