import { hash } from "crypto";
import { pool } from "../db/db.js";
import {getSalt, hashPassword} from "../utils/hash.js";


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
export const postUser = (req, res) => {
    const { name, username, password, age } = req.body;
    const salt = getSalt();
    const hash = hashPassword(password, salt);
    const hashedPassword = salt + hash;
    // First, insert the user into the database
    pool.execute(
        "insert into users (name, username, password, age) values (?,?,?,?)",
        [name, username, hashedPassword, age],
        (error, results) => {
            if (error) {
                res.status(500).json({ msg: error, users: [] });
                return;
            }

            // After successful insertion, fetch the newly created user
            pool.execute(
                "select * from users where username = ?",
                [username],
                (error, results) => {
                    if (error) {
                        res.status(500).json({ msg: error, users: [] });
                        return;
                    }

                    // Send the response with the newly created user
                    res.status(200).json({ msg: "0k", users: results });
                }
            );
        }
    );
};
export const putUser = (req,res) => {
    const {name, username, password, age} = req.body;
    pool.execute(
        "update users set name=?, username=?, password=?, age=? where id = ?",
        [name, username, password, age, req.params.id],
        (error, results) => {
            if (error) {
                res.status(500).json({msg: error, users: results});
            }
            res.status(200).json({msg: "0k", users: results});
        });
};
export const deleteUser = (req,res) => {
    pool.execute(
        "delete from users where id = ?",
        [req.params.id],
        (error,results) => {
            if (error) {
                res.status(500).json({ msg: "error", users: []});
            }
            res.status(200).json({msg: "0k", users: results});
        });
};
export const login = (req,res) => {
    const { username, password } = req.body;
    pool.execute(
        "select * from users where username = ?",
        [username],
        (error, results) => {
            if (error) {
                res.status(500).json({msg: error, users: [] });
                return;
            }
            if (results.length < 1 ){
                res.
                    status(401)
                    .json({ isLogin : false, msg: "credenciales invalidas", user: {} })
                return;
            }
            // comparación de constraseña
            const salt = results[0].password.substring(0, process.env.SALT_SIZE);
            const hash = hashPassword(password, salt);
            if(results[0].password === salt + hash){
                res.status(200).json({ isLogin : true, msg: "0k", user: results[0] })
            } else {
                res.
                status(401)
                .json({ isLogin : false, msg: "credenciales invalidas", user: {} })
                return;
            };
        }
    )
};