import { Router } from "express";
import { saludo, ping, polo, abc, items} from "../controllers/index.controllers.js";

const router = Router();

router.get("/", saludo);
// no puede haber 2 GET en un mismo endpoint
router.get("/ping", ping);
router.get("/marco", polo);
router.get("/a/b/c", abc);
router.get("/items", items);

export default router;