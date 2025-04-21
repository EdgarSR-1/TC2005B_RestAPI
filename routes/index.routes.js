import { Router } from "express";
import { saludo, ping, polo, abc} from "../controllers/index.controllers.js";

const router = Router();

router.get("/", saludo);
// no puede haber 2 GET en un mismo endpoint
router.get("/ping", ping);
router.get("/marco", polo);
router.get("/a/b/c", abc);

export default router;