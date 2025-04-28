import { Router } from "express";
import { 
    getUsers, 
    getUser,
    postUser,
    putUser,
    deleteUser,
    login,
} from "../controllers/users.controllers.js";

const router = Router();

router.get("/users", getUsers);
router.post("/users", postUser);
router.put("/users/:id", putUser);
router.delete("/users/:id", deleteUser);

router.post("/login", login);

export default router;