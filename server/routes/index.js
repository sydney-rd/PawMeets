import { Router } from "express";
import dogRoutes from "./dogs.js";
import userData from "./users.js"

const router = Router();

router.get("/", (req, res) => res.send("PawMeets API!"));
router.use("/dogs", dogRoutes);
router.use("/auth", userData);


export default router;
