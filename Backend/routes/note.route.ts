import express from "express";
import { Notes,createnote ,Deletenote} from "../controllers/note.controller";
import auth from "../middleware/authorization";
 

const router = express.Router();

router.get("/Notes", auth, Notes);
router.post("/Createnotes", auth, createnote);
router.delete("/notes/:id", auth, Deletenote);

export default router;
  