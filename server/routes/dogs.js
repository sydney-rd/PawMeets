import restrict from "../middleware/restrict.js"
import { Router } from "express";
import { 
    getDogs,
    getDog,
    createDog,
    likeDog,
    updateDog,
    deleteDog,
} from "../controllers/dogs.js"

const router = Router();

router.get("/", getDogs);
router.get("/id/:id", getDog);
router.post("/", createDog);
router.put("/id/:id", restrict, updateDog);
router.put("/like/:id", restrict, likeDog);
router.post("/delete/:dogId", restrict, deleteDog);

export default router;
