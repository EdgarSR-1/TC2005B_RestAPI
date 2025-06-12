import { pool } from "../db/db.js";

export const getUser = (req, res) => {
	const id = req.params.id;
	pool.execute(" SELECT * FROM Users where id = ?", [id], (error, results) => {
		if (error) {
			res.status(500).json({msg: error, users: [] });
			return;
		}
		res.status(200).json(results[0]);
	});
};